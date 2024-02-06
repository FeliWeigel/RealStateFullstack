/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { getPropertyImageUrl } from "../../services/PropertyService"

import { Box, Button, Card, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {socialBuffer} from 'react-icons-kit/ionicons/socialBuffer'
import {bath} from 'react-icons-kit/fa/bath'
import {bed} from 'react-icons-kit/fa/bed'


const FollowedPropsPopUp = ({properties}) => {
  return (
    <Box
        sx={{
            background: '#000',
            padding: '1rem 2rem',
            height: '95vh',
            width: '80%',
            zIndex: '10000',
            marginTop: '1.5rem',
            position: 'relative',
            boxShadow: '0px 0px 3px 0px rgba(255,255,255, .3)'
        }}
    >
        <Box 
        sx={{
            position: 'absolute',
            top: '3rem',
            left: '0',
            width: '161px',
            height: '.5px',
            background: 'rgba(255,255,255,.8)'
        }}
        >
        </Box>
        <Typography 
            typography={'h5'}
            color={'#fff'}
            fontSize={'1.5rem'}
            fontFamily={"'Raleway', serif"} 
            marginBottom={'1.4rem'}   
        >
            All favorites
        </Typography>
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                columnGap: '1.5rem',
                rowGap: '1.8rem',
                placeItems: 'center',
            }}
        >   
            {
                properties != null ?
                properties.map((property) => {
                return (
                    <Card key={property.propertyId} 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1rem',
                        height: '195px',
                        background: 'transparent',
                        boxShadow: '0px 0px 5px 0px rgba(255,255,255, .3)',
                        position: 'relative'
                    }}
                    >
                    <img className="popup-img" src={getPropertyImageUrl(property.propertyId)}/>
                    <Box
                        padding={'1rem'}
                    >
                        <Typography color={'#fff'} typography={'h5'} fontSize={'1rem'}>
                            {property.name}
                        </Typography>
                        <Typography color={'rgba(255,255,255, .65)'} typography={'h6'} fontSize={'.8rem'}>
                            {property.location}
                        </Typography>
                        
                        
                        <Box display={'flex'} alignItems={'center'} gap={'.4rem'} color={'#fff'}>
                            <Typography color={'#fff'} typography={'h5'} fontSize={'.85rem'}>
                                ${property.price}
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                color={'rgba(255,255,255, .8)'}
                                fontSize={'.7rem'}
                            >
                                <Icon icon={socialBuffer} size={12}></Icon> {property.floors}
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                color={'rgba(255,255,255, .8)'}
                                fontSize={'.7rem'}
                            >
                                <Icon icon={bed} size={12}></Icon> {property.bedrooms}
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                color={'rgba(255,255,255, .8)'}
                                fontSize={'.7rem'}
                            >
                                <Icon icon={bath} size={10}></Icon> {property.bathrooms}
                            </Typography>
                        </Box>

                    </Box>
                    <Link to={`/properties/details/${property.propertyId}`}>
                        <Button
                        sx={{
                            background: '#fff',
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            borderRadius: '0',
                            color: 'rgba(0,0,0, .9)',
                            fontSize: '.60rem',
                            padding: '4px',
                            ":hover": {
                            background: 'rgba(140,140,140)'
                            }
                        }}
                        >Explore</Button>
                    </Link>
                    </Card>
                )
                })
                : null
            }
        </Box>
    </Box>
  )
}

export default FollowedPropsPopUp