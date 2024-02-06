import { Link, Navigate, useParams } from "react-router-dom"
import "../../index.css"
import "../css/Forms.css"
import "../css/Properties.css"

import { Alert, Box } from "@mui/material"
import { useState } from "react"
import { userRecoverPassword } from "../../services/UserService"
import Loading from "../loading/Loading"

const RecoverPasswordForm = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [updateRequest, setUpdateRequest] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    }) 
    let {token} = useParams('token')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        userRecoverPassword(updateRequest, token)
        .then(() => {
            setLoading(false)
            setSuccess(true)
            setError(false)
            setErrorMessage(null)
            console.log(token)
        })
        .catch(err => {
            setLoading(false)
            setSuccess(false)
            setError(true)
            setErrorMessage(err.response.data.message)
        })
    }

    const handleChange = (e) => {
        setUpdateRequest({
            ...updateRequest,
            [e.target.name]: e.target.value
        })
    }

    return(
        <Box
            id="up-pass-bg"
            className="forms-bg"
            height={'100vh'}
            padding={'1.7rem 2.5rem'}
            display={'flex'}
            alignItems={'center'}
            position={'relative'}
        >
            <Link className="forms-back" to="/user/profile">
                Back
            </Link>

            <Box 
                component={'form'}
                onSubmit={handleSubmit}
                sx={{
                backgroundColor: 'rgba(0,0,0, .93)',
                padding: '2.5rem 2rem 1.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                rowGap: '.7rem',
                width: '40%',
                margin: '0 auto',
                position: 'relative'
                }}
            >

                <input 
                onChange={handleChange}
                className="form-input"
                type="password" 
                name="newPassword" 
                placeholder="New password"
                >
                </input>
                <input 
                onChange={handleChange}
                className="form-input"
                type="password" 
                name="confirmNewPassword" 
                placeholder="Confirm new password"
                >
                </input>

                <button type="submit" className="form-button">{loading ? <Loading size={18}/> : "Send"}</button>
                
                {
                success && !error && errorMessage === null ? 
                <Navigate to="/auth/login"/>
                : !success && error && errorMessage !== null ?
                <Alert className="form-alert" severity="error">{errorMessage}</Alert>
                : null
                }
            </Box>
        </Box>
    )

}

export default RecoverPasswordForm