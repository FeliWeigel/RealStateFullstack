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

export const uploadProperty = (request ,property) => {
    const url = ApiUrlBase + `/${request}/upload`

    return axios.post(url, property, config())
}

export const getAllProperties = (request) => {
    const url = ApiUrlBase + `/${request}/all`
        
    axios.get(url, config())
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteProperty = (request, propertyId) => {
    const url = ApiUrlBase + `/${request}/delete/${propertyId}`
        
    axios.delete(url, config())
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}