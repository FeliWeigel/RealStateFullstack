import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "../../index.css"
import "../css/Properties.css"
import { getAllPropertyImages, getPropertyDetails } from "../../services/PropertyService"

import { Box, Typography } from "@mui/material"

const PropertyDetails = () => {
    const propertyId = useParams('propertyId')
    const [property, setProperty] = useState({})
    const [images, setImages] = useState([])
    
    useEffect(() => {
      getPropertyDetails(propertyId)
      .then(res => {
        setProperty(res.data)
        console.log(res.data)
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
          display={'flex'}
          flexDirection={'column'}
          height={'auto'}
          minHeight={'100vh'}
          gap={'4rem'}    
          sx={{
            background: 'rgba(0,0,0, .93)'
          }}
      >
          <Typography 
              typography={'h4'} 
              fontSize={'1.4rem'} 
              fontWeight={'600'} 
              fontFamily={'Raleway, serif'}
          >
            {property.name}
          </Typography>
          <Typography 
              typography={'h4'} 
              fontSize={'1.3rem'} 
              fontWeight={'600'} 
              fontFamily={'Raleway, serif'}
          >
            {property.location}
          </Typography>
          <Typography 
              typography={'h4'} 
              fontSize={'1.1rem'} 
              fontWeight={'600'} 
              fontFamily={'Raleway, serif'}
          >
            ${property.price}
          </Typography>
          {images.map(image => (
            <img className="property-details-img" key={image} src={image} alt="property image" />
          ))}
      </Box>
    )
}

export default PropertyDetails