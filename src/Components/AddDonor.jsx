import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from 'reactstrap'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { axiosRegisterUser } from '../request/axiosReq'
import { useAuth } from '../AuthContext'

const validationSchema = z.object({
  email: z.string('Email field cannot be empty').email('Invalid email format'),
  name: z.string('Name field cannot be empty'),
  phone: z.string('Phone field cannot be empty'),
  password: z.string('Password field cannot be empty'),
  bloodGroup: z.string('Blood field cannot be empty'),
  address: z.string('Address field cannot be empty'),
})

const defaultVal = {
  email: '',
  name: '',
  phone: '',
  password: '',
}

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

function AddDonor({ show, onCloseClick, args }) {
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const { getDonorData } = useAuth()

  const submitHandler = async (data) => {
    //console.log(data)
    setLoading(true)
    try {
      const response = await axiosRegisterUser(data)
      console.log(response)
      if (response.data.err)
        enqueueSnackbar('Donor addition failed', { variant: 'warning' })
      else {
        enqueueSnackbar('Donor Added Successfully!', {
          variant: 'success',
        })
        getDonorData(response.data.msg)
        reset()
        window.location.reload()
        //onCloseClick()
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    setLoading(false)
  }
  return (
    <>
      <Modal
        /* size="lg" */
        fade={true}
        isOpen={show}
        toggle={onCloseClick}
        centered={true}
        {...args}
      >
        <ModalHeader toggle={onCloseClick}>Add Donor</ModalHeader>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div className="row">
              <div className="mb-3">
                <div className="col-sm-12">
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
                    <div
                      className="invalid-feedback"
                      style={{ display: 'block' }}
                    >
                      {errors.name?.message}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
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
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.email?.message}
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
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.phone?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  aria-describedby="numHelp"
                  {...register('address')}
                  error={errors.address ? true : false}
                />
                {errors.address ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.address?.message}
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
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
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
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.password?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={loading ? true : false}
              type="submit"
              color="success"
            >
              {loading ? (
                <Spinner size="sm" className="me-2">
                  {' '}
                  Loading...{' '}
                </Spinner>
              ) : null}
              Add
            </Button>{' '}
            <Button type="button" color="secondary" onClick={onCloseClick}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  )
}

export default AddDonor
