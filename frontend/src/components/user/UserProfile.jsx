import "../../index.css"
import { Box } from "@mui/material"
import Nav from "../nav/Nav"

const UserProfile = () => {
  return (
    <Box 
        height={'auto'}
        minHeight={'100vh'}
        sx={{
            background: 'rgba(0,0,0, .93)'
        }}
    >
        <Nav/>
    </Box>
  )
}

export default UserProfile