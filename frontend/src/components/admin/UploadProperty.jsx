import React from "react"
import "../../index.css"
import "../css/Uploads.css"

import Nav from "../nav/Nav"

import { Box, Button, FormLabel, InputBase, TextareaAutosize, Typography } from "@mui/material"
import { uploadProperty } from "../../services/PropertyService"


export class UploadProperty extends React.Component {

    state = {
        apartment: {
            name: "",
            description: "",
            bathrooms: 0,
            bedrooms: 0,
            price: 0.0,
            surface: 0,
            onSale: false,
            location: ""
        },
        house: {
            name: "",
            description: "",
            bathrooms: 0,
            bedrooms: 0,
            price: 0.0,
            surface: 0,
            floors: 0,
            onSale: false,
            hasPool: false,
            location: "" 
        },
        houseType: true,
        apartmentType: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    handleChange = async e => {
        await this.setState({
            apartment: {    
                ...this.state.apartment,
                [e.target.name]: e.target.value
            }
        })
    }

    handleOnSale = () => {
        let checkbox = document.getElementById('apartment-checkbox') 
        let checked = checkbox.checked
        
        if(checked){
            this.setState({
                apartment: {
                    ...this.state.apartment,
                    onSale: true
                }
            })
        }else {
            this.setState({
                apartment: {
                    ...this.state.apartment,
                    onSale: false
                }
            })
        }
    }

    changeTypeHouse = () => {
        if(!this.state.houseType){
            this.setState({
                houseType: true,
                apartmentType: false
            })
        }
    }

    changeTypeApartment = () => {
        if(!this.state.apartmentType){
            this.setState({
                apartmentType: true,
                houseType: false
            })
        }
    }

    handleUploadApartment = () => {
        uploadProperty("apartments", this.state.apartment)  
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleUploadHouse = () => {
        uploadProperty("houses", this.state.house)  
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    render(){
        return (
            <Box 
            height={'160vh'}
            sx={{
                background: 'rgba(0,0,0, 0.93)'
            }}>
                <Nav/>
                <Box 
                    height={'90%'}
                    paddingTop={'5rem'}
                    position={'relative'}
                >
                    <Typography 
                        typography={'h3'} 
                        fontSize={'1.8rem'}
                        marginLeft={'4rem'}
                        marginBottom={'1rem'}
                        color={'#fff'}
                        position={'relative'}
                        sx={{
                            ":before":{
                                content: "''",
                                position: 'absolute',
                                width: '60px',
                                height: '1px',
                                background: 'rgba(255,255,255, .7)',
                                bottom: '-.3rem'
                            }
                        }}
                    >Upload property</Typography>
                    <Box 
                        position={'absolute'}
                        left={'4rem'}
                        top={'20%'}
                        display={'flex'}
                        flexDirection={'column'}
                        rowGap={'1rem'}
                    >
                        <Button onClick={this.changeTypeHouse} variant={this.state.houseType ? "contained" : "outlined"}>House</Button>
                        <Button onClick={this.changeTypeApartment} variant={this.state.apartmentType ? "contained" : "outlined"}>Apartment</Button>
                    </Box>
                    <Box 
                        component={'form'}
                        onSubmit={this.handleSubmit}
                        width={'38%'}
                        margin={'0 auto'}
                        padding={'2rem 3rem'}
                        sx={{
                            border: '1px solid rgba(255,255,255, .4)',
                            boxShadow: '0px 0px 5px 0px rgba(255,255,255, .2)'
                        }}
                    >
                        <Box display={'flex'} flexDirection={'column'}>
                            <FormLabel htmlFor="name" sx={{color: "#fff"}}>
                                Name
                            </FormLabel>
                            <InputBase
                                className="upload-input"
                                name="name"
                                type="text"
                                onChange={this.handleChange}
                                sx={{color: '#fff'}}
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}> 
                            <FormLabel htmlFor="description" sx={{color: "#fff"}}>
                                Description
                            </FormLabel>
                            <TextareaAutosize 
                                className="upload-input description-input"
                                name="description"
                                type="text"
                                onChange={this.handleChange}
                                sx={{color: '#000'}}
                            ></TextareaAutosize>
                        </Box>
        
                        <Box display={'flex'} columnGap={'1.2rem'}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <FormLabel htmlFor="bathrooms" sx={{color: "#fff"}}>
                                    Bathrooms
                                </FormLabel>
                                <InputBase 
                                    className="upload-input"
                                    name="bathrooms"
                                    type="number"
                                    onChange={this.handleChange}
                                    sx={{color: '#fff'}}
                                ></InputBase>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>  
                                <FormLabel htmlFor="bedrooms" sx={{color: "#fff"}}>
                                    Bedrooms
                                </FormLabel>
                                <InputBase
                                    className="upload-input"
                                    name="bedrooms"
                                    type="number"
                                    onChange={this.handleChange}
                                    sx={{color: '#fff'}}
                                ></InputBase>
                            </Box>
                        </Box>

                        <Box display={'flex'} columnGap={'1.2rem'}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <FormLabel htmlFor="surface" sx={{
                                    color: "#fff"
                                }}>
                                    Surface
                                </FormLabel>
                                <InputBase 
                                    className="upload-input"
                                    name="surface"
                                    type="number"
                                    onChange={this.handleChange}
                                    sx={{color: '#fff'}}
                                ></InputBase>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>    
                                <FormLabel htmlFor="price" sx={{color: "#fff"}}>
                                    Price
                                </FormLabel>
                                <InputBase 
                                    className="upload-input"
                                    name="price"
                                    type="number"
                                    onChange={this.handleChange}
                                    sx={{color: '#fff'}}
                                ></InputBase>
                            </Box>
                        </Box>
                        
                        {this.state.houseType ? 

                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Box display={'flex'} flexDirection={'column'}>
                                        <FormLabel htmlFor="floors" sx={{
                                            color: "#fff",
                                            width: '290px'
                                        }}>
                                            Floors
                                        </FormLabel>
                                        <InputBase 
                                            className="upload-input"
                                            name="floors"
                                            type="number"
                                            onChange={this.handleChange}
                                            sx={{color: '#fff'}}
                                        ></InputBase>
                                    </Box>
                                    <Box display={'flex'} flexDirection={'column'}>
                                        <FormLabel htmlFor="hasPool" 
                                        sx={{
                                            color: "#fff"
                                        }}>
                                            Has Pool?
                                        </FormLabel>
                                        <InputBase 
                                            id="apartment-checkbox"
                                            className="upload-input checkbox-input"
                                            name="hasPool"
                                            type="checkbox"
                                            onClick={this.handleOnSale}
                                        ></InputBase>
                                    </Box>
                                </Box>
                            
                            : null
                        }
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <FormLabel htmlFor="location" 
                                sx={{
                                    color: "#fff",
                                    width: '300px'
                                }}>
                                    Location
                                </FormLabel>
                                <InputBase 
                                    className="upload-input"
                                    name="location"
                                    type="text"
                                    sx={{color: '#fff'}}
                                ></InputBase>
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <FormLabel htmlFor="onSale" 
                                sx={{
                                    color: "#fff"
                                }}>
                                    On Sale?
                                </FormLabel>
                                <InputBase 
                                    id="apartment-checkbox"
                                    className="upload-input checkbox-input"
                                    name="onSale"
                                    type="checkbox"
                                    onClick={this.handleOnSale}
                                ></InputBase>
                            </Box>
                        </Box>
                        
                        
                        <Box display={'flex'} flexDirection={'column'} marginBottom={'.5rem'}>
                            <FormLabel htmlFor="images" sx={{color: "#fff"}}>
                                Images
                            </FormLabel>
                            <InputBase
                                className="upload-input"
                                type="file"
                                name="images"
                                sx={{color: '#fff'}}
                            ></InputBase>
                        </Box>

                        <Button 
                            onClick={this.state.houseType ? this.handleUploadHouse : this.handleUploadApartment} 
                            variant="outlined" 
                            type="submit"
                            sx={{
                                color: '#fff',
                                display: 'block',
                                padding: '7px 30px',
                                margin: '0 auto'
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default UploadProperty