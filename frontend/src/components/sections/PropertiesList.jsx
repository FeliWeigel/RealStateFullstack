import { useEffect, useState } from "react"
import "../../index.css"
import { getAllProperties } from "../../services/PropertyService"
import "../css/Properties.css"

import Nav from "../nav/Nav"

import { Box, Typography } from "@mui/material"
import PropertyCard from "../cards/PropertyCard"


const PropertiesList = () => {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        getAllProperties()
        .then(res => {
            setProperties(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [properties])
    
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
                    border={1} 
                    height={'5rem'} 
                    marginBottom={'1.4rem'}
                >
                    <Typography typography={'h4'}>filters</Typography>
                </Box>
                <Box
                    display={'grid'}
                    gridTemplateColumns={'repeat(3, 1fr)'}
                    rowGap={'1.5rem'}
                    columnGap={'2rem'}
                    padd
                >
                    { properties.length != 0 ? 
                        properties.map(property => {
                            return ( 
                                <PropertyCard 
                                    key={property.propertyId} 
                                    property={property}
                                />
                            )
                        })
                        : null
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default PropertiesList