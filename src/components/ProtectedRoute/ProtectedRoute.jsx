import { useContext } from "react"
import { userContext } from "../../context/UserContext"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {

const {token} = useContext(userContext)


if(!token) return <Navigate  to='/auth'/>



  return <>
  
  {children}
  
  </>
}

export default ProtectedRoute
