import { Link } from "react-router-dom"
import "../../index.css"
import "../css/HomeSelections.css"

import { Box, Typography } from "@mui/material"

const HomeSelections = () => {

  return (
    <Box 
      display={'grid'} 
      width={'100%'} 
      padding={'2.3rem 0'} 
      height={'110vh'} 
      gridTemplateColumns={'repeat(2, 1fr)'}
      sx={{
        background: 'rgba(0,0,0, 0.94)'
      }}
    >
        <Link 
          id="selections-1"  
          onMouseOver={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '.5'}
          to="/properties/all" 
        >
            <Typography 
                typography={'p'} 
                fontSize={'1.2rem'} 
                color={'#fff'} 
                textAlign={'center'}
                margin={'auto'}
                sx={{transition: '.3s'}}
              >
                View Houses
            </Typography>
        </Link>
        <Link 
          id="selections-2" 
          onMouseOver={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '.5'}
          to="/properties/all" 
        >
            <Typography 
                typography={'p'} 
                fontSize={'1.2rem'} 
                color={'#fff'} 
                textAlign={'center'}
                margin={'auto'}
                sx={{transition: '.3s'}}
              >
                View Apartments
            </Typography>
        </Link>
        
    </Box>
  )
}

export default HomeSelections