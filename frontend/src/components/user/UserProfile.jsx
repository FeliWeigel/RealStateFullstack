import { useEffect, useState } from "react"

import "../../index.css"
import "../css/User.css"

import Nav from "../nav/Nav"
import { userDetails } from "../../services/UserService"


import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const UserProfile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    userDetails()
    .then(res => {
      console.log(res.data)
      setUser(res.data)
    })
    .catch(err => console.log(err))
  },[])

  return (
    <Box 
        height={'auto'}
        minHeight={'100vh'}
        sx={{
            background: 'rgba(0,0,0, .93)'
        }}
    >
        <Nav/>
        <Box 
          display={'flex'}
          gap={'3rem'}
          height={'100vh'} 
          alignItems={'center'}
          padding={'0 4rem'}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            rowGap={'.5rem'}
            color={'#fff'}
          >
            <Typography 
              typography={'h4'}
              position={'relative'}
              marginBottom={'1.5rem'}
              sx={{
                ":before": {
                  content: "''",
                  position: 'absolute',
                  height: '2px',
                  width: '50px',
                  background: '#fff',
                  bottom: '-.1rem',
                  left: '.15rem'
                }
              }}
            >
              Your account details
            </Typography>
            <Typography 
              typography={'p'}
              fontSize={'1.3rem'}
              fontFamily={'Raleway, serif'}
              fontWeight={'600'}
            >
              Firstname: <span>Felipe</span>
            </Typography>
            <Typography 
              typography={'p'}
              fontSize={'1.3rem'}
              fontFamily={'Raleway, serif'}
              fontWeight={'500'}
            >
              Lastname: <span>Weigel Munioz</span>
            </Typography>
            <Typography 
              typography={'p'}
              fontSize={'1.3rem'}
              fontFamily={'Raleway, serif'}
              fontWeight={'500'}
            >
              Email: <span>fweigel24@gmail.com</span>
            </Typography>
            <Typography 
              typography={'p'}
              fontSize={'1.3rem'}
              fontFamily={'Raleway, serif'}
              fontWeight={'500'}
            >
              Birthdate: <span>2003-04-24</span>
            </Typography>

            <Box 
              display={'flex'}
              flexDirection={'column'}
              rowGap={'.7rem'}  
              marginTop={'.5rem'}
            >
              <Link to="/user/update/email">
                <Button
                sx={{
                  color: '#fff',
                  border: '1px solid #fff',
                  width: '180px',
                  fontSize: '.8rem',
                  transition: '.4s',
                  ":hover": {
                    color: '#000',
                    background: '#fff',
                  }
                }}>Change Email</Button>
              </Link>
              <Link to="/user/update/pass">
                <Button
                sx={{
                  color: '#fff',
                  border: '1px solid #fff',
                  width: '180px',
                  fontSize: '.8rem',
                  transition: '.4s',
                  ":hover": {
                    color: '#000',
                    background: '#fff'
                  }
                }}>Change Password</Button>
              </Link>
              <Link to="/user/recover/request">
                <Button
                sx={{
                  color: '#fff',
                  border: '1px solid #fff',
                  width: '180px',
                  fontSize: '.8rem',
                  transition: '.4s',
                  ":hover": {
                    color: '#000',
                    background: '#fff'
                  }
                }}>Recover Password</Button>
              </Link>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}

export default UserProfile