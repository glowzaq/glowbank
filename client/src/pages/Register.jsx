import React, { useState } from 'react'
import * as yup from 'yup'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { Form, Field, ErrorMessage, Formik } from 'formik'

const registerSchema = yup.object().shape({
  firstname: yup
  .string()
  .min(3, "Firstname must be at least 3 characters")
  .required("Firstname is required"),

  lastname: yup
  .string()
  .min(3, "Lastname must be at least 3 characters")
  .required("Lastname is required"),

  email: yup
  .string()
  .email("Invalid email format")
  .required("Email is required"),

  password: yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain uppercase, lowercase, number and special characters"
  )
})

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const initialValues = {
    firstname: "",
    lastname: "",
    password: "",
    email: ""
  }

  const handleSubmit = async (values, {setSubmitting, resetForm})=>{
    setServerError("");
    setSuccessMsg("");

    const result = await register(values.firstname, values.lastname, values.email, values.password)
    if (result.success){
      localStorage.setItem('token', result.token)
      setSuccessMsg('Registration successful!');
      resetForm();
      setTimeout(()=>{
        navigate('/dashboard')
      }, 1500)
    }else{
      setServerError(result.error)
    }

    setSubmitting(false)
    
  }
  return (
    <div className='container mt-5'>
      <h1>Register Here</h1>
      {serverError && (<p className='text-danger'>{serverError}</p>)}
      {successMsg && (<p className='text-success'>{successMsg}</p>)}

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-floating mb-3 w-50">
              <Field type="text" className="form-control" id="firstname" placeholder="firstname" name="firstname" />
              <label htmlFor="firstname">First Name</label>
              <ErrorMessage name="firstname" component="div" className="text-danger" />
            </div>
            <div className="form-floating w-50 mb-3">
              <Field type="text" className="form-control" id="lastname" placeholder="Lastname" name="lastname" />
              <label htmlFor="lastname">Last Name</label>
              <ErrorMessage name="lastname" component="div" className="text-danger" />
            </div>
            <div className="form-floating mb-3 w-50">
              <Field type="email" className="form-control" id="email" placeholder="name@example.com" name="email" />
              <label htmlFor="email">Email address</label>
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-floating w-50 mb-3">
              <Field type="password" className="form-control" id="password" placeholder="Password" name="password" />
              <label htmlFor="password">Password</label>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type='submit' className='btn btn-primary' disabled={isSubmitting}>{isSubmitting ? 'Registering...' : 'Register'}</button>
          </Form>
        )}
      </Formik>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  )
}

export default Register