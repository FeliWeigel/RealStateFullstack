import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import "../../index.css"
import "../css/Nav.css"
import logo from "../../assets/images/logo.png"

import { Box, List, ListItem, Typography } from "@mui/material"
import Icon from "react-icons-kit"
import {logIn} from 'react-icons-kit/ionicons/logIn'
import {user_circle} from 'react-icons-kit/ikons/user_circle'

const Nav = () => {
    const [navBg, setNavBg] = useState(false);
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        if(sessionStorage.getItem("access_token") != null){
            setIsLogged(true)
        }
    },[])

    function handleScroll(){
        if(scrollY > 80){
            setNavBg(true)
        }else{
            setNavBg(false)
        }
    }
    window.addEventListener('scroll', handleScroll)

    return (
        <nav id="nav" onScroll={handleScroll} className={navBg ? "nav-bg" : "nav-menu"}>
            <Link to="/">
                <Box sx={{
                    textAlign: 'center',
                    color: '#fff'
                }}>
                    <img className="nav-logo" src={logo} alt="logo" />
                    
                </Box>
            </Link>
            <List sx={{
                display: 'flex',
                width: '35%',
                color: 'rgba(255,255,255, 0.5)'
            }}>
                <Link className="nav-link" to="/">
                    <ListItem sx={{
                        cursor: 'pointer',
                        transition: '.4s',
                        ":hover": {
                            color: '#fff',
                            transform: 'translateY(-.2rem)'
                        }
                    }}>Home</ListItem>
                </Link>
                <Link className="nav-link" to="/properties/all">
                    <ListItem sx={{
                        cursor: 'pointer',
                        transition: '.4s',
                        ":hover": {
                            color: '#fff',
                            transform: 'translateY(-.2rem)'
                        }
                    }}>Properties</ListItem>
                </Link>
                <Link className="nav-link" to="/properties/all">
                    <ListItem sx={{
                        cursor: 'pointer',
                        transition: '.4s',
                        ":hover": {
                            color: '#fff',
                            transform: 'translateY(-.2rem)'
                        }
                    }}>About Us</ListItem>
                </Link>
                
                <Link className="nav-link" to="/contact_form">
                    <ListItem sx={{
                        cursor: 'pointer',
                        transition: '.4s',
                        ":hover": {
                            color: '#fff',
                            transform: 'translateY(-.2rem)'
                        }
                    }}>Contact</ListItem>
                </Link>
            </List>
            {
                !isLogged ? 
                <Link className="login-link" to='/auth/login'>
                Log in <Icon icon={logIn} size={20}></Icon>
                </Link> 
                :
                <Link to="/user/profile">
                    <Box 
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        sx={{
                            cursor: 'pointer'
                        }}
                    >
                        <Icon className="account-icon" icon={user_circle} size={17}></Icon>
                        <Typography 
                            typography={'p'} 
                            fontSize={'.9rem'}
                            fontWeight={'400'}
                            fontFamily={'Raleway, serif'}
                            color={'#fff'}
                        >Your account</Typography>
                    </Box> 
                </Link>
            }
        </nav>
    )
}

export default Nav