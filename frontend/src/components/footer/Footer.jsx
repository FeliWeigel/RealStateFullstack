import "../../index.css"

import { Link } from "react-router-dom"
import logo from "../../assets/images/logo.png"

import { Box, Typography } from "@mui/material"

const Footer = () => {
  return (
    <Box 
        id="footer-container"
        height={'60vh'} 
        padding={'2rem 2.5rem'}
        sx={{
            background: 'rgba(0,0,0, .96)'
        }}
    >
        <Box marginBottom={'1.7rem'}>
            <img className="footer-logo" src={logo} alt="logo" />
            <Typography 
                typography={'p'}
                fontSize={'.9rem'}
                fontWeight={'400'}
                fontFamily={'lora serif'}
                color={'#fff'}
                lineHeight={'12px'}
            >Real State</Typography>
        </Box>
        <Box 
            id="footer-columns"
            display={'flex'}
            width={'80%'}
            margin={'0 auto'}
            justifyContent={'space-between'}
        >
            <Box 
                display={'flex'}
                flexDirection={'column'}
                gap={'.25rem'}
            >
                <Typography 
                    id="footer-section"
                    typography={'p'} color={'#fff'}
                    fontSize={'1.2rem'} fontFamily={'lora serif'}
                >
                    About Us
                </Typography>
                <Link className="footer-link">Why real state?</Link>
                <Link className="footer-link">Privacy policies</Link>
                <Link className="footer-link">Terms and conditions</Link>
                <Link className="footer-link">Legal information</Link>
                <Link className="footer-link">Cookies and data security</Link>
            </Box>

            <Box 
                display={'flex'}
                flexDirection={'column'}
                gap={'.25rem'}
            >
                <Typography 
                    id="footer-section"
                    typography={'p'} color={'#fff'}
                    fontSize={'1.2rem'} fontFamily={'lora serif'}
                >
                    Help
                </Typography>
                <Link className="footer-link">How to use real state</Link>
                <Link className="footer-link">Frequent questions</Link>
                <Link className="footer-link">Help community</Link>
                <Link className="footer-link">Contact Us</Link>
                <Link className="footer-link">Payment information</Link>
            </Box>

            <Box 
                display={'flex'}
                flexDirection={'column'}
                gap={'.25rem'}
            >
                <Typography 
                    id="footer-section"
                    typography={'p'} color={'#fff'}
                    fontSize={'1.2rem'} fontFamily={'lora serif'}
                >
                    Social media
                </Typography>
                <Link className="footer-link">Facebook</Link>
                <Link className="footer-link">Instagram</Link>
                <Link className="footer-link">Twitter</Link>
                <Link className="footer-link">Gmail</Link>
                <Link className="footer-link">Linkedin</Link>
            </Box>
        </Box>
        <Typography 
            id="footer-copy"
            typography={'p'}
            fontSize={'.82rem'}
            color={'rgba(255,255,255, .7)'}
            textAlign={'center'}
            marginTop={'3rem'}
        > 
            &copy; 2023 Real State project by WMDeveloper | All rights reserved.
        </Typography>
    </Box>
  )
}

export default Footer