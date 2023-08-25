import PropTypes from 'prop-types'
import React from 'react'
import { Modal, ModalBody } from 'reactstrap'
import { useSnackbar } from 'notistack'
import { axiosDeleteDonor } from '../request/axiosReq'

const DeleteDonor = ({ show, onCloseClick, info }) => {
  const { enqueueSnackbar } = useSnackbar()

  const deleteHandler = async () => {
    try {
      const response = await axiosDeleteDonor({ id: info.ID })
      if (response.data.err) {
        enqueueSnackbar(response.data.msg, { variant: 'error' })
      }
      enqueueSnackbar('Donor Updated Successfully !', { variant: 'success' })
      //getDonorData(response.data.msg)
      window.location.reload()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              Are you sure you want to remove this donor ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={deleteHandler}
          >
            Yes, Delete It!
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default DeleteDonor
