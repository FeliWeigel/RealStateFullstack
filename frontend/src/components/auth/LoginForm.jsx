import React from "react";

import "../../index.css"
import "../css/Auth.css"

import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ApiUrlBase } from "../../utils/ApiUrlBase";
import logo from "../../assets/images/logo.png"

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import {undo2} from 'react-icons-kit/icomoon/undo2'
import Icon from "react-icons-kit";
import Loading from "../loading/Loading";

export default class LoginForm extends React.Component{
    state = {
        user: {
            email: "",
            password: "",
        }, 
        error: false,
        errorMsg: "",
        successMsg: "",
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = async e => {
        await this.setState({
            user: {    
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        })
    }

    handleLogin = () => {
        const url = ApiUrlBase + "/auth/login"
        this.setState({
            loading: true
        })
        axios.post(url, this.state.user)
        .then(res => {
            this.setState({
                loading: false
            })
            if(res.data !== null){    
                this.setState({
                    error: false,
                    errorMsg: "",
                    successMsg: "You have successfully logged in! Start the way to do find your home."
                })
                sessionStorage.setItem("access_token", res.data.access_token)
            }
        })
        .catch(() => {
            this.setState({
                loading: false,
                error: true,
                errorMsg: "Warning! Incorrect credentials, please try again.",
                successMsg: ""
            })
        })
    }

    render(){
        return(
            <Box 
                width={'100%'}
                height={'100vh'}
                display={'flex'}
                position={'relative'}
                sx={{background: 'rgba(0,0,0, 0.94)'}}
            >
                <Link className="auth-home-link" to="/">
                    <Icon size={21} icon={undo2} ></Icon>
                    <Typography typography={'p'}>Go to home</Typography>
                </Link>

                <Box id="register-bg">
                    
                    <img className="auth-logo" src={logo} alt="logo" />
                    <Typography typography={'p'}
                        color={"#fff"}
                        fontFamily={"'lora', serif"}
                        fontSize={'2.6rem'}>Real State</Typography>
                </Box>

                <Box 
                    width={'42%'} 
                    padding={'3.5rem 2rem'}
                    color={'#fff'}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography 
                        typography={'h3'} 
                        fontSize={'1.9rem'} 
                        marginBottom={'1.3rem'}
                        textAlign={'center'}>
                            Log in and start looking for the place of your dreams!
                    </Typography>
                    <Box 
                        component={'form'}
                        onSubmit={this.handleSubmit}
                        width={'95%'}
                        padding={'2.2rem 2.8rem'}
                        display={'flex'}
                        flexDirection={'column'}
                        borderRadius={'5px'}
                        gap={'1rem'}
                        sx={{
                            background: '#fff'
                        }}
                    >
                        
                        <TextField name="email" type="email" label="email" onChange={this.handleChange}></TextField>
                        <TextField name="password" type="password" label="password" onChange={this.handleChange}></TextField>
                        
                        <Link className="to-recover-link" to="/user/recover/request">
                                Forgot your password?
                        </Link>
                        <Button type="submit" onClick={this.handleLogin}
                            sx={{
                                width: '45%',
                                margin: '0 auto',
                                background: 'rgba(0,0,0, .9)',
                                color: '#fff',
                                ":hover": {
                                    background: 'rgba(0,0,0, .8)'
                                }
                            }}>{this.state.loading ? <Loading size={18}/> : "Log in"}</Button>
                        <Link className="to-register-link" to="/auth/register">
                            You still {`don't`} have an account? create one here!
                        </Link>
                    </Box>


                    {
                        this.state.error && this.state.successMsg == "" && this.state.errorMsg.startsWith("Warning!") ? <Alert className="auth-alert auth-alert-login" severity="warning">{this.state.errorMsg}</Alert> 
                        :
                        !this.state.error && this.state.successMsg != "" && this.state.successMsg.startsWith("You have") ? <Navigate to="/"/>
                        :null
                    }
                </Box>
            </Box>
        )
    }
}