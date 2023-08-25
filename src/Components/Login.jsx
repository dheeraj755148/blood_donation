import React, { useState } from 'react'
import '../style/form.css'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { axiosloginUser } from '../request/axiosReq'
import { useAuth } from '../AuthContext'
import { useSnackbar } from 'notistack'
import { Button, Spinner } from 'reactstrap'
import Logo from '../images/Group 46 Black.svg'

const validationSchema = z.object({
  email: z.string('Email field cannot be empty').email('Invalid email format'),
  password: z.string('Password field cannot be empty'),
})

function Login() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })
  const loginUser = async (data) => {
    console.log(data)
    setLoading(true)
    const response = await axiosloginUser(data)
    setLoading(false)

    console.log('Login: ', response.data)
    const { err, msg } = response.data
    if (err) {
      enqueueSnackbar(msg, { variant: 'error' })
    } else {
      const minimalUserData = {
        ID: response.data.msg.ID,
        name: response.data.msg.name,
      }
      login(minimalUserData)
      //enqueueSnackbar(msg, { variant: 'success' })
      reset()
      window.location.pathname = '/'
    }
  }

  return (
    <div className="form-area">
      <form onSubmit={handleSubmit(loginUser)}>
        <div
          className="mb-3"
          style={{
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={Logo} alt="logo" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            {...register('email')}
          />
          {errors.email ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.email?.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register('password')}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          {errors.password ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.password?.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <button type="submit" className="btn btn-success">
          {loading ? (
            <Spinner size="sm" className="me-2">
              {' '}
              Loading...{' '}
            </Spinner>
          ) : null}
          Submit
        </button>
        <p>
          Not a user? <Link to="/register">Click to Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
