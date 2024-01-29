import axios from "axios"
import { ApiUrlBase } from "../utils/ApiUrlBase"

export const config = () => {
    let token = sessionStorage.getItem("access_token")
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const uploadProperty = (property) => {
    const url = `${ApiUrlBase}/properties/upload`    
    return axios.post(url, property, config())
}

export const uploadPropertyImage = (propertyId, file) => {
    const url = `${ApiUrlBase}/properties/upload/upload-image/${propertyId}`

    return axios.post(url, file, config())
}

export const getAllProperties = () => {
    const url = `${ApiUrlBase}/properties/all`
        
    return axios.get(url)
}

export const getPropertyImageUrl = (propertyId) => {
    const url = `${ApiUrlBase}/properties/all/${propertyId}/file`

    return url
}

export const getAllPropertyImages = ({propertyId}) => {
    const url = `${ApiUrlBase}/properties/all/${propertyId}/all-files`

    return axios.get(url)
}

export const getPropertyDetails = ({propertyId}) => {
    const url = `${ApiUrlBase}/properties/details/${propertyId}`

    return axios.get(url)
}

export const deleteProperty = (propertyId) => {
    const url = ApiUrlBase + `/properties/delete/${propertyId}`
        
    axios.delete(url, config())
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export const addFollowToProperty = (propertyId) => {
    const url = ApiUrlBase + `/properties/favorites/add/${propertyId}`
    return axios.post(url, {}, config())
}

export const allFollowedProperties = () => {
    const url = ApiUrlBase + `/properties/favorites/all`
    return axios.get(url, config())
}