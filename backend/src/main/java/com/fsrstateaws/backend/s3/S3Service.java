package com.fsrstateaws.backend.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Client s3Client;

    public void putObject(String key, String bucketName, byte[] file){
        PutObjectRequest putObjectRequest =  PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType("image/png")
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file));
    }

    public byte[] getObject(String key, String bucketName){
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(getObjectRequest);

        try{
            return response.readAllBytes();
        }catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    public List<S3Object> listObjects(String bucketName, String folderKey) {
        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(folderKey)
                .build();

        ListObjectsV2Response response = s3Client.listObjectsV2(request);
        List<S3Object> s3ObjectList = new ArrayList<>();

        for(S3Object s3Object : response.contents()){
            s3ObjectList.add(s3Object);
        }

        return s3ObjectList;
    }

    public String generateImageUrl(String bucketName, String key) {
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        URL signedUrl = s3Client.utilities().getUrl(getUrlRequest);
        return signedUrl.toString();
    }

}
