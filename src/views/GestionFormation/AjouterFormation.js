import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import { AjoutFormation, archiverformation } from 'src/services/FormationService'
import { fetchUserData, getUserById } from 'src/services/UserService'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
const AjouterFormation = () => {
  const [validated, setValidated] = useState(false)
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('Développement Front-end')
  const [description, setDescription] = useState('')
  const [prix, setPrix] = useState('')
  const [etat, setEtat] = useState('Non archivé')
  const [values, setValues] = useState({
    titre: '',
    categorie: '',
    description: '',
    prix: '',
    nbrCours: '',
    auteur: {
      id: '',
      authority: {},
    },
    etat: '',
  })

  function initialiser() {
    setTitre('')
    setCategorie('')
    setDescription('')
    setPrix('')
    setValidated(false)
  }
  function Notification_tailleDescription() {
    Swal.fire({
      icon: 'error',
      title: 'Taille description',
      text: 'La taille de la description doit être au minimum 50 caractères',
    })
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Erreur dans le serveur',
      text: 'le serveur ne repond pas!',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été ajouter avec succès', 'success')
  }
  useEffect(() => {
    fetchUserData()
      .then((response) => {
        console.log('userinfo', response.data)
        console.log('id', response.data.id)
        getUserById(response.data.id).then((response) => {
          console.log('respose', response.data)
          values.auteur.id = response.data.id
          values.auteur.authority = response.data.authority
          console.log('values.auteur', values.auteur)
        })
      })
      .catch((e) => {})
  }, [])

  const handleSubmit = (event) => {
    if (titre === '' || categorie === '' || description === '' || prix === '' || etat === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 50) {
      Notification_tailleDescription()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      console.log('waah', values.auteur)
      values.titre = titre
      values.categorie = categorie
      values.nbrCours = 0
      values.description = description
      values.prix = prix
      values.etat = etat
      console.log(values)
      AjoutFormation(values).then((response) => {
        if (response.status === 200) {
          console.log('avec succée')
          initialiser()
          Notification_Succees()
        } else if (response.status === 500) {
          console.log('failure')
          Notification_failure()
        }
      })
    }
  }

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
          Ajouter Formation
        </CCardHeader>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          style={{ paddingLeft: 15, paddingRight: 20, paddingTop: 15, paddingBottom: 15 }}
        >
          <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
              Titre
            </CFormLabel>
            <CFormInput
              type="text"
              id="validationCustom01"
              defaultValue=""
              required
              value={titre}
              onChange={(e) => {
                setTitre(e.target.value)
              }}
            />
            <CFormFeedback invalid>Titre est requis</CFormFeedback>
          </CCol>

          <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom04">
              Catégorie
            </CFormLabel>
            <CFormSelect
              id="validationCustom04"
              value={categorie}
              onChange={(e) => {
                setCategorie(e.target.value)
              }}
              defaultValue="Développement Front-end"
            >
              <option value="Développement Front-end">Développement Front-end</option>
              <option value="Développement Back-end">Développement Back-end</option>
              <option value="Sécurité">Sécurité</option>
            </CFormSelect>
            <CFormFeedback invalid>Vous devez séléctionner une Catégorie.</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="validationCustom01">
              Prix
            </CFormLabel>
            <CFormInput
              type="number"
              id="validationCustom01"
              placeholder="0.00"
              required
              value={prix}
              onChange={(e) => {
                setPrix(e.target.value)
              }}
            />
            <CFormFeedback invalid>Prix est requis</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="validationCustom01" style={{ fontWeight: 'bold' }}>
              Spécifier l{"'"}etat:
            </CFormLabel>
            <CFormCheck
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="Non archivé"
              label="Non archivé"
              onChange={(e) => {
                setEtat(e.target.value)
              }}
              defaultChecked
            />
            <CFormCheck
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="Archivé"
              label="Archivé"
              onChange={(e) => {
                setEtat(e.target.value)
              }}
            />
          </CCol>

          <CCol md={8}>
            <CFormLabel style={{ fontWeight: 'bold' }} htmlFor="exampleFormControlTextarea1">
              Déscription (min 50 caractères)
            </CFormLabel>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              rows="3"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              minLength="50"
            ></CFormTextarea>
            <CFormFeedback invalid>Déscription est requise</CFormFeedback>
            <p style={{ color: 'dimgray' }}> {description.length} caractères </p>
          </CCol>

          <CCol xs={12}>
            <Button
              className="btn-Aj"
              style={{
                backgroundColor: 'white',
                color: '#140788',
                width: 100,
                marginTop: 20,
                marginRight: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onClick={handleSubmit}
            >
              Ajouter
            </Button>
          </CCol>
        </CForm>
      </CCard>
    </>
  )
}
/* AjouterFormation.propTypes = {
  formation: PropTypes.object,
} */

export default AjouterFormation
