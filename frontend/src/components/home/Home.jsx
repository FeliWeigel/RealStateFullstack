import "../../index.css"
import "../css/Home.css"
import Nav from "../nav/Nav"

import { Box, Typography } from "@mui/material"

import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"


const Home = () => {
  return (
    <Box id="home-container" sx={{
      width:'100%',
      height: '100vh',
      position: 'relative'
    }}>
      <Nav/>
      <Box sx={{
        height: 'calc(100vh - 4rem)',
        width: '100%',
        position: "absolute",
        bottom: '0',
        padding: '0rem 3rem',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Box width={'75%'} display={'flex'} alignItems={'center'} gap={'4rem'} height={'80%'}>
          <Box width={'41%'} textAlign={'center'}>
              <img className="home-logo" src={logo} alt="logo image" />
              <Typography 
                  typography={'h3'} 
                  fontFamily={"'Lora', serif"} 
                  fontWeight={'500'}
                  fontSize={'2.1rem'}
                  color={'rgba(255,255,255, .7)'}
                  marginBottom={'.7rem'}
              >
                  Real State
              </Typography>
              <Typography 
                  typography={'h1'} 
                  fontSize={'3rem'}
                  color={'#fff'}
                  textAlign={'left'}
              >Find your place, enjoy your home.</Typography>
          </Box>

          <Box width={'50%'} marginTop={'2rem'}>
            <Typography typography={'h3'} 
              fontSize={'1.33rem'}
              color={"rgba(255,255,255, .7)"} 
              textAlign={'center'}
              borderBottom={'1px solid rgba(255,255,255, .3)'} 
              paddingBottom={'.8rem'}
              fontFamily={"'Lora', serif"} >
                Explore more than 1500 properties, looking for the one that suits your taste and needs.
            </Typography>

            <Box display={'flex'} justifyContent={'center'} gap={'1rem'} marginTop={'.8rem'}>
              <Link to="/properties/all"><button className="home-link home-link-1">View Properties</button></Link>
              <button className="home-link home-link-2">Check Featured</button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Home