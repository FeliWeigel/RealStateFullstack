import { useEffect, useState } from "react"
import UploadPropertyForm  from "../components/admin/UploadPropertyForm"
import Footer from "../components/footer/Footer"
import { userDetails } from "../services/UserService"

const UploadPropertyPage = () => {
  const [admin, setAdmin] = useState(null)
  useEffect(() => {
    userDetails()
  .then(res => {
    setAdmin(res.data)
  })
  }, [])
  return (
    <>
        <UploadPropertyForm userDetails={admin}/>
        <Footer/>
    </>
  )
}

export default UploadPropertyPage