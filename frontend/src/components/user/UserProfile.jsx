import { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import "../../index.css"
import "../css/User.css"

import Nav from "../nav/Nav"
import Loading from "../loading/Loading"
import FollowedPropsPopUp from "../properties/FollowedPropsPopUp"
import { userDetails, userLogout } from "../../services/UserService"
import { allFollowedProperties, getPropertyImageUrl } from "../../services/PropertyService"

import { Box, Button, Card, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {plus} from 'react-icons-kit/icomoon/plus'
import {undo2} from 'react-icons-kit/icomoon/undo2'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [followedProperties, setFollowedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewPopUp, setViewPopUp] = useState(false)

  const count = followedProperties.length - 3
  let followedPropertiesArr = new Array()
  followedPropertiesArr.push(followedProperties[0])
  followedPropertiesArr.push(followedProperties[1])
  followedPropertiesArr.push(followedProperties[2])

  useEffect(() => {
    setLoading(true)
    userDetails()
    .then(res => {
      setLoading(false)
      setUser(res.data)
      allFollowedProperties()
      .then(res => setFollowedProperties(res.data))
      .catch(err => console.log(err))
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  },[])

  return (

  <Box>
    {
      viewPopUp ? 
      <Box height={'auto'} minHeight={'100vh'} width={'100%'} sx={{
        background: 'rgba(0,0,0)',
        position: "absolute",
        padding: '1.2rem 2rem 3rem 2rem',
        zIndex: '10000',
        display: 'flex',
        justifyContent: 'center'
      }}>
          <Button
          onClick={() => setViewPopUp(false)}
          sx={{
              position: 'absolute',
              top: '1rem',
              left: '.8rem',
              fontSize: '1.3rem',
              color: '#fff',
              display:'flex',
              alignItems:'center',
              gap: '.5rem'
          }}
          >
            <Icon icon={undo2} size={22}></Icon>
            Back
        </Button>
        <FollowedPropsPopUp properties={followedProperties}/>
      </Box> 
      : 

      <Box 
        height={'auto'}
        minHeight={'105vh'}
        display={'flex'}
        position={'relative'}
        alignItems={'center'}
        sx={{
            background: 'rgba(0,0,0, .93)'
        }}
      >
        <Nav/>
        {user && !loading ? 
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
              position={'relative'}
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
                followedPropertiesArr.length != 0 && followedProperties.length != 0  ? 
                followedPropertiesArr.map((property) => {
                  return (
                    <>
                      {property != undefined ? 
                        <Card key={property.propertyId} 
                        sx={{
                          display: 'flex',
                          width: '90%',
                          alignItems:'center',                        
                          height: '100px',
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
                      : null}
                    </>
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
            {followedProperties.length > 3 ? 
              <button
                className="more-follow-btn"
                onClick={() => setViewPopUp(true)}
              >
                <Icon className="more-follow-icon" icon={plus} size={18}>
                  
                </Icon>
                <Typography typography={'p'} sx={{
                    fontSize: '.7rem',
                    color: '#fff',
                    fontWeight: '600',
                    background: 'rgba(255,0,0)',
                    position: 'absolute',
                    width: '15px',
                    borderRadius: '50%',
                    top: '-.6rem',
                    right: '-.4rem'
                  }}>{count}</Typography>
              </button> 
              :
              null
            }
          </Box> 
          : 
            <Box 
              display={'flex'} 
              height={'60vh'} 
              width={'100%'} 
              color={'#fff'} 
              justifyContent={'center'} 
              alignItems={'center'}
            >
              <Loading size={25}/>
            </Box>
          }
        </Box>
        }
    </Box>
  )
}

export default UserProfile