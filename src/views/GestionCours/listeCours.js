import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import {
  CCard,
  CPagination,
  CPaginationItem,
  CCardHeader,
  CCol,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import 'src/views/GestionFormation/listeFormation.css'
import { Modal, Button } from 'react-bootstrap'
import AjoutForm from 'src/views/GestionCours/AjouterCours'
import {
  CoursByIdFormation,
  getCoursById,
  editCours,
  DeleteCours,
  archiverCours,
} from 'src/services/CoursService'
import { useLocation } from 'react-router-dom'
import CoursInfo from './CoursInfo'
const ListeCours = () => {
  const location = useLocation()

  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  const [bool, setBool] = useState(false)
  const [boolarchive, setBoolarchive] = useState(false)
  const [etat, setEtat] = useState('Non archivé')
  //bool si il a supprimer
  // Formulaire d'ajout
  const [validated, setValidated] = useState(false)
  const [id, setId] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [objectif, setObjectif] = useState('')
  const [file, setFile] = useState('')
  //coursInfo
  const [selectCoursId, setselectCoursId] = useState('')
  const [values, setValues] = useState({
    id: '',
    titre: '',
    description: '',
    dateCreation: '',
    objectif: '',
    formation: { id: '' },
    etat: ',',
  })

  function Notification_taille() {
    Swal.fire({
      icon: 'error',
      title: 'Taille minimum',
      text: 'La taille de la description et du chams objectif doivent être au minimum 50 caractères',
    })
  }
  function Notification_NonVide() {
    Swal.fire({
      icon: 'error',
      title: 'Champs requis',
      text: 'Tous les champs doivent être remplis',
    })
  }
  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été modifier avec succès', 'success')
  }

  function Notification_failure() {
    Swal.fire({
      icon: 'error',
      title: 'Problème',
      text: 'un problème dans la modification',
    })
  }
  //modification
  function CoursById(id) {
    console.log('id', id)
    setId(id)
    getCoursById(id)
      .then((response) => {
        console.log('hihii', response.data)
        //setData to the form
        setTitre(response.data.titre)
        setDescription(response.data.description)
        setObjectif(response.data.objectif)
        setEtat(response.data.etat)
        //set les valeurs dans lobjet de l'update pour qu'il ne soient pas null
        values.dateCreation = response.data.dateCreation
        values.formation.id = location.state.id
      })
      .catch((e) => {})
  }
  function handleSubmitMdf(event) {
    const form = event.currentTarget
    if (titre === '' || description === '' || objectif === '' || etat === '' || file === '') {
      Notification_NonVide()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (description.length < 50 || objectif.length < 50) {
      Notification_taille()
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      values.id = id
      values.titre = titre
      values.description = description
      values.objectif = objectif
      values.etat = etat
      console.log('values', values)
      editCours(id, values).then((response) => {
        if (response.status === 200) {
          setValidated(false)
          Notification_Succees()
        } else Notification_failure()
      })
    }
  }
  //popup
  const [showAjt, setShowAjt] = useState(false)
  const [showMdf, setShowMdf] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => setShowAjt(false)

  const handleShowMdf = () => setShowMdf(true)
  const handleCloseMdf = () => setShowMdf(false)

  //pour afficher les details d'un cour losque en clique sur le titre
  const handleShowInfo = (id) => {
    setShowInfo(true)
    setselectCoursId(id)
    console.log('id selected', selectCoursId)
  }
  const handleCloseInfo = () => setShowInfo(false)

  function ArchiverCours(id, item) {
    Swal.fire({
      title: 'Cette formation est ' + item.etat + '! ' + `Voulez vous changez l'état?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        archiverCours(id)
          .then(() => {
            Swal.fire('Modification avec succes!', '', 'success')
            setBoolarchive(true)
            setBoolarchive(false)
          })
          .catch((e) => {})
      } else if (result.isDenied) {
        Swal.fire('Pas de changement!', '', 'info')
      }
    })
  }
  function supprimerCours(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet utilisateur ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteCours(id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cette formation a été supprimé avec succes!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  //getallCours de la formation séléctionner (vide)
  useEffect(() => {
    console.log('formation from liste', location.state)
    console.log('formation id', location.state.id)
    CoursByIdFormation(location.state.id)
      .then((response) => {
        setPosts(response.data.reverse())
        console.log('liste cours', posts)
      })
      .catch((e) => {})
  }, [showAjt, showMdf, bool, boolarchive])

  /*s'il ya aucun cours*/
  if (posts.length == 0)
    return (
      <>
        <CCard>
          <header className="card-heade">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Les cours
            </p>
            <button href="tutorial-single.html" className="btn-Aj" onClick={handleShowAjt}>
              <i
                className="flex fa fa-plus-circle"
                aria-hidden="true"
                style={{ marginRight: 10, paddingTop: 5 }}
              ></i>
              Ajouter cours
            </button>
          </header>
          <Modal
            size="lg"
            show={showAjt}
            onHide={handleCloseAjt}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <AjoutForm id={location.state.id} />
            </Modal.Body>
          </Modal>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
              Aucun cours n{"'"}est créer pour cette formation!
            </div>
          </div>
        </CCard>
      </>
    )
  else {
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage //3
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Change page
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
      if (pageNumber < posts.length / postsPerPage) setNextPage(pageNumber + 1)
      if (pageNumber > 1) setPreviewsPage(pageNumber - 1)
    }
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i)
    }

    //selcetionner nombre de posts per page
    const handleChange = (event) => {
      console.log(event.target.value)
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }

    return (
      <>
        <CCard>
          <header className="card-heade">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Les cours
            </p>
            <button
              href="tutorial-single.html"
              className="btn-Aj"
              onClick={handleShowAjt}
              type="submit"
            >
              <i
                className="flex fa fa-plus-circle"
                aria-hidden="true"
                style={{ marginRight: 10, paddingTop: 5 }}
              ></i>
              Ajouter Cours
            </button>
          </header>
          <Modal
            size="lg"
            show={showAjt}
            onHide={handleCloseAjt}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <AjoutForm id={location.state.id} />
            </Modal.Body>
          </Modal>

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Ressources
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Titre
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Etat
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Date création
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Dernière modification
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ fontSize: 15 }}>
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* Ressources*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <i
                        className="fa fa-download"
                        aria-hidden="true"
                        style={{ marginRight: 18, fontSize: 20, color: '#3399ff' }}
                        title="télécharger"
                      ></i>
                      <i
                        className="fa fa-file-pdf-o"
                        aria-hidden="true"
                        style={{ marginRight: 10, fontSize: 20, color: '#3399ff' }}
                        title="consulter"
                      ></i>
                    </div>
                  </CTableDataCell>
                  {/* Titre*/}
                  <CTableDataCell className="text-center">
                    <a
                      style={{ color: 'blue', textDecorationLine: 'underline' }}
                      onClick={(id) => {
                        handleShowInfo(item.id)
                      }}
                      className="meduim"
                    >
                      {item.titre}
                    </a>
                  </CTableDataCell>
                  {/* Etat*/}
                  <CTableDataCell className="text-center">
                    <div className="meduim ">{item.etat}</div>
                  </CTableDataCell>
                  {/* Date création*/}
                  <CTableDataCell className="text-center">
                    <div className="meduim ">{item.dateCreation}</div>
                  </CTableDataCell>
                  {/* Date modification*/}
                  <CTableDataCell className="text-center">
                    <div className="meduim">{item.dateMdf}</div>
                  </CTableDataCell>
                  {/* Action*/}
                  <CTableDataCell className="text-center">
                    <div>
                      <span
                        onClick={() => {
                          CoursById(item.id)
                          handleShowMdf()
                        }}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                          style={{ marginRight: 12, fontSize: 22, color: 'green' }}
                          title="Modifier"
                        ></i>
                      </span>

                      <Modal
                        size="lg"
                        show={showMdf}
                        onHide={handleCloseMdf}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                      >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          {/* <AjoutForm formation={formation} /> */}
                          <CCard>
                            <CCardHeader
                              style={{
                                backgroundColor: '#213f77',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              <CIcon
                                icon={cilPencil}
                                style={{
                                  marginRight: 15,
                                }}
                              />
                              Modifier Cours
                            </CCardHeader>
                            <CForm
                              className="row g-3 needs-validation"
                              noValidate
                              validated={validated}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 20,
                                paddingTop: 15,
                                paddingBottom: 15,
                              }}
                            >
                              <CCol md={6}>
                                <CFormLabel
                                  htmlFor="validationCustom01"
                                  style={{ fontWeight: 'bold' }}
                                >
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
                              {etat == 'Non archivé' ? (
                                <CCol md={6}>
                                  <CFormLabel
                                    htmlFor="validationCustom01"
                                    style={{ fontWeight: 'bold' }}
                                  >
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
                              ) : (
                                <CCol md={6}>
                                  <CFormLabel
                                    htmlFor="validationCustom01"
                                    style={{ fontWeight: 'bold' }}
                                  >
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
                                    defaultChecked
                                  />
                                </CCol>
                              )}

                              <CCol md={6}>
                                <CFormLabel
                                  htmlFor="exampleFormControlTextarea1"
                                  style={{ fontWeight: 'bold' }}
                                >
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
                                <p style={{ color: 'dimgray' }}>
                                  {' '}
                                  {description.length} caractères{' '}
                                </p>
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel
                                  htmlFor="exampleFormControlTextarea1"
                                  style={{ fontWeight: 'bold' }}
                                >
                                  Objectifs (min 50 caractères)
                                </CFormLabel>
                                <CFormTextarea
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  required
                                  value={objectif}
                                  onChange={(e) => {
                                    setObjectif(e.target.value)
                                  }}
                                  minLength="50"
                                ></CFormTextarea>
                                <CFormFeedback invalid>Champs requis</CFormFeedback>
                                <p style={{ color: 'dimgray' }}> {objectif.length} caractères </p>
                              </CCol>
                              <CCol md={6}>
                                <CFormLabel htmlFor="formFileSm" style={{ fontWeight: 'bold' }}>
                                  Ajouter le cours en format pdf
                                </CFormLabel>
                                <CFormInput
                                  required
                                  type="file"
                                  size="sm"
                                  id="formFileSm"
                                  value={file}
                                  onChange={(e) => {
                                    setFile(e.target.value)
                                  }}
                                />
                                <CFormFeedback invalid>Champs requis</CFormFeedback>
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
                                  onClick={handleSubmitMdf}
                                >
                                  Modifier
                                </Button>
                              </CCol>
                            </CForm>
                          </CCard>
                        </Modal.Body>
                      </Modal>

                      <span onClick={() => supprimerCours(item.id)}>
                        <i
                          className="fa fa-trash-o"
                          aria-hidden="true"
                          style={{ marginRight: 12, fontSize: 22, color: 'red' }}
                          title="Supprimer"
                        ></i>
                      </span>
                      {item.etat == 'Non archivé' ? (
                        <span onClick={() => ArchiverCours(item.id, item)}>
                          <i
                            className="fa fa-eye"
                            aria-hidden="true"
                            style={{ fontSize: 19, color: '#140788' }}
                            title="Non archivé"
                          ></i>
                        </span>
                      ) : (
                        <span onClick={() => ArchiverCours(item.id, item)}>
                          <i
                            className="fa fa-eye-slash"
                            aria-hidden="true"
                            style={{ fontSize: 19, color: '#140788' }}
                            title="Archiver"
                          ></i>
                        </span>
                      )}
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
              {/* modal de l'afichage des inoformations */}
              <Modal
                show={showInfo}
                onHide={handleCloseInfo}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                  <CCard>
                    <CoursInfo id={selectCoursId}></CoursInfo>
                  </CCard>
                </Modal.Body>
              </Modal>
            </CTableBody>
          </CTable>
          <br></br>
          <CPagination
            className="justify-content-end"
            aria-label="Page navigation example"
            style={{ marginRight: 20 }}
          >
            <a
              onClick={() => {
                if (PreviewsPage != 0) {
                  setCurrentPage(PreviewsPage)
                  paginate(PreviewsPage)
                  setactiveNumber(PreviewsPage)
                }
              }}
            >
              <CPaginationItem aria-label="Previous" disabled>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
            </a>
            <a>
              <CPaginationItem style={{ background: '#140788', color: 'white' }}>
                {activeNumber}
              </CPaginationItem>
            </a>
            <a
              onClick={() => {
                if (currentPage < posts.length / postsPerPage) {
                  setCurrentPage(NextPage)
                  paginate(NextPage)
                  setactiveNumber(NextPage)
                }
              }}
            >
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </a>
          </CPagination>

          <div className="row pagination_row" style={{ marginRight: 15, marginBottom: 15 }}>
            <div className="col">
              <div className="pagination_container d-flex flex-row align-items-center justify-content-start">
                <div className="courses_show_container ml-auto clearfix">
                  <div className="courses_show_text">
                    <span>1-{postsPerPage}</span> de <span>{posts.length}</span> resultats:
                  </div>
                  <div className="courses_show_content">
                    <span>Voir: </span>
                    <span></span>
                    <span></span>
                    <select onClick={handleChange}>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CCard>
      </>
    )
  }
}
export default ListeCours
