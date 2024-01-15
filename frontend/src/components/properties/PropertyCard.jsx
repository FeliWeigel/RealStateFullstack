/* eslint-disable react/prop-types */
import "../../index.css"
import "../css/Properties.css"

import { getPropertyImageUrl } from "../../services/PropertyService"

import { Box, Button, Card, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {socialBuffer} from 'react-icons-kit/ionicons/socialBuffer'
import {bath} from 'react-icons-kit/fa/bath'
import {bed} from 'react-icons-kit/fa/bed'
import {location} from 'react-icons-kit/icomoon/location'

const PropertyCard = ({property}) => {

    return (
        <Card sx={{
            padding: '.5rem',
            background: '#fff',
            position: 'relative',
            border: '1px solid rgba(0,0,0, .93)'
        }}>
            
            <img className="property-img" src={getPropertyImageUrl(property.propertyId)} alt="Property Image" />
            <Box padding={'.5rem .7rem'}>
                <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                >
                    <Typography typography={'h5'}>
                        {property.name}
                    </Typography>
                    <Typography 
                        typography={'p'}
                        fontSize={'1.1rem'}
                        color={'#fff'}
                        padding={'1px 5px'}
                        sx={{background: 'rgba(0,0,0, .93)'}}
                    >
                        {property.onSale ? "On Sale" : "On Rent"}
                    </Typography>
                </Box>
                <Typography typography={'h6'} fontSize={'1rem'} color={'rgba(0,0,0, .7)'}>
                    <Icon className="card-icon" icon={location} size={18}></Icon>{property.location}
                </Typography>
                <Box display={'flex'} padding={'0px 3px'} gap={'.7rem'} marginBottom={'1.3rem'}>
                    <Typography typography={'p'} color={'rgba(0,0,0, .7)'}>
                        <Icon className="card-icon" icon={socialBuffer} size={14}></Icon>: {property.floors}
                    </Typography>
                    <Typography typography={'p'} color={'rgba(0,0,0, .7)'}>
                        <Icon className="card-icon" icon={bed} size={14}></Icon>: {property.bedrooms}
                    </Typography>
                    <Typography typography={'p'} color={'rgba(0,0,0, .7)'}>
                        <Icon className="card-icon" icon={bath} size={13}></Icon>: {property.bathrooms}
                    </Typography>
                </Box>
                <Typography typography={'p'} fontSize={'1.05rem'}>
                    Estimated price: ${property.price}
                </Typography>
                <Button
                sx={{
                    position: 'absolute',
                    bottom: '0',
                    right: '-.1rem',
                    padding: '3px 7px',
                    transition: '.4s',
                    borderRadius: '0px',
                    background: 'rgba(0,0,0, .80)',
                    color: '#fff',
                    ":hover": {
                        background: 'rgba(0,0,0, .73)',
                    }  
                }}>
                    Explore
                </Button>
            </Box>
        </Card>
    )
}

export default PropertyCard