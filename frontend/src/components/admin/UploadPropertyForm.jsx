import {useState} from "react"
import "../../index.css"
import "../css/Uploads.css"

import Nav from "../nav/Nav"

import {useDropzone} from 'react-dropzone'
import { Box, Button, FormLabel, InputBase, TextareaAutosize, Typography } from "@mui/material"
import { uploadProperty } from "../../services/PropertyService"

const UploadPropertyForm = () => {
    const [apartment, setApartment] = useState({
        name: "",
        description: "",
        bathrooms: 0,
        bedrooms: 0,
        price: 0.0,
        surface: 0,
        onSale: false,
        location: ""
    })
    const [house, setHouse] = useState({
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
    })
    const [houseType, setHouseType] = useState(false)
    const [apartmentType, setApartmentType] = useState(false)
    const [file, setFile] = useState(null)

    const onDrop = (acceptedFiles) => {
        setFile({
            ...file,
            file: acceptedFiles[0]
        })
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleChange = async e => {
        if(apartmentType){
            await setApartment({
                ...apartment,
                [e.target.name]: e.target.value
            })
        }else{
            await setHouse({
                ...house,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleOnSale = () => {
        let checkbox = document.getElementById('apartment-checkbox') 
        let checked = checkbox.checked
        
        if(checked){
            setApartment({
                onSale: true
            })
        }else {
            setApartment({
                onSale: false
            })
        }
    }

    const changeTypeHouse = () => {
        if(!houseType){
            setHouseType(true)
            setApartmentType(false)
        }
    }

    const changeTypeApartment = () => {
        if(!apartmentType){
            setHouseType(false)
            setApartmentType(true)
        }
    }

    const handleUploadApartment = async (e) => {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('file', file)
        formData.append('apartment', JSON.stringify(apartment))
        
        try{      
            await uploadProperty("apartments", formData) 
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                console.log(formData)
            })
        }catch(err){
            console.log(err)
        }
    }

    const handleUploadHouse = (e) => {
        e.preventDefault()

        uploadProperty("houses", house)  
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
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
                    position={'absolute'}
                    left={'4rem'}
                    top={'20%'}
                    display={'flex'}
                    flexDirection={'column'}
                    rowGap={'1rem'}
                >
                    <Button onClick={changeTypeHouse} variant={houseType ? "contained" : "outlined"}>House</Button>
                    <Button onClick={changeTypeApartment} variant={apartmentType ? "contained" : "outlined"}>Apartment</Button>
                </Box>
                <Box 
                    component={'form'}
                    encType="multipart/form-data"
                    onSubmit={houseType ? handleUploadHouse : handleUploadApartment}
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
                    
                    {houseType ? 

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
                                        id="apartment-checkbox"
                                        className="upload-input checkbox-input"
                                        name="hasPool"
                                        type="checkbox"
                                        onClick={handleOnSale}
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
                                onClick={handleOnSale}
                            ></InputBase>
                        </Box>
                    </Box>
                    
                    
                    <Box display={'flex'} flexDirection={'column'} marginBottom={'.5rem'}>
                        <FormLabel htmlFor="file" sx={{color: "#fff"}}>
                            Image
                        </FormLabel>
                        <InputBase
                            id="file"
                            className="upload-input"
                            type="file"
                            name="file"
                            sx={{color: '#fff'}}
                        ></InputBase>
                    </Box>

                    <Box
                        {...getRootProps()}
                        sx={{
                            width: '80%',
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
                        onClick={houseType ? handleUploadHouse : handleUploadApartment} 
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