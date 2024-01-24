import { Link } from "react-router-dom"
import "../../index.css"
import { userRecoverPassRequest } from "../../services/UserService"
import "../css/Forms.css"
import "../css/Properties.css"

import { Alert, Box, Typography } from "@mui/material"
import { useState } from "react"

const RecoverRequestForm = () => {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(true)
    const [successMessage, setSuccessMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        userRecoverPassRequest(email)
        .then(res => {
          setSuccess(true)
          setError(false)
          setSuccessMessage(res.data)
          setErrorMessage(null)
        })
        .catch(err => {
          setSuccess(false)
          setError(true)
          setSuccessMessage(null)
          setErrorMessage(err.response.data.message)
        })
      }

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    return(
        <Box
            id="up-pass-bg"
            className="forms-bg"
            height={'100vh'}
            padding={'1.7rem 2.5rem'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            position={'relative'}
        >
            <Link className="forms-back" to="/user/profile">
                Back
            </Link>
            <Box height={'50vh'}>
                <Typography 
                    typography={'h4'}
                    color={"#fff"}
                    fontSize={'2rem'}
                    justifyContent={'flex-start'}
                    marginLeft={'3rem'}
                    marginBottom={'1rem'}
                    textAlign={'center'}
                >Password recovery request</Typography>
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
                    type="email" 
                    name="email" 
                    placeholder="Insert your email"
                    >
                    </input>

                    <button type="submit" className="form-button">Send</button>
                    
                    {
                    success && !error && successMessage !== null && errorMessage === null ? 
                    <Alert className="form-alert" severity="success">{successMessage}</Alert>
                    : !success && error && successMessage === null && errorMessage !== null ?
                    <Alert className="form-alert" severity="error">{errorMessage}</Alert>
                    : null
                    }
                </Box>
            </Box>
        </Box>
    )

}

export default RecoverRequestForm