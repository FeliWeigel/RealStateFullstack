import { Box } from "@mui/material"

const ErrorPage = () => {
  return (
    <Box
    height={'100vh'}
    width={'100%'}
    color={'#fff'}
    fontSize={'1.5rem'}
    display={'flex'}
    alignItems={'center'}
    justifyContent={'center'}
    sx={{
        background: 'rgba(0,0,0, .85)'
    }}
    >You do not have permissions to access this page. Error 403</Box>
  )
}

export default ErrorPage