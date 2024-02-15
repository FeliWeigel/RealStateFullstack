import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import UploadPropertyPage from "../pages/UpPropertyPage"
import PropertiesPage from "../pages/PropertiesPage"
import PropertyDetailsPage from "../pages/PropertyDetailsPage"
import UserProfilePage from "../pages/UserProfilePage"
import UpdatePasswordForm from "../components/user/UpdatePasswordForm"
import RecoverRequestForm from "../components/user/RecoverRequestForm"
import RecoverPasswordForm from "../components/user/RecoverPasswordForm"
import OperationPage from "../pages/OperationPage"
import UpdateEmailForm from "../components/user/UpdateEmailForm"

const RouterService = () => {
  return (
    <Routes>
        <Route exact path="/" element={<HomePage/>}></Route>
        <Route exact path="/auth/register" element={<RegisterPage/>}></Route>
        <Route exact path="/auth/login" element={<LoginPage/>}></Route>
        <Route exact path="/properties/upload" element={<UploadPropertyPage/>}></Route>
        <Route exact path="/properties/all" element={<PropertiesPage/>}></Route>
        <Route exact path="/properties/details/:propertyId" element={<PropertyDetailsPage/>}></Route>
        <Route exact path="/properties/details/contact/:propertyId" element={<OperationPage/>}></Route>
        <Route exact path="/user/profile" element={<UserProfilePage/>}></Route>
        <Route exact path="/user/update/pass" element={<UpdatePasswordForm/>}></Route>
        <Route exact path="/user/update/email" element={<UpdateEmailForm/>}></Route>
        <Route exact path="/user/recover/request" element={<RecoverRequestForm/>}></Route>
        <Route exact path="/user/recover/recover_pass/:token" element={<RecoverPasswordForm/>}></Route>
    </Routes>
  )
}

export default RouterService