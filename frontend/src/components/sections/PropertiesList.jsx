import "../../index.css"
import "../css/Properties.css"

import Nav from "../nav/Nav"
import home1 from "../../assets/images/home-2.png"

import { Box, Card, Typography } from "@mui/material"


const PropertiesList = () => {
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
                <Card sx={{
                    padding: '.5rem',
                    background: '#fff',
                }}>
                    <img className="property-img" src={home1} alt="home 1" />
                    <Box padding={'.5rem .7rem'}>
                        <Typography typography={'h5'}>
                            Modern luxury house 
                        </Typography>
                        <Typography typography={'h6'} fontSize={'1rem'} color={'rgba(0,0,0, .7)'}>
                            Av. Sunny Island 157. Carolina, Toronto.
                        </Typography>
                        <Box display={'flex'} gap={'.5rem'} marginBottom={'1.3rem'}>
                            <Typography typography={'p'}>
                                Floors: 2
                            </Typography>
                            <Typography typography={'p'}>
                                Bedrooms: 3
                            </Typography>
                            <Typography typography={'p'}>
                                Bathrooms: 2
                            </Typography>
                        </Box>
                        <Typography typography={'p'} fontSize={'1.3rem'}>
                            $78000.00
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </Box>
    </Box>
  )
}

export default PropertiesList