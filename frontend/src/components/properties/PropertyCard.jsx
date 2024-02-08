/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import "../../index.css"
import "../css/Properties.css"

import { addFollowToProperty, allFollowedProperties, 
    getPropertyImageUrl, removeFollowToProperty } from "../../services/PropertyService"

import { Box, Button, Card, Typography } from "@mui/material"

import Icon from "react-icons-kit"
import {socialBuffer} from 'react-icons-kit/ionicons/socialBuffer'
import {bath} from 'react-icons-kit/fa/bath'
import {bed} from 'react-icons-kit/fa/bed'
import {location} from 'react-icons-kit/icomoon/location'
import {starEmpty} from 'react-icons-kit/icomoon/starEmpty'
import {starFull} from 'react-icons-kit/icomoon/starFull'

const PropertyCard = ({property}) => {
    const [allFavorites, setAllFavorites] = useState([])
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        const favoritesFromStorage = JSON.parse(localStorage.getItem("favorite_list"));
        if (favoritesFromStorage) {
            setAllFavorites(favoritesFromStorage);
        }
        if (sessionStorage.getItem("access_token") != null) {
            allFollowedProperties()
            .then(res => {
                localStorage.setItem("favorite_list", JSON.stringify(res.data));
                setAllFavorites(res.data);
                setFavorite(res.data.includes(property));
            })
            .catch(err => console.log(err));
        }
    }, []);

    const handleFollow = () => {
        const updatedFavorites = [...allFavorites];
        if (allFavorites.some(favorite => favorite.propertyId == property.propertyId) || favorite) {
            removeFollowToProperty(property.propertyId)
            .then(() => {
                setFavorite(false);
                const indexToRemove = updatedFavorites.findIndex(favorite => favorite.propertyId === property.propertyId);
                if (indexToRemove != -1) {
                    updatedFavorites.splice(indexToRemove, 1);
                    setAllFavorites(updatedFavorites);
                    localStorage.setItem("favorite_list", JSON.stringify(updatedFavorites));
                }
            })
            .catch(err => console.log(err));
        } else {
            addFollowToProperty(property.propertyId)
            .then(() => {
                setFavorite(true);
                updatedFavorites.push(property);
                setAllFavorites(updatedFavorites);
                localStorage.setItem("favorite_list", JSON.stringify(updatedFavorites));
            })
            .catch(err => console.log(err));
        }
    };


    return (
        <Card sx={{
            padding: '.5rem',
            background: '#fff',
            position: 'relative',
            border: '1px solid rgba(0,0,0, .93)'
        }}>
            
            <Typography 
                typography={'p'}
                fontSize={'1.1rem'}
                color={'#fff'}
                position={'absolute'}
                top={'1.2rem'}
                right={'.5rem'}
                padding={'1px 5px'}
                sx={{background: 'rgba(0,0,0, .93)'}}
            >
                {property.onSale ? "On Sale" : "On Rent"}
            </Typography>
            
            <img className="property-img" src={getPropertyImageUrl(property.propertyId)} alt="Property Image" />
            <Box padding={'.5rem .7rem'}>
                <Box
                display={'flex'}
                alignItems={'center'}
                gap={'.5rem'}
                >
                    <Typography typography={'h5'}>
                        {property.name}
                    </Typography>
                    <Icon
                        className="fav-icon"
                        size={21} 
                        icon={localStorage.getItem("favorite_list").includes(property.propertyId) || favorite ? starFull : starEmpty}
                        onClick={handleFollow}
                    >
                    </Icon>
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
                <Link to={`/properties/details/${property.propertyId}`}>
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
                </Link>
            </Box>
        </Card>
    )
}

export default PropertyCard