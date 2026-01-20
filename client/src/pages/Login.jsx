import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { motion } from 'framer-motion'

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
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-header text-center mb-4">
          <h2 className="fw-bold text-primary">GlowBank</h2>
          <p className="text-muted">Login to your Account</p>
        </div>

        {serverError && <div className="alert alert-danger py-2 small">{serverError}</div>}
        {successMsg && <div className="alert alert-success py-2 small">{successMsg}</div>}

        <Formik
          validateSchema={loginSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <Field
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="password">Password</label>
                <Field
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                className='btn btn-primary w-100 py-2 fw-bold'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                ) : null}
                {isSubmitting ? 'Logging in...' : 'Login'}
              </motion.button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 mb-0 small text-muted">
          Don’t have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Login