import React, { useState } from 'react'
import * as yup from 'yup'
import { useAuth } from '../hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'
import { Form, Field, ErrorMessage, Formik } from 'formik'
import { motion } from 'framer-motion'

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
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm Password is required")
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
    confirmPassword: "",
    email: ""
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError("");
    setSuccessMsg("");

    const result = await register(values.firstname, values.lastname, values.email, values.password)
    if (result.success) {
      localStorage.setItem('token', result.token)
      setSuccessMsg('Registration successful!');
      resetForm();
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } else {
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
          <p className="text-muted">Create your free account</p>
        </div>

        {serverError && <div className="alert alert-danger py-2 small">{serverError}</div>}
        {successMsg && <div className="alert alert-success py-2 small">{successMsg}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="firstname">First Name</label>
                  <Field type="text" className="form-control" id="firstname" placeholder="John" name="firstname" />
                  <ErrorMessage name="firstname" component="div" className="text-danger small" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="lastname">Last Name</label>
                  <Field type="text" className="form-control" id="lastname" placeholder="Doe" name="lastname" />
                  <ErrorMessage name="lastname" component="div" className="text-danger small" />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">Email address</label>
                <Field type="email" className="form-control" id="email" placeholder="name@example.com" name="email" />
                <ErrorMessage name="email" component="div" className="text-danger small" />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <Field type="password" className="form-control" id="password" placeholder="••••••••" name="password" />
                <ErrorMessage name="password" component="div" className="text-danger small" />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" className="form-control" id="confirmPassword" placeholder="••••••••" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
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
                {isSubmitting ? 'Registering...' : 'Register'}
              </motion.button>
            </Form>
          )}
        </Formik>

        <p className="text-center mt-4 mb-0 small text-muted">
          Already have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}

export default Register