import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import UploadPropertyPage from "../pages/UpPropertyPage"
import PropertiesPage from "../pages/PropertiesPage"
import PropertyDetailsPage from "../pages/PropertyDetailsPage"
import UserProfilePage from "../pages/UserProfilePage"

const RouterService = () => {
  return (
    <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route exact path="/auth/register" element={<RegisterPage/>}></Route>
        <Route exact path="/auth/login" element={<LoginPage/>}></Route>
        <Route exact path="/properties/upload" element={<UploadPropertyPage/>}></Route>
        <Route exact path="/properties/all" element={<PropertiesPage/>}></Route>
        <Route exact path="/properties/details/:propertyId" element={<PropertyDetailsPage/>}></Route>
        <Route exact path="/user/profile" element={<UserProfilePage/>}></Route>
    </Routes>
  )
}

export default RouterService