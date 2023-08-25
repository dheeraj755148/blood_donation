import React from 'react'
import '../style/form.css'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { axiosRegisterUser } from '../request/axiosReq'
import Logo from '../images/Group 46 Black.svg'

const validationSchema = z.object({
  email: z.string('Email field cannot be empty').email('Invalid email format'),
  name: z.string('Name field cannot be empty'),
  phone: z.string('Phone field cannot be empty'),
  password: z.string('Password field cannot be empty'),
  bloodGroup: z.string('Blood field cannot be empty'),
})

const bloodType = [
  { name: 'A+' },
  { name: 'A-' },
  { name: 'B+' },
  { name: 'B-' },
  { name: 'O+' },
  { name: 'O-' },
  { name: 'AB+' },
  { name: 'AB-' },
]

function Register() {
  const navigate = useNavigate()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const registerUser = async (data) => {
    console.log(data)
    const response = await axiosRegisterUser(data)
    console.log(response)
    reset()
    navigate('/login')
  }
  return (
    <div className="form-area">
      <form onSubmit={handleSubmit(registerUser)}>
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
            required
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
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            {...register('name')}
            error={errors.name ? true : false}
            required
          />
          {errors.name ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.name?.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            aria-describedby="numHelp"
            {...register('phone')}
            error={errors.phone ? true : false}
          />
          {errors.phone ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.phone?.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="bloodGroup" className="form-label">
            Blood Group
          </label>
          <select
            className="form-select"
            aria-label="bloodGroup"
            {...register('bloodGroup')}
            error={errors.bloodGroup ? true : false}
          >
            <option value="">Select a blood group</option>
            {bloodType.map((type, index) => (
              <option key={index} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.bloodGroup ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.bloodGroup?.message}
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
          />
          {errors.password ? (
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.password?.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>
          Already a user? <Link to="/login">Click to Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
