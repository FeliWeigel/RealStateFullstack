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

export const userDetails = () => {
    const url = `${ApiUrlBase}/user/user_details`

   return axios.get(url, config())
}

export const userOperation = (emailRequest, {propertyId}) => {
    const url = `${ApiUrlBase}/operations/new/${propertyId}`

    return axios.post(url, emailRequest, config())
}

export const userUpdatePassword = (updateRequest) => {
    const url = `${ApiUrlBase}/user/update/pass`
    return axios.post(url, updateRequest, config())
}

export const userRecoverPassRequest = (email) => {
    const url = `${ApiUrlBase}/user/update/request?email=${email}`
    return axios.post(url)
}

export const userRecoverPassword = (recoverRequest, token) => {
    const url = `${ApiUrlBase}/user/update/recover_pass?token=${token}`
    return axios.post(url, recoverRequest)
}