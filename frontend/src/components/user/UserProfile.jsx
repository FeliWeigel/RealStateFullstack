import { useEffect, useState } from "react"

import "../../index.css"
import "../css/User.css"

import Nav from "../nav/Nav"
import { userDetails, userLogout } from "../../services/UserService"


import { Box, Button, Card, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { allFollowedProperties, getPropertyImageUrl } from "../../services/PropertyService"

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [followedProperties, setFollowedProperties] = useState([])
  useEffect(() => {
    userDetails()
    .then(res => {
      setUser(res.data)
      allFollowedProperties()
      .then(res => setFollowedProperties(res.data))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  },[])

  return (
    <Box 
        height={'auto'}
        minHeight={'110vh'}
        display={'flex'}
        alignItems={'center'}
        sx={{
            background: 'rgba(0,0,0, .93)'
        }}
    >
        <Nav/>
        {user ? 
          <Box 
            display={'flex'}
            gap={'5rem'}
            height={'80vh'} 
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
                Firstname: <span>{user.firstname}</span>
              </Typography>
              <Typography 
                typography={'p'}
                fontSize={'1.3rem'}
                fontFamily={'Raleway, serif'}
                fontWeight={'500'}
              >
                Lastname: <span>{user.lastname}</span>
              </Typography>
              <Typography 
                typography={'p'}
                fontSize={'1.3rem'}
                fontFamily={'Raleway, serif'}
                fontWeight={'500'}
              >
                Email: <span>{user.email}</span>
              </Typography>
              <Typography 
                typography={'p'}
                fontSize={'1.3rem'}
                fontFamily={'Raleway, serif'}
                fontWeight={'500'}
              >
                Birthdate: <span>{new Date(user.birthdate).toLocaleDateString()}</span>
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
                <Button
                  onClick={() => userLogout()}
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
                  }}>Log out</Button>
              </Box>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              rowGap={'.5rem'}
            >
              <Typography typography={'h4'} color={'#fff'}>Your favorite properties</Typography>
              {
                followedProperties.length != 0 ? 
                followedProperties.map(property => {
                  return (
                    <Card key={property.propertyId} 
                      sx={{
                        display: 'flex',
                        width: '50%',
                        height: '250px',
                      }}
                    >
                      <img className="fav-img" src={getPropertyImageUrl(property.propertyId)}/>
                      <Box
                        padding={'1rem'}
                      >
                        <Typography typography={'h5'}>
                            {property.name}
                        </Typography>
                        <Typography typography={'h6'}>
                            {property.location}
                        </Typography>
                        <Typography typography={'h5'}>
                            {property.price}
                        </Typography>
                      </Box>
                    </Card>
                  )
                })
                : <Typography 
                    typography={'p'} 
                    color={'rgba(255,255,255, .7)'}
                    fontSize={'1.5rem'}
                    textAlign={'center'}
                    >Your favorite list is empty.</Typography>
              }
            </Box>
          </Box> 
          : null
        }
    </Box>
  )
}

export default UserProfile