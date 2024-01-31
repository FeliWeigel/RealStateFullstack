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
        minHeight={'105vh'}
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
            height={'105vh'}
            width={'100%'}
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              rowGap={'.5rem'}
              color={'#fff'}
              width={'45%'}
              padding={'5rem 1.5rem 0rem 2rem'}
              sx={{
                background: 'rgba(0,0,0, .93)'
              }}
            >
              <Typography 
                typography={'h4'}
                position={'relative'}
                marginBottom={'1.5rem'}
                fontSize={'2rem'}
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
                    width: '175px',
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
                    width: '175px',
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
                    width: '175px',
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
                    width: '175px',
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
              rowGap={'1rem'}
              padding={'5rem 2rem 2rem 2rem'}
              sx={{
                background: 'rgba(0,0,0, .75)',
                width: '100%',

              }}
            >
              <Typography
                typography={'h4'}
                position={'relative'}
                marginBottom={'1.2rem'}
                color={'#fff'}
                fontSize={'2rem'}
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
              >Your favorite properties</Typography>
              {
                followedProperties.length != 0 ? 
                followedProperties.map(property => {
                  return (
                    <Card key={property.propertyId} 
                      sx={{
                        display: 'flex',
                        width: '90%',
                        alignItems:'center',                        height: '100px',
                        background: 'transparent',
                        boxShadow: '0px 0px 5px 0px rgba(255,255,255, .3)',
                        position: 'relative'
                      }}
                    >
                      <img className="fav-img" src={getPropertyImageUrl(property.propertyId)}/>
                      <Box
                        padding={'1rem'}
                      >
                        <Typography color={'#fff'} typography={'h5'}>
                            {property.name}
                        </Typography>
                        <Typography color={'rgba(255,255,255, .65)'} typography={'h6'}>
                            {property.location}
                        </Typography>
                        <Typography color={'#fff'} typography={'h5'} fontSize={'1.1rem'}>
                            ${property.price}
                        </Typography>
                      </Box>
                      <Link to={`/properties/details/${property.propertyId}`}>
                        <Button 
                          sx={{
                            background: '#fff',
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            borderRadius: '0',
                            color: 'rgba(0,0,0, .9)',
                            fontSize: '.7rem',
                            ":hover": {
                              background: 'rgba(140,140,140)'
                            }
                          }}
                        >Explore</Button>
                      </Link>
                    </Card>
                  )
                })
                : <Typography 
                    typography={'p'} 
                    color={'rgba(255,255,255, .7)'}
                    fontSize={'1.5rem'}
                    textAlign={'center'}
                    marginTop={'1rem'}
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