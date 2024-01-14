import {useState, useCallback} from "react"
import "../../index.css"
import "../css/Uploads.css"

import Nav from "../nav/Nav"

import {useDropzone} from 'react-dropzone'
import { Box, Button, FormLabel, InputBase, TextareaAutosize, Typography } from "@mui/material"
import { uploadProperty, uploadPropertyImage } from "../../services/PropertyService"

const UploadPropertyForm = () => {
    const [property, setProperty] = useState({
        name: "",
        description: "",
        location: "",
        bathrooms: 0,
        bedrooms: 0,
        price: 0.0,
        surface: 0,
        floors: 0,
        onSale: false,
        hasPool: false
    })
    const [file, setFile] = useState(null)

    const onDrop = useCallback(acceptedFiles => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0])
        setFile(formData)
    }, [])
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    
    const handleChange = async e => {
        await setProperty({
            ...property,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSale = () => {
        let checkbox = document.getElementById('onsale-checkbox') 
        let checked = checkbox.checked
        
        if(checked){
            setProperty({
                ...property,
                onSale: true
            })
        }else {
            setProperty({
                ...property,
                onSale: false
            })
        }


    }

    const handleHasPool = () => {
        let checkbox = document.getElementById('pool-checkbox')
        let checked = checkbox.checked

        if(checked){
            setProperty({
                ...property,
                hasPool: true
            })
        }else {
            setProperty({
                ...property,
                hasPool: false
            })
        }
    }

    const handleUploadProperty = async (e) => {
        e.preventDefault()
        try{      
            await uploadProperty(property)
            .then(res => {
                console.log(res)
                uploadPropertyImage(res.data.propertyId, file)
                .catch(err => {
                    console.log(err)
                })
            })
        }catch(err){
            console.log(err)
        }
    }

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
                    component={'form'}
                    encType="multipart/form"
                    onSubmit={handleUploadProperty}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                sx={{color: '#fff'}}
                            ></InputBase>
                        </Box>
                    </Box>

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
                                onChange={handleChange}
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
                                id="pool-checkbox"
                                className="upload-input checkbox-input"
                                name="hasPool"
                                type="checkbox"
                                onClick={handleHasPool}
                            ></InputBase>
                        </Box>
                    </Box>

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
                                onChange={handleChange}
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
                                id="onsale-checkbox"
                                className="upload-input checkbox-input"
                                name="onSale"
                                type="checkbox"
                                onClick={handleOnSale}
                            ></InputBase>
                        </Box>
                    </Box>
                    
                    <Typography typography={'p'} color={'#fff'} 
                    fontSize={'1.1rem'} marginBottom={'1rem'}>
                        Image:
                    </Typography>
                    <Box
                        {...getRootProps()}
                        sx={{
                            width: '80%',
                            margin: '0 auto',
                            textAlign: 'center',
                            padding: '1.6rem 2rem',
                            marginBottom: '1rem',
                            fontSize: '1.2rem',
                            border: '2px dashed #fff',
                            color: '#fff',
                            cursor: 'pointer'
                    }}>                  
                            <input {...getInputProps()}/>
                            <Typography typography={'p'} color={'#fff'}>Drag and drop file here, or click to select file.</Typography>
                    </Box>

                    <Button  
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

export default UploadPropertyForm