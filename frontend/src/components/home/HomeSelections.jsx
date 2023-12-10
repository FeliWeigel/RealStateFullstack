import { Link } from "react-router-dom"
import "../../index.css"
import "../css/HomeSelections.css"

import { Box, Typography } from "@mui/material"

const HomeSelections = () => {

  function imageHover1(){
    let selectionsText1 = document.getElementById('selections-txt-1')
    selectionsText1.style.opacity = "1"
  }

  function imageHover2(){
    let selectionsText2 = document.getElementById('selections-txt-2')
    selectionsText2.style.opacity='1'
  }

  function imageHover3(){
    let selectionsText3 = document.getElementById('selections-txt-3')
    selectionsText3.style.opacity='1'
  }

  return (
    <Box display={'grid'} width={'100%'} padding={'2.3rem 0'} height={'110vh'} gridTemplateColumns={'repeat(3, 1fr)'}
      sx={{
        background: 'rgba(0,0,0, 0.94)'
      }}
    >
        <Link id="selections-1" onMouseOver={imageHover1} to="properties/rust" >
            <p id="selections-txt-1" 
            >
              Rust House
            </p>
        </Link>
        <Link id="selections-2" onMouseOver={imageHover2} to="properties/minimalist" >
            <Typography id="selections-txt-2"  typography={'p'} 
                fontSize={'1.2rem'} 
                color={'#fff'} 
                textAlign={'center'}
                margin={'auto'}
                sx={{transition: 'ease-in .3s', opacity: '0'}}
              >
                Minimalist House
            </Typography>
        </Link>
        <Link id="selections-3" onMouseOver={imageHover3} to="properties/modern" >
            <Typography id="selections-txt-3"  typography={'p'} 
              fontSize={'1.2rem'} 
              color={'#fff'} 
              textAlign={'center'}
              margin={'auto'}
              sx={{transition: 'ease-in .3s', opacity: '0'}}
            >
              Modern House
            </Typography>
        </Link>
        
    </Box>
  )
}

export default HomeSelections