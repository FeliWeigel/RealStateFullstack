import { Box } from "@mui/material"
import Home from "../components/home/Home"
import Guide from "../components/home/Guide"
import HomeSelections from "../components/home/HomeSelections"
import Picks from "../components/home/Picks"
import Footer from "../components/footer/Footer"

const HomePage = () => {
  return (
    <Box height={'auto'}>
      <Home/>
      <Guide/>
      <HomeSelections/>
      <Picks/>
      <Footer/>
    </Box>
  )
}

export default HomePage