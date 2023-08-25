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

const validationSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
})

function ShowEye({ modal, toggle, info, args }) {
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
      setValue('phone', info?.phone)
      if (info?.address) {
        setValue('address', info?.address)
      }
      if (info?.donation_date) {
        setValue('address', info?.address)
      }
      if (info?.donation_hospital) {
        setValue('address', info?.address)
      }
    }
  }, [info, setValue])

  return (
    <Modal centered isOpen={modal} toggle={toggle} {...args}>
      <ModalHeader toggle={toggle}>Show Donor</ModalHeader>
      <ModalBody
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div className="row">
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
              disabled
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
              <textarea
                className="form-control"
                id="address"
                /* aria-describedby="numHelp" */
                {...register('address')}
                error={errors.address ? true : false}
                disabled
              />
              {errors.address ? (
                <div className="invalid-feedback" style={{ display: 'block' }}>
                  {errors.address?.message}
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ShowEye
