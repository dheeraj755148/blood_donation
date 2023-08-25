import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from 'reactstrap'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSnackbar } from 'notistack'
import { axiosEditDonor } from '../request/axiosReq'
import { useAuth } from '../AuthContext'

const validationSchema = z.object({
  email: z.string('Email field cannot be empty').email('Invalid email format'),
  name: z.string('Name field cannot be empty'),
  phone: z.string('Phone field cannot be empty'),
  bloodGroup: z.string('Blood field cannot be empty'),
  address: z.string().optional(),
  ID: z.string().optional(),
  is_donated: z.string().optional(),
  donation_date: z.string().optional(),
  donation_hospital: z.string().optional(),
})

function EditDonor({ modal, toggle, info, args }) {
  const { getDonorData } = useAuth()

  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [isDonatedValue, setIsDonatedValue] = useState('')

  const handleIsDonatedChange = (event) => {
    setIsDonatedValue(event.target.value)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (info) {
      setValue('name', info?.name)
      setValue('email', info?.email)
      setValue('phone', info?.phone)
      setValue('bloodGroup', info?.bloodGroup)
      setValue('ID', info?.ID)
      if (info?.address) {
        setValue('address', info?.address)
      }
      if (info?.is_donated) {
        setValue('is_donated', info?.is_donated)
      }
      if (info?.donation_date) {
        setValue('donation_date', info?.donation_date)
      }
      if (info?.donation_hospital) {
        setValue('donation_hospital', info?.donation_hospital)
      }
    }
  }, [info, setValue])

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

  /* console.log('ID: ', ID) */
  const onSubmit = async (data) => {
    setLoading(true)
    try {
      //console.log(data)
      const response = await axiosEditDonor(data)
      if (response.data.err) {
        enqueueSnackbar(response.data.msg, { variant: 'error' })
      }
      enqueueSnackbar('Donor Updated Successfully !', { variant: 'success' })
      getDonorData(response.data.msg)
      reset()
      window.location.reload()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
    setLoading(false)
  }

  return (
    <Modal centered isOpen={modal} toggle={toggle} {...args}>
      <ModalHeader toggle={toggle}>Edit Donor</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div className="row">
            <div className="mb-3" hidden>
              <label htmlFor="email" className="form-label">
                ID
              </label>
              <input
                type="text"
                className="form-control"
                id="ID"
                aria-describedby="ID"
                required
                {...register('ID')}
                disabled
              />
              {errors.ID ? (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.ID?.message}
                </div>
              ) : (
                ''
              )}
            </div>
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
                <div className="invalid-feedback" style={{ display: 'block' }}>
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
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.phone?.message}
                </div>
              ) : (
                ''
              )}
            </div>
            {info?.address ? (
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  /* aria-describedby="numHelp" */
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
            ) : (
              <></>
            )}

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
              <label htmlFor="is_donated" className="form-label">
                Is Donated
              </label>
              <select
                className="form-select"
                aria-label="is_donated"
                {...register('is_donated')}
                error={errors.is_donated ? true : false}
                value={isDonatedValue}
                onChange={handleIsDonatedChange}
              >
                <option value="">Select a an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.is_donated ? (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.is_donated?.message}
                </div>
              ) : (
                ''
              )}
            </div>
            {isDonatedValue === 'Yes' && (
              <div className="mb-3">
                <label htmlFor="donation_date" className="form-label">
                  Donation Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="donation_date"
                  /* aria-describedby="numHelp" */
                  {...register('donation_date')}
                  error={errors.donation_date ? true : false}
                />
                {errors.donation_date ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.donation_date?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
            {isDonatedValue === 'Yes' && (
              <div className="mb-3">
                <label htmlFor="donation_hospital" className="form-label">
                  Donation Hospital
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="donation_hospital"
                  /* aria-describedby="numHelp" */
                  {...register('donation_hospital')}
                  error={errors.donation_hospital ? true : false}
                />
                {errors.donation_hospital ? (
                  <div
                    className="invalid-feedback"
                    style={{ display: 'block' }}
                  >
                    {errors.donation_hospital?.message}
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
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
            Update
          </Button>{' '}
          <Button type="button" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default EditDonor
