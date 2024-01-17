
import { useEffect, useState } from "react"

import "../../index.css"
import "../css/Properties.css"

import Nav from "../nav/Nav"
import { getAllProperties } from "../../services/PropertyService"

import { Box, Button, FormLabel, InputBase, List, ListItem, Slider } from "@mui/material"
import Icon from "react-icons-kit"
import {thinDown} from 'react-icons-kit/entypo/thinDown'
import PropertiesList from "./PropertiesList"

const PropertiesFilters = () => {
    const [search, setSearch] = useState(false)
    const [properties, setProperties] = useState([])
    const [selectType, setSelectType] = useState(false)
    const [filters, setFilters] = useState({
        type: null,
        price: 0.0,
        bedrooms: 0,
        bathrooms: 0,
        floors: 0,
        location: "",
        onSale: null
    })

    useEffect(() => {
        const fetchProperties = async () => {
            let allProperties = []
            await getAllProperties()
            .then(res => {
                allProperties = res.data;
            })
            .catch(err => {
                console.log(err)
            })

            let filteredProperties = [...allProperties]
            if (filters.type) {
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.type == filters.type);
            }
            if(filters.bedrooms){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.bedrooms == filters.bedrooms);
            }
            if(filters.bathrooms){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.bathrooms == filters.bathrooms);
            }
            if(filters.floors){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.floors == filters.floors);
            }
            if(filters.price){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.price <= filters.price);
            }
            if(filters.location){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.location.toLocaleLowerCase().includes(filters.location.toLocaleLowerCase()));
            }
            if(filters.onSale != null){
                setSearch(true)
                filteredProperties = filteredProperties.filter((property) => property.onSale == filters.onSale);
            }
            setProperties(filteredProperties);
        }

        fetchProperties()
    }, [filters])

    const handleChange = async (e) => {
        await setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = () => {
        if(selectType === false){
            setSelectType(true)
        }else{
            setSelectType(false)
        }
    }

    const valueLabelFormat = (value) => {
        return `$${value}`;
    }

    const handleUndoFilters = () => {
        setSearch(false);
        setFilters({
          type: null,
          price: 0.0,
          bedrooms: 0,
          bathrooms: 0,
          floors: 0,
          location: "",
          onSale: null,
        });
    };

    return (
        <Box 
            height={'auto'} 
            display={'flex'} 
            flexDirection={'column'} 
            minHeight={'100vh'}
            sx={{
                background: 'rgba(0,0,0, .93)',
                color: '#fff'
            }}
        >
            <Nav/>
            <Box padding={'5.5rem 2rem 3rem 2rem'}>
                <Box 
                    display={'flex'}
                    gap={'1rem'}
                    alignItems={'center'}
                    marginBottom={'2rem'}
                    height={'2.5rem'}
                    position={'relative'}
                >
                    <Box height={'100%'}>
                        <Box id="select-type" onClick={handleSelect} className="select" 
                            sx={{
                                width: '120px',
                                display: 'flex',
                                position: 'relative',
                                padding: '10px',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                            Type
                            <Icon icon={thinDown} size={15}></Icon>
                        </Box>
                        {
                            selectType ? 
                                <List 
                                sx={{
                                    background: 'rgba(0,0,0, .97)',
                                    position: 'absolute',
                                    width: '120px',
                                    height: 'auto',
                                    transition: '.4s',
                                    zIndex: '1000'
                                }}>
                                    <ListItem onClick={() => {setFilters({...filters, type: 'HOUSE'})}} sx={{
                                        textAlign: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        transition: '.4s'
                                    }}>House</ListItem>
                                    <ListItem onClick={() => {setFilters({...filters, type: 'APARTMENT'})}} sx={{
                                        textAlign: 'center',
                                        padding: '10px',
                                        cursor: 'pointer',
                                        transition: '.4s'
                                    }}>Apartment</ListItem>
                                </List>
                            : null
                        }
                    </Box>

                    <Box>
                        <Box className="select" 
                            sx={{
                                width: '110px',
                                height: '100%',
                                display: 'flex',
                                position: 'relative',
                                padding: '5px 10px',
                                alignItems: 'center',
                                gap: '.6rem'
                            }}>
                            Floors
                            <InputBase name="floors" onChange={handleChange} type="number" aria-valuemax={'10'} sx={{
                                borderBottom: '1px solid rgba(255,255,255, .4)',
                                padding: '0',
                                height: '21px',
                                marginTop: '.15rem',
                                color: 'rgba(255,255,255, .9)',
                                fontWeight: '400',
                                fontFamily: 'Raleway, serif'
                            }}></InputBase>
                        </Box>
                    </Box>

                    <Box>
                        <Box className="select" 
                            sx={{
                                width: '141px',
                                height: '100%',
                                display: 'flex',
                                position: 'relative',
                                padding: '5px 10px',
                                alignItems: 'center',
                                gap: '.6rem'
                            }}>
                            Bedrooms
                            <InputBase name="bedrooms" onChange={handleChange} type="number" sx={{
                                borderBottom: '1px solid rgba(255,255,255, .4)',
                                padding: '0',
                                height: '21px',
                                marginTop: '.15rem',
                                color: 'rgba(255,255,255, .9)',
                                fontWeight: '400',
                                fontFamily: 'Raleway, serif'
                            }}></InputBase>
                        </Box>
                    </Box>

                    <Box>
                        <Box onChange={handleChange} className="select" 
                            sx={{
                                width: '145px',
                                height: '100%',
                                display: 'flex',
                                position: 'relative',
                                padding: '5px 10px',
                                alignItems: 'center',
                                gap: '.6rem'
                            }}>
                            Bathrooms
                            <InputBase name="bathrooms" type="number" sx={{
                                borderBottom: '1px solid rgba(255,255,255, .4)',
                                padding: '0',
                                height: '21px',
                                marginTop: '.15rem',
                                color: 'rgba(255,255,255, .9)',
                                fontWeight: '400',
                                fontFamily: 'Raleway, serif'
                            }}></InputBase>
                        </Box>
                    </Box>

                    <Box>
                        <Box onChange={handleChange} className="select" 
                            sx={{
                                width: '270px',
                                height: '100%',
                                display: 'flex',
                                position: 'relative',
                                padding: '5px 10px',
                                alignItems: 'center',
                                gap: '.6rem'
                            }}>
                            Location
                            <InputBase name="location" type="text" sx={{
                                borderBottom: '1px solid rgba(255,255,255, .4)',
                                padding: '0',
                                height: '21px',
                                marginTop: '.15rem',
                                color: 'rgba(255,255,255, .9)',
                                fontWeight: '400',
                                fontFamily: 'Raleway, serif'
                            }}></InputBase>
                        </Box>
                    </Box>

                    <Box>
                        <Box className="select" 
                            sx={{
                                width: '230px',
                                height: '100%',
                                display: 'flex',
                                position: 'relative',
                                padding: '5px 10px',
                                alignItems: 'center',
                                gap: '1.2rem'
                            }}>
                            Price(MAX.)
                            <Slider 
                            id="price-slider"
                            valueLabelDisplay="auto"
                            valueLabelFormat={valueLabelFormat}
                            min={8000.00}
                            max={14000000.00}
                            onChange={(e, value) => setFilters({ ...filters, price: value })}
                            sx={{
                                color: '#fff',
                                width: '120px',
                                height: '2px'
                            }}></Slider>
                        </Box>
                    </Box>

                    <Box 
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <Box
                            display={'flex'}
                            gap={'.5rem'}
                        >
                            <InputBase 
                                onClick={() => setFilters({...filters, onSale: true})} 
                                name="filterRadio" 
                                value="onSale" 
                                type="radio"                            
                                checked={filters.onSale === true}
                            >
                            </InputBase>
                            <FormLabel sx={{
                                color: '#fff',
                                fontFamily: 'Raleway, serif'
                            }}>On sale</FormLabel>
                        </Box>

                        <Box
                            display={'flex'}
                            gap={'.5rem'}
                        >
                            <InputBase 
                                onClick={() => setFilters({...filters, onSale: false})} 
                                name="filterRadio" 
                                value="onRent" 
                                type="radio"
                                checked={filters.onSale === false}
                            >
                            </InputBase>
                            <FormLabel sx={{
                                color: '#fff',
                                fontFamily: 'Raleway, serif'
                            }}>On rent</FormLabel>
                        </Box>
                    </Box>
                    
                    {
                        search ? 
                            <Button onClick={handleUndoFilters} sx={{
                                color: '#fff',
                                fontSize: '.8rem',
                                fontFamily: 'Raleway, serif',
                                textTransform: 'lowercase',
                                padding: '2px',
                                position: 'absolute',
                                right: '1.5rem',
                                bottom: '-1.7rem',
                                ":hover": {
                                    background: 'transparent'
                                }
                            }}>(Undo filters)</Button>
                        :null
                    }
                </Box>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(3, 1fr)'}
                    rowGap={'1.5rem'}
                    columnGap={'2rem'}
                >
                    <PropertiesList properties={properties}/>
                </Box>
            </Box>
        </Box>
    )
}

export default PropertiesFilters