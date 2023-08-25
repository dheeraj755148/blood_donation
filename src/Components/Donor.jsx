import React, { useEffect, useState } from 'react'
import SideBar from './sub_component/sidebar'
import '../style/home.css'
import '../style/donor.css'
import Table from './sub_component/table'
import { axiosGetDonorData } from '../request/axiosReq'
import { useAuth } from '../AuthContext'
import AddDonor from './AddDonor'
import { useSnackbar } from 'notistack'
import EditDonor from './EditDonor'
import ShowEye from './ShowEye'
import DeleteDonor from './DeleteDonor'

function Donor() {
  const { enqueueSnackbar } = useSnackbar()

  const [apiData, setApiData] = useState()
  const [addModal, setAddModal] = useState(false)
  const [showEditModal, setEditModalShow] = useState(false)
  const [showEyeModal, setShowEyeModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)


  const [info, setInfo] = useState(null)
  const [Id, setId] = useState(null)

  const { getDonorData, donorData } = useAuth()

  useEffect(() => {
    async function getDonorDataAPI() {
      try {
        const response = await axiosGetDonorData()
        console.log(response)
        if (response.data.err === false) {
          getDonorData(response.data.msg)
          setApiData(response.data.msg)
        } else {
          enqueueSnackbar(response.data.msg, { variant: 'error' })
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
    getDonorDataAPI()
  }, [enqueueSnackbar])

  const closeAddModalHandler = () => {
    setAddModal((prev) => !prev)
  }
  const hideEditModal = () => {
    setEditModalShow((prev) => !prev)
  }
  const hideEyeModal = () => {
    setShowEyeModal((prev) => !prev)
  }
  const deleteModalShowHandler = () => {
    setDeleteModal((prev) => !prev)
  }

  return (
    <>
      <div className="home-page">
        <AddDonor show={addModal} onCloseClick={closeAddModalHandler} />
        <EditDonor
          modal={showEditModal}
          toggle={hideEditModal}
          info={info}
          /* ID={Id} */
        />
        <ShowEye modal={showEyeModal} toggle={hideEyeModal} info={info} />
        <DeleteDonor
          info={info}
          show={deleteModal}
          onCloseClick={deleteModalShowHandler}
        />
        {/* <SideBar /> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12 header-area">
              <div className="col-lg-6 list-heading">
                <h3>Donor List</h3>
              </div>
              <div className="col-lg-6 list-heading button-area">
                <button
                  type="button"
                  className="btn btn-success add-btn"
                  id="create-btn"
                  onClick={closeAddModalHandler}
                >
                  Add Donor
                </button>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="table-area">
                <Table
                  data={apiData}
                  hideEditModal={hideEditModal}
                  hideEyeModal={hideEyeModal}
                  deleteModalShowHandler={deleteModalShowHandler}
                  setInfo={setInfo}
                  setId={setId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Donor
