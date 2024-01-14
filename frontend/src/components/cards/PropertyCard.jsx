/* eslint-disable react/prop-types */
import "../../index.css"
import "../css/Properties.css"

import { getPropertyImageUrl } from "../../services/PropertyService"
import { Box, Card, Typography } from "@mui/material"

const PropertyCard = ({property}) => {

    return (
        <Card sx={{
            padding: '.5rem',
            background: '#fff',
        }}>
            
            <img className="property-img" src={getPropertyImageUrl(property.propertyId)} alt="Property Image" />
            <Box padding={'.5rem .7rem'}>
                <Typography typography={'h5'}>
                    {property.name}
                </Typography>
                <Typography typography={'h6'} fontSize={'1rem'} color={'rgba(0,0,0, .7)'}>
                    {property.location}
                </Typography>
                <Box display={'flex'} gap={'.5rem'} marginBottom={'1.3rem'}>
                    <Typography typography={'p'}>
                        Floors: {property.floors}
                    </Typography>
                    <Typography typography={'p'}>
                        Bedrooms: {property.bedrooms}
                    </Typography>
                    <Typography typography={'p'}>
                        Bathrooms: {property.bathrooms}
                    </Typography>
                </Box>
                <Typography typography={'p'} fontSize={'1.3rem'}>
                    ${property.price}
                </Typography>
            </Box>
        </Card>
    )
}

export default PropertyCard