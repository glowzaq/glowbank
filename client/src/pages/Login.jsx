import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required")
})

const Login = () => {
  const {login} = useAuth()
  const navigate = useNavigate()
  const [successMsg, setSuccessMsg] = useState("")
  const [serverError, setServerError] = useState("")

  const initialValues = {
    email: "",
    password: ""
  }

  const handleSubmit = async (values, {setSubmitting, resetForm})=>{
      setSuccessMsg("");
      setServerError("");

      const result = await login(values.email, values.password)

      if (result.success){
        setSuccessMsg("Login successful!")
        resetForm()
      }else {
        setServerError(result.error)
      }

      setSubmitting(false)
  }
  return (
    <div className='container mt-5'>
      <h1>Login to your Account</h1>
      {serverError && (<p className='text-danger'>{serverError}</p>)}
      {successMsg && (<p className='text-success'>{successMsg}</p>)}
      <Formik
        validateSchema={loginSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
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
            <button type='submit' className='btn btn-primary' disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
          </Form>
        )}

      </Formik>
      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  )
}

export default Login