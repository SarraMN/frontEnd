import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import { AjoutCours } from 'src/services/CoursService'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types'
import { getCoursById } from 'src/services/CoursService'
const CoursInfo = (props) => {
  const [cours, setCours] = useState(null)

  console.log('id formation', props.id)
  useEffect(() => {
    getCoursById(props.id)
      .then((response) => {
        console.log('hihii', response.data)
        setCours(response.data)
      })
      .catch((e) => {})
  }, [])
  return (
    <>
      <CCard>
        <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
          <CIcon
            icon={cilPencil}
            style={{
              marginRight: 15,
            }}
          />
          Détails Cours
        </CCardHeader>

        <CCol md={6} style={{ marginTop: 25, marginBottom: 15 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 50,
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            Titre :
          </span>
          <span style={{ fontSize: 16 }}> {cours != null && cours.titre}</span>
        </CCol>

        <CCol md={12} style={{ marginTop: 25 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginTop: 50, marginLeft: 15 }}>
            Description:
          </span>
          <span style={{ fontSize: 16, marginLeft: 15 }}>
            {' '}
            {cours != null && cours.description}
          </span>
        </CCol>

        <CCol md={12} style={{ marginTop: 20 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginTop: 50, marginLeft: 15 }}>
            Objectif:
          </span>
          <span style={{ fontSize: 16 }}> {cours != null && cours.objectif}</span>
        </CCol>
        <CCol md={12} style={{ marginTop: 25 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginTop: 50, marginLeft: 15 }}>
            Date creation:
          </span>
          <span style={{ fontSize: 16 }}> {cours != null && cours.dateCreation}</span>
        </CCol>
        <CCol md={12} style={{ marginTop: 25 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginTop: 50, marginLeft: 15 }}>
            Dérnière modification:
          </span>
          <span style={{ fontSize: 16 }}> {cours != null && cours.dateMdf}</span>
        </CCol>
        <CCol md={12} style={{ marginTop: 25, marginBottom: 40 }}>
          <span style={{ fontSize: 16, fontWeight: 'bold', marginTop: 50, marginLeft: 15 }}>
            Rssources:
          </span>
        </CCol>
      </CCard>
    </>
  )
}
CoursInfo.propTypes = {
  id: PropTypes.number,
}
export default CoursInfo
