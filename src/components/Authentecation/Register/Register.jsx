import { Link, useNavigate } from "react-router-dom"
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from 'yup'
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
    const phoneRegex= /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const passwordRegex= /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/ 
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const initialValues={
        name:"",
        email:"",
        password:"",
        age:"",
        phone:"",
    }




   async function handelSubmit(values){
          setLoading(true)
        try {
         
             await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp',values)
             toast.success('Succefully Making account')
             setLoading(false)
             setTimeout(()=>{navigate('/auth/login')},2000)
          } catch (error) {
            console.log('error register',error)
            setError(error.response.data.msg)
            setLoading(false)
         }

    }

    const validationSchema = yup.object({
        name:yup.string().required('Name Is Required..').max(15,'Max Length is 15').min(3,'Min Length is 3'),
        email:yup.string().email('please Enter A Valid Email').required('Email Is  Required..'),
        password:yup.string().matches(passwordRegex,"Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &.").required('Password Is Required..'),
        age:yup.number().required('Age Is Required..').max(60,'Max Age is 60').min(3,'Min Age is 18'),
        phone:yup.string().matches(phoneRegex,'Plase Enter A Valid Phone Number').required('Phone Is Required')
    }) 




const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit:handelSubmit
})




  return <section className=" py-8">
    <h2 className="mx-auto text-[30px] text-titleAuth  w-fit font-semibold">Register</h2>
    <form onSubmit={formik.handleSubmit} >
    {error ? <h3 style={{textTransform:'capitalize'}} className="text-red-600  tracking-[1px] font-bold text-[18px]">{error}</h3> :null} 

        <div className="mb-2">
             <label   htmlFor="name">name</label>
             <input id="name"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}  type="text"  placeholder='Enter Your Name...' name='name'  className="w-full inputHandel"  />
             {formik.errors.name &&formik.touched.name ? <p className="text-red-500 ms-1">{formik.errors.name}</p>:null}
        </div>



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

            <div className="mb-3">  
                <label   htmlFor="age">age</label>
                <input  id="age"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} type="number"    placeholder='Enter Your age...' name='age'  className="w-full inputHandel"  />
               {formik.errors.age &&formik.touched.age ? <p className="text-red-500 ms-1">{formik.errors.age}</p>:null}
            </div>


            <div className="mb-3">
              <label   htmlFor="phone">phone</label> 
              <input  id="phone"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel"    placeholder='Enter Your phone...' name='phone'  className="w-full inputHandel"  />
               {formik.errors.phone &&formik.touched.phone ? <p className="text-red-500 ms-1">{formik.errors.phone}</p>:null}
            </div>
  

  





   <div className="flex gap-4 items-center  mt-3">

    <button  type="submit" className="handelButonForm px-3 bg-footerNote"> 
    {loading &&    <i className="fa-solid fa-spinner fa-spin me-2"></i> }
  
    Register</button>
    <span className="text-[16px] mx-3 flex w-fit  items-center">OR <FaArrowAltCircleRight className="animate-movingRight text-titleAuth"/> </span>
   <Link className=" hover:underline text-[16px]  transition" to="/auth/login">Go to Login</Link>
   </div>


    </form>
  </section>
}

export default Register
