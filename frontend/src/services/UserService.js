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

export const userOperation = (emailRequest, {propertyId}) => {
    const url = `${ApiUrlBase}/operations/new/${propertyId}`

    return axios.post(url, emailRequest, config())
}