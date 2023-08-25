import React, { useState, useEffect } from 'react'
import { axiosGetDonorData } from '../request/axiosReq'
import { useSnackbar } from 'notistack'
import { Spinner } from 'reactstrap'
import A_plus from '../images/A_plus.svg'
import A_neg from '../images/A_neg.svg'
import B_plus from '../images/B_plus.svg'
import B_neg from '../images/B_neg.svg'
import AB_neg from '../images/AB_neg.svg'
import AB_plus from '../images/AB_plus.svg'
import O_plus from '../images/O_plus.svg'
import O_neg from '../images/O_neg.svg'
import '../style/bloodType.css'

const bloodRelation = [
  { 'A+': A_plus },
  { 'A-': A_neg },
  { 'B+': B_plus },
  { 'B-': B_neg },
  { 'AB+': AB_plus },
  { 'AB-': AB_neg },
  { 'O+': O_plus },
  { 'O-': O_neg },
]

function BloodType() {
  const [bloodCount, setBloodCount] = useState({})
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosGetDonorData()
        if (response.data.err === false) {
          const charData = response.data.msg
          const bloodGroupCount = {}
          charData.forEach((donor) => {
            const bloodGroup = donor.bloodGroup
            bloodGroupCount[bloodGroup] = (bloodGroupCount[bloodGroup] || 0) + 1
          })
          setBloodCount(bloodGroupCount)
        } else {
          enqueueSnackbar(response.data.msg, { variant: 'error' })
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
      setLoading(false)
    }
    fetchData()
  }, [enqueueSnackbar])

  return (
    <>
      {loading ? (
        <Spinner size="lg" className="me-2 m-5" />
      ) : (
        <div className="col-lg-11 blood-type-area blood-area">
          <div className="heading-container">
            <p className="h5">Blood Type Counts</p>
          </div>
          {bloodRelation.map((relation, index) => {
            // Add index parameter
            const bloodType = Object.keys(relation)[0]
            const imageSrc = relation[bloodType]
            const count = bloodCount[bloodType] || 0
            const isLast = index === bloodRelation.length - 1 // Check if it's the last element

            return (
              <div
                className={`col-lg-2 blood-count ${
                  isLast ? 'last-blood-count' : ''
                }`}
                key={bloodType}
              >
                <div className="image-area">
                  <img src={imageSrc} alt={bloodType} />
                </div>
                <div
                  className={`count-area ${isLast ? 'no-border-right' : ''}`}
                >
                  {' '}
                  {/* Add class based on isLast */}
                  <div className="count">{count}</div>
                  <div className="pouch">people</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default BloodType
