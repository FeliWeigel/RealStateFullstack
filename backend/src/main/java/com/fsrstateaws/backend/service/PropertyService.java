package com.fsrstateaws.backend.service;

import com.fsrstateaws.backend.entities.FollowedProperty;
import com.fsrstateaws.backend.entities.Property;
import com.fsrstateaws.backend.exceptions.NullFieldsException;
import com.fsrstateaws.backend.repository.FollowedPropertiesRepository;
import com.fsrstateaws.backend.repository.PropertyRepository;
import com.fsrstateaws.backend.s3.S3Buckets;
import com.fsrstateaws.backend.s3.S3Service;
import com.fsrstateaws.backend.security.jwt.JwtService;
import com.fsrstateaws.backend.security.jwt.Token;
import com.fsrstateaws.backend.security.jwt.TokenRepository;
import com.fsrstateaws.backend.user.User;
import com.fsrstateaws.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final FollowedPropertiesRepository followedPropertiesRepository;

    public ResponseEntity<Object> uploadProperty(Property property){
        if(property.getName().isBlank() || property.getOnSale() == null || property.getBedrooms() == null ||
                property.getBathrooms() == null || property.getPrice() == null || property.getDescription().isBlank() || property.getSurface() == null ||
                property.getHasPool() == null || property.getFloors() == null || property.getLocation().isBlank() || property.getUploadDate() == null || property.getType() == null
        ){
            return new ResponseEntity<>(new NullFieldsException("The fields cannot be null!"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(propertyRepository.save(property), HttpStatus.OK);
    }

    public String uploadPropertyImage(Long propertyId, MultipartFile file){
        Property propertySaved = propertyRepository.findById(propertyId)
                .orElse(null);

        if(propertySaved != null){

            String propertyImageId = UUID.randomUUID().toString();
            try{
                s3Service.putObject(
                        "property-images/%s/%s".formatted(propertySaved.getPropertyId(), propertyImageId),
                        s3Buckets.getGlobal(),
                        file.getBytes()
                );
                propertySaved.setPropertyImageId(propertyImageId);
                propertyRepository.save(propertySaved);
                return propertyImageId;
            }catch (IOException e){
                throw new RuntimeException(e);
            }
        }

        return "Object not found.";
    }

    public List<Property> getAllProperties(){
        return propertyRepository.findAll();
    }

    public byte[] getPropertyImage(Long propertyId){
        Property propertySaved = propertyRepository.findById(propertyId).orElse(null);
        if(propertySaved == null){
            throw new RuntimeException("Entity not found.");
        }

        if(propertySaved.getPropertyImageId() != null){
            return s3Service.getObject(
                    "property-images/%s/%s".formatted(propertySaved.getPropertyId(), propertySaved.getPropertyImageId()),
                    s3Buckets.getGlobal()
            );
        }

        throw new RuntimeException("File not found");
    }

    public List<String> getAllImagesByProperty(Long propertyId){
        Property propertySaved = propertyRepository.findById(propertyId).orElse(null);
        if(propertySaved == null){
            throw new RuntimeException("Entity not found.");
        }

        String folderKey = "property-images/%s".formatted(propertySaved.getPropertyId());

        List<S3Object> s3ObjectList = s3Service.listObjects(s3Buckets.getGlobal(), folderKey);

        return s3ObjectList.stream()
                .map(s3Object -> s3Service.generateImageUrl(s3Buckets.getGlobal(), s3Object.key()))
                .collect(Collectors.toList());
    }

    public Property getPropertyDetails(Long propertyId) {
        Property propertySaved = propertyRepository.findById(propertyId)
                .orElse(null);
        if (propertySaved != null) {
            return propertySaved;
        }

        throw new RuntimeException("Property not found.");
    }

    public Long deleteProperty(Long propertyId){
        if(propertyRepository.existsById(propertyId)){
            propertyRepository.deleteById(propertyId);
            return propertyId;
        }

        throw new RuntimeException("Property not found");
    }

    public void deleteAllProperties(){
        propertyRepository.deleteAll();
    }

    public ResponseEntity<Object> followProperty(String userToken, Long propertyId){
        if(!validateUserToken(userToken)){
            new ResponseEntity<>(new RuntimeException("User or token not found."), HttpStatus.NOT_FOUND);
        }
        String username = jwtService.extractUsername(userToken);
        var user = userRepository.findByEmail(username);

        Property propertySaved = propertyRepository.findById(propertyId).orElse(null);
        if(propertySaved != null){
            FollowedProperty followedProperty = FollowedProperty.builder()
                    .user(user.get())
                    .property(propertySaved)
                    .build();
            return new ResponseEntity<>(followedPropertiesRepository.save(followedProperty), HttpStatus.OK);
        }

        return new ResponseEntity<>("Property not found in db.",HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<Object> getFollowedProperties(String userToken){
        if(!validateUserToken(userToken)){
            new ResponseEntity<>(new RuntimeException("User or token not found."), HttpStatus.NOT_FOUND);
        }
        String username = jwtService.extractUsername(userToken);
        var user = userRepository.findByEmail(username);

        return new ResponseEntity<>(
                followedPropertiesRepository.allFollowedPropertiesByUser(user.get().getId()),
                HttpStatus.OK
        );
    }

    public ResponseEntity<Object> unfollowProperty(String userToken, Long propertyId){
        if(!validateUserToken(userToken)){
            new ResponseEntity<>(new RuntimeException("User or token not found."), HttpStatus.NOT_FOUND);
        }
        String username = jwtService.extractUsername(userToken);
        var user = userRepository.findByEmail(username);

        Property propertySaved = propertyRepository.findById(propertyId).orElse(null);
        if(propertySaved != null){
            Set<FollowedProperty> followedProperties = user.get().getFollowedProperties();
            FollowedProperty followedProperty = followedProperties.stream()
                    .filter(fp -> fp.getProperty().getPropertyId().equals(propertySaved.getPropertyId()))
                    .filter(fp -> fp.getUser().getId().equals(user.get().getId()))
                    .findFirst()
                    .orElse(null);

            if(followedProperty != null){
                followedPropertiesRepository.delete(followedProperty);
                return new ResponseEntity<>("Unfollowed property successfully!", HttpStatus.OK);
            }else {
                return new ResponseEntity<>(new RuntimeException("Followed property not found!"), HttpStatus.NOT_FOUND);
            }
        }

        return new ResponseEntity<>("Property not found.",HttpStatus.BAD_REQUEST);
    }

    public String deleteAllFav(){
        followedPropertiesRepository.deleteAll();
        return "Success!";
    }

    private Boolean validateUserToken(String userToken){
        if(userToken == null){
            return false;
        }
        String username = jwtService.extractUsername(userToken);
        User user = userRepository.findByEmail(username).orElse(null);
        Token tokenSaved = tokenRepository.findByToken(userToken).orElse(null);

        if (user == null || tokenSaved == null) {
            return false;
        }

        List<Token> allUserTokens = tokenRepository.allValidTokensByUser(user.getId());
        if(!allUserTokens.contains(tokenSaved)){
            return false;
        }

        return true;
    }
}
