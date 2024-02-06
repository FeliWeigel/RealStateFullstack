import React from "react";

import "../../index.css"
import "../css/Auth.css"

import { Link } from "react-router-dom";
import axios from "axios";
import { ApiUrlBase } from "../../utils/ApiUrlBase";
import logo from "../../assets/images/logo.png"

import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import {undo2} from 'react-icons-kit/icomoon/undo2'
import Icon from "react-icons-kit";
import Loading from "../loading/Loading";

export default class RegisterForm extends React.Component{
    state = {
        user: {
            firstname: "",
            lastname: "",
            email: "",
            birthdate: "",
            password: "",
            repeatPassword: ""
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

    handleRegister = () => {
        const url = ApiUrlBase + "/auth/register"
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
                    successMsg: "You have successfully registered! continue logging in."
                })
            }
        })
        .catch(err => {
            this.setState({
                loading: false,
                error: true,
                errorMsg: err.response.data.message,
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
                    padding={'1.7rem 2rem'}
                    color={'#fff'}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Typography 
                        typography={'h3'} 
                        fontSize={'1.9rem'} 
                        marginBottom={'1.3rem'}>
                            Register to find your future home!
                    </Typography>
                    <Box 
                        component={'form'}
                        onSubmit={this.handleSubmit}
                        padding={'2.2rem 3rem'}
                        display={'flex'}
                        flexDirection={'column'}
                        borderRadius={'5px'}
                        gap={'1rem'}
                        sx={{
                            background: '#fff'
                        }}
                    >
                        <Box display={'flex'} gap={'1.5rem'}>
                            <TextField 
                                name="firstname"
                                type="text" 
                                label="firstname"
                                onChange={this.handleChange}
                            ></TextField>
                            <TextField 
                                name="lastname"
                                type="text" 
                                label="lastname"
                                onChange={this.handleChange}
                            ></TextField>
                        </Box>
                        
                        <TextField name="email" type="email" label="email" onChange={this.handleChange}></TextField>
                        <TextField name="birthdate" type="date" onChange={this.handleChange}></TextField>
                        
                        <Box display={'flex'} gap={'1.5rem'}>
                            <TextField name="password" type="password" label="password" onChange={this.handleChange}></TextField>
                            <TextField name="repeatPassword" type="password" label="repeat password" onChange={this.handleChange}></TextField>
                        </Box>
                        <Button type="submit" onClick={this.handleRegister}
                            sx={{
                                width: '45%',
                                margin: '0 auto',
                                background: 'rgba(0,0,0, .9)',
                                color: '#fff',
                                ":hover": {
                                    background: 'rgba(0,0,0, .8)'
                                }
                            }}>{this.state.loading ? <Loading size={18}/> : "Register"}</Button>
                        <Link className="to-login-link" to="/auth/login">
                            Do you already have an account? log in here!
                        </Link>
                    </Box>

                    {
                        this.state.error && this.state.successMsg == "" && this.state.errorMsg.startsWith("Error!") ? <Alert className="auth-alert" severity="error">{this.state.errorMsg}</Alert> 
                        : 
                        this.state.error && this.state.successMsg == "" && this.state.errorMsg.startsWith("Warning!") 
                        || this.state.errorMsg.startsWith("The email") ? <Alert className="auth-alert" severity="warning">{this.state.errorMsg}</Alert>
                        :
                        !this.state.error && this.state.successMsg != "" && this.state.successMsg.startsWith("You have") ? <Alert className="auth-alert" severity="success">{this.state.successMsg}</Alert>
                        :null
                    }
                </Box>
            </Box>
        )
    }
}