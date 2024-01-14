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
    const url = ApiUrlBase + `/properties/upload`    
    return axios.post(url, property, config())
}

export const uploadPropertyImage = (propertyId, file) => {
    const url = ApiUrlBase + `/properties/upload/upload-image/${propertyId}`

    return axios.post(url, file, config())
}

export const getAllProperties = () => {
    const url = ApiUrlBase + `/properties/all`
        
    return axios.get(url)
}

export const getPropertyImageUrl = (propertyId) => {
    const url = ApiUrlBase + `/properties/all/${propertyId}/file`

    return url
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