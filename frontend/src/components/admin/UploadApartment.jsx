import React from "react"
import "../../index.css"
import "../css/Uploads.css"

import Nav from "../nav/Nav"

import { Box, Button, FormLabel, InputBase, Typography } from "@mui/material"
import { uploadProperty } from "../../services/PropertyService"


export class UploadApartment extends React.Component {

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
        }
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

    handleUpload = () => {
        uploadProperty("apartments", this.state.apartment)  
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
                >
                    <Typography 
                        typography={'h3'} 
                        fontSize={'1.8rem'}
                        marginLeft={'4rem'}
                        marginBottom={'1rem'}
                        color={'#fff'}
                    >Upload your property!</Typography>
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
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}> 
                            <FormLabel htmlFor="description" sx={{color: "#fff"}}>
                                Description
                            </FormLabel>
                            <InputBase 
                                className="upload-input"
                                name="description"
                                type="text"
                                onChange={this.handleChange}
                            ></InputBase>
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
                                ></InputBase>
                            </Box>
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
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <FormLabel htmlFor="surface" sx={{color: "#fff"}}>
                                Surface
                            </FormLabel>
                            <InputBase 
                                className="upload-input"
                                name="surface"
                                type="number"
                                onChange={this.handleChange}
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <FormLabel htmlFor="onSale" sx={{color: "#fff"}}>
                                On Sale?
                            </FormLabel>
                            <InputBase 
                                id="apartment-checkbox"
                                className="upload-input"
                                name="onSale"
                                type="checkbox"
                                onClick={this.handleOnSale}
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <FormLabel htmlFor="location" sx={{color: "#fff"}}>
                                Location
                            </FormLabel>
                            <InputBase 
                                className="upload-input"
                                name="location"
                                type="text"
                            ></InputBase>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'}>
                            <FormLabel htmlFor="images" sx={{color: "#fff"}}>
                                Images
                            </FormLabel>
                            <InputBase
                                className="upload-input"
                                type="file"
                                name="images"
                            ></InputBase>
                        </Box>

                        <Button onClick={this.handleUpload} type="submit">Save</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default UploadApartment