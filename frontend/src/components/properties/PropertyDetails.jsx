/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import "../../index.css"
import "../css/Properties.css"
import { getAllPropertyImages, getPropertyDetails, getPropertyImageUrl } from "../../services/PropertyService"
import Nav from "../nav/Nav"

import { Box, Button, Typography } from "@mui/material"

const PropertyDetails = () => {
    const propertyId = useParams('propertyId')
    const [property, setProperty] = useState({})
    const [images, setImages] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);
    
    useEffect(() => {
      getPropertyDetails(propertyId)
      .then(res => {
        setProperty(res.data)
      })
      .catch(err => {
        console.log(err)
      })

      getAllPropertyImages(propertyId)
      .then(res => setImages(res.data))
      .catch(err => console.log(err))
    },[])
    
    return (
      <Box
          height={'auto'}
          minHeight={'110vh'}
          sx={{
            background: 'rgba(0,0,0, .93)'
          }}
      >
          <Nav/>

          <Box 
            height={'110vh'}
            display={'flex'} 
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              gap={'3rem'}
              padding={'0 4rem'}
              >
              <Box 
                display={'flex'}
                width={'60%'}
                flexDirection={'column'}
                alignItems={'center'}
                rowGap={'1.4rem'}
              >
                <img 
                  className="property-details-img" 
                  src={selectedImage === null ? getPropertyImageUrl(property.propertyId) : selectedImage} 
                  alt="property image" 
                />
                <Box
                  display={'flex'}
                  columnGap={'1rem'}
                >
                  {images.map(image => (
                      <img 
                        className="property-details-img img-sec" 
                        key={image} 
                        src={image} 
                        alt="property image" 
                        onClick={(e) => setSelectedImage(e.target.src)}
                      />
                  ))}
                </Box>
              </Box>

              <Box
                width={'35%'}
                display={'flex'}
                flexDirection={'column'}
              >
                <Typography 
                    typography={'h4'} 
                    fontSize={'1.7rem'}
                    marginBottom={'.3rem'} 
                    fontWeight={'600'} 
                    fontFamily={'Raleway, serif'}
                    color={'#fff'}
                >
                  {property.name}
                </Typography>
                <Typography 
                    typography={'h4'} 
                    fontSize={'1.3rem'} 
                    fontWeight={'400'} 
                    fontFamily={'Raleway, serif'}
                    color={'rgba(255,255,255, .85)'}
                    marginBottom={'.2rem'}
                >
                  {property.location}
                </Typography>
                <Typography 
                    typography={'p'} 
                    fontSize={'1.1rem'} 
                    fontWeight={'400'} 
                    color={'rgba(255,255,255, .9)'}
                    marginBottom={'.5rem'}
                >
                  ${property.price}
                </Typography>
                
                <Typography 
                    typography={'p'} 
                    fontSize={'1rem'} 
                    fontWeight={'400'}
                    color={'rgba(255,255,255, .7)'}
                >
                  {property.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime suscipit inventore illo quibusdam voluptatibus culpa quidem, fuga quam, debitis quaerat perferendis. Delectus, quam. Qui, recusandae laboriosam libero, mollitia rem, ex sint accusamus cum ducimus deleniti fuga dignissimos inventore voluptatem ipsum. Lorem ipsum dolor sit.
                </Typography>

                <Link to={`/properties/contact/${property.propertyId}`}>
                  <Button sx={{
                      color: 'rgba(0,0,0, .9)',
                      background: '#fff',
                      padding: '4px 0',
                      width: '120px',
                      marginTop: '.5rem',
                      border: '1px solid #fff',
                      ":hover": {
                        background: 'rgba(30,30,30)',
                        color: '#fff'
                      }
                  }}>
                    Contact
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
      </Box>
    )
}

export default PropertyDetails