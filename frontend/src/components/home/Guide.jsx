import "../../index.css"
import "../css/Guide.css"

import { Box, Card, Typography } from '@mui/material'
import guideSvg1 from "../../assets/svg/guide-1.svg"
import guideSvg2 from "../../assets/svg/guide-2.svg"
import guideSvg3 from "../../assets/svg/guide-3.svg"
const Guide = () => {
  return (
    <Box 
        width={'100%'}
        height={'105vh'}
        position={'relative'}
        sx={{background: 'rgba(0,0,0, 0.94)'}}
    >
        <Box 
            position={'absolute'} top={'-2rem'}
            display={'flex'} justifyContent={'center'}
            width={'100%'} gap={'3rem'}
        >
            <Card sx={{
                width: '200px',
                padding: '1.2rem 0',
                background: '#000'
            }}>
                <Typography 
                    typography={'h5'}
                    color={'#fff'}
                    fontSize={'2.2rem'}
                    textAlign={'center'}
                >
                        +1.5k
                </Typography>
                <Typography 
                    typography={'p'}
                    color={'rgba(255,255,255, .7)'}
                    fontSize={'1.1rem'}
                    textAlign={'center'}
                >
                        
                    Properties for sale
                </Typography>
            </Card>
            <Card sx={{
                width: '200px',
                padding: '1.2rem 0',
                background: '#000'
            }}>
                <Typography 
                    typography={'h5'}
                    color={'#fff'}
                    fontSize={'2.2rem'}
                    textAlign={'center'}
                >
                        +70
                </Typography>
                <Typography 
                    typography={'p'}
                    color={'rgba(255,255,255, .7)'}
                    fontSize={'1.1rem'}
                    textAlign={'center'}
                >
                        
                        Cities/States
                </Typography>
            </Card>
            <Card sx={{
                width: '200px',
                padding: '1.2rem 0',
                background: '#000'
            }}>
                <Typography 
                    typography={'h5'}
                    color={'#fff'}
                    fontSize={'2.2rem'}
                    textAlign={'center'}
                >
                    +1.2mill.
                </Typography>
                <Typography 
                    typography={'p'}
                    color={'rgba(255,255,255, .7)'}
                    fontSize={'1.1rem'}
                    textAlign={'center'}
                >   
                    Satisfied customers
                </Typography>
            </Card>
        </Box>

        <Box padding={'6.5rem 1.8rem 0rem 1.8rem'}>
            <Typography typography={'h3'} fontSize={'2.2rem'} color={'#fff'} marginBottom={'1.7rem'}>
                How to buy or rent a property in Real State?
            </Typography>
            <Box sx={{
                display: 'flex'
            }}>
                <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'2rem'}>
                    <Box 
                        width={'350px'} 
                        height={'370px'}
                        display={'flex'} 
                        flexDirection={'column'} 
                        borderRight={'1px solid rgba(255,255,255, .7)'} 
                        paddingRight={'2rem'}
                    >
                        <Box>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1.3rem'} 
                                color={'#fff'} 
                                marginBottom={'.2rem'}
                            >
                                Search the house you like in the location you want
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1rem'} 
                                color={'rgba(255,255,255, .6)'} 
                                fontFamily={"'Lora', serif"}
                            >
                                You can use filters and sorting to improve your search.
                            </Typography>
                        </Box>
                        <img className="step-img step-img-1" src={guideSvg1} alt="first step" />
                    </Box>
                    <Box 
                        width={'350px'} 
                        height={'370px'}
                        display={'flex'} 
                        flexDirection={'column'} 
                        borderRight={'1px solid rgba(255,255,255, .7)'} 
                        paddingRight={'2rem'}
                    >
                        <Box>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1.3rem'} 
                                color={'#fff'} 
                                marginBottom={'.2rem'}
                            >
                                Define the customization parameters for your property
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1rem'} 
                                color={'rgba(255,255,255, .6)'} 
                                fontFamily={"'Lora', serif"}
                            >
                                The customization parameters vary depending on the property you choose.
                            </Typography>
                        </Box>
                        <img className="step-img" src={guideSvg2} alt="second step" />
                    </Box>
                    <Box 
                        width={'350px'} 
                        height={'370px'}
                        display={'flex'} 
                        flexDirection={'column'} 
                        borderRight={'1px solid rgba(255,255,255, .7)'} 
                        paddingRight={'2rem'}
                    >
                        <Box>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1.3rem'} 
                                color={'#fff'} 
                                marginBottom={'.2rem'}
                            >
                                Sign the contract and become the owner!
                            </Typography>
                            <Typography 
                                typography={'p'} 
                                fontSize={'1rem'} 
                                color={'rgba(255,255,255, .6)'} 
                                fontFamily={"'Lora', serif"}
                            >
                                One of our sellers will agree on the contract/sale with you.
                            </Typography>
                        </Box>
                        <img className="step-img step-img-3" src={guideSvg3} alt="third step" />
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>
  )
}

export default Guide