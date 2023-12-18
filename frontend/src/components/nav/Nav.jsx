import { Box, List, ListItem } from "@mui/material"
import "../../index.css"
import "../css/Nav.css"
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom"
import Icon from "react-icons-kit"
import {logIn} from 'react-icons-kit/ionicons/logIn'
import { useState } from "react"
const Nav = () => {
    const [navBg, setNavBg] = useState(false);

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
            <Link className="login-link" to='/auth/login'>
                Log in <Icon icon={logIn} size={20}></Icon>
            </Link>
        </nav>
    )
}

export default Nav