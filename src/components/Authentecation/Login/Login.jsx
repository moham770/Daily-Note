import { Link, useNavigate } from "react-router-dom"
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { userContext } from "../../../context/UserContext";
import { motion } from "framer-motion"


const Login = () => {
    const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {setToken} = useContext(userContext)



    const initialValues={
        email:"",
        password:"",
    }




   async function handelSubmit(values){
          setLoading(true)
        try {
           const {data} =  await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values)
             toast.success('Welcome :)')
             setLoading(false)
             setTimeout(()=>{navigate('/')},2000)
             setToken(data.token)
            localStorage.setItem('token',data.token)
     
            
        } catch (error) {
            console.log('error Login',error)
            setError(error.response.data.msg)
            setLoading(false)
        }
        

    }

    const validationSchema = yup.object({
        email:yup.string().email('please Enter A Valid Email').required('Email Is  Required..'),
        password:yup.string().matches(passwordRegex,"Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.").required('Password Is Required..'),
    }) 




const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handelSubmit
})




  return <section className=" py-8">
    <h2 className="mx-auto text-[30px] text-titleAuth  w-fit font-semibold">Login</h2>
    <form onSubmit={formik.handleSubmit} >
    

    {error ? <h3 style={{textTransform:'capitalize'}} className="text-red-600  tracking-[1px] font-bold text-[18px]">{error}</h3> :null} 
  
            <div className="mb-3">
                 <label   htmlFor="email">email</label>
                 <input  id="email"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email"  placeholder='Enter Your email...' name='email'  className="w-full inputHandel"  />
                {formik.errors.email &&formik.touched.email ? <p className="text-red-500 ms-1">{formik.errors.email}</p>:null}
            </div>


            <div className="mb-3">
               <label   htmlFor="password">password</label>
               <input  id="password"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password"  placeholder='Enter Your password...' name='password'  className="w-full inputHandel"  />
                {formik.errors.password &&formik.touched.password ? <p className="text-red-500 ms-1">{formik.errors.password}</p>:null}
            </div>

   

  





   <div className="flex gap-4 items-center  mt-3">

    <button  type="submit" className="handelButonForm px-3 bg-footerNote"> 
    {loading &&    <i className="fa-solid fa-spinner fa-spin me-2"></i> }
  
    Login</button>
    <span className="text-[16px] mx-3 flex w-fit  items-center">OR <FaArrowAltCircleRight className="animate-movingRight text-titleAuth"/> </span>
    <Link className=" hover:underline text-[16px]  transition" to="/auth/register">Go to SignUp</Link>
   </div>


    </form>
  </section>
}

export default Login
