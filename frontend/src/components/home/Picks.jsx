import "../../index.css"
import "../css/HomeSelections.css"

import { Box, Typography } from "@mui/material"

import Icon from "react-icons-kit"
import {alarm} from 'react-icons-kit/icomoon/alarm'
import {shield} from 'react-icons-kit/entypo/shield'
import {card} from 'react-icons-kit/ionicons/card'
import {androidPin} from 'react-icons-kit/ionicons/androidPin'
import {chat} from 'react-icons-kit/entypo/chat'
import {history} from 'react-icons-kit/fa/history'
import {sliders} from 'react-icons-kit/fa/sliders'
import {credit} from 'react-icons-kit/entypo/credit'

const Picks = () => {
  return (
    <Box height={'70vh'} sx={{
      background: 'rgba(0,0,0, 0.94)',
      padding: '1rem 2rem'
    }}>
      <Typography 
        typography={'h3'} 
        fontSize={'1.95rem'}
        color={'#fff'}
        marginBottom={'3rem'}
      >
        We adapt to your preferences
      </Typography>
      <Box 
        display={'flex'} 
        gap={'2.5rem'}
        width={'80%'}
        margin={'0 auto'}
        flexWrap={'wrap'}
        justifyContent={'center'}
      >
        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={alarm} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            >
              Flexible terms
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}>
            <Icon className="picks-logo" icon={shield} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            >
              Secure contractual process
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}>
            <Icon className="picks-logo" icon={card} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            >
                All payment methods
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={androidPin} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            > 
              Locations around the world
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={chat} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            > 
              Assistance 24/7
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={history} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            > 
              Rent warranty
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={credit} size={37}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            > 
             Payment plans
            </Typography>
        </Box>

        <Box 
          display={'flex'} 
          flexDirection={'column'} 
          alignItems={'center'}
          width={'20%'}
        >
            <Icon className="picks-logo" icon={sliders} size={35}></Icon>
            <Typography 
              typography={'p'} fontSize={'1.2rem'} 
              color={'#fff'} textAlign={'center'}
              lineHeight={'24px'}
            > 
              Customizable processes
            </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Picks