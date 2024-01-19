import { Alert, Box, Typography } from "@mui/material"
import "../../index.css"
import "../css/Properties.css"
import { useState } from "react"
import { userOperation } from "../../services/UserService"
import { useParams } from "react-router-dom"

const PropertyOperation = () => {
  const [emailRequest, setEmailRequest] = useState({
    to: "",
    description: null
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const propertyId = useParams("propertyId")

  const handleSubmit = (e) => {
    e.preventDefault()
    userOperation(emailRequest, propertyId)
    .then(res => {
      setSuccess(true)
      setError(false)
      setSuccessMessage(res.data)
    })
    .catch(err => {
      setSuccess(false)
      setError(true)
      setSuccessMessage(null)
      console.log(err)
    })
  }

  const handleChange = (e) => {
    setEmailRequest({
      ...emailRequest,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Box
        id="property-op-bg"
        height={'auto'}
        minHeight={'95vh'}
        padding={'1.7rem 2.5rem'}
    >
      <Typography 
        typography={'h3'}
        color={'#fff'}
        fontWeight={'600'}
        fontSize={'2.3rem'}
        fontFamily={'Raleway, serif'}
        position={"relative"}
        marginBottom={'1.5rem'}
        sx={{
          ":before": {
            content: "''",
            position: 'absolute',
            width: '60px',
            height: '2px',
            background: '#fff',
            bottom: '-.08rem',
            left: '.05rem'
          }
        }}
      >
        Contact a seller!
      </Typography>

      <Box 
        component={'form'}
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: 'rgba(0,0,0, .93)',
          padding: '2.5rem 2rem 1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          rowGap: '.7rem',
          width: '40%',
          margin: '0 auto'
        }}
      >

        <input 
          onChange={handleChange}
          className="operation-input operation-to"
          type="text" 
          name="to" 
          placeholder="Your email"
        >
          </input>
        <textarea 
          onChange={handleChange}
          className="operation-input operation-text"
          name="description" 
          placeholder="Can you leave a comment here.."
          ></textarea>

        <button type="submit" className="operation-button">Send</button>
        
        {
          success && !error && successMessage != null ? 
          <Alert className="operation-alert" severity="success">{successMessage}</Alert>
          : !success && error && successMessage === null ?
          <Alert className="operation-alert" severity="error">Check if email is correct and try again.</Alert>
          : null
        }
      </Box>
    </Box>
  )
}

export default PropertyOperation