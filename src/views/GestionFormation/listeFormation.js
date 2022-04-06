import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Swal from 'sweetalert2'
import { editFormation } from 'src/services/FormationService'
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
  CFormSelect,
  CFormTextarea,
  CFormCheck,
} from '@coreui/react'

import React, { useEffect, useState } from 'react'
import photo1 from 'src/assets/images/Software-development.jpg'
import 'src/views/GestionFormation/listeFormation.css'
import { getFormations } from 'src/services/FormationService'
import { Modal, Button } from 'react-bootstrap'
import AjoutForm from 'src/views/GestionFormation/AjouterFormation'
import { DeleteFormation } from 'src/services/FormationService'
import { getFormation, archiverformation } from 'src/services/FormationService'
import { Link } from 'react-router-dom'

const ListeFormation = () => {
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
  // Formulaire d'ajout
  const [validated, setValidated] = useState(false)
  const [id, setId] = useState('')
  const [titre, setTitre] = useState('')
  const [categorie, setCategorie] = useState('Développement Front-end')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('yes')
  const [prix, setPrix] = useState('')

  const [values, setValues] = useState({
    id: '',
    titre: '',
    categorie: '',
    description: '',
    prix: '',
    nbrCours: '',
    dateCreation: '',
    auteur: { id: '', authority: {} },
    etat,
  })
  function initialiser() {
    setTitre('')
    setCategorie('Développement Front-end')
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
  function Notification_Succees() {
    Swal.fire('Succès!', 'La formation a été modifier avec succès', 'success')
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
      title: 'Problème',
      text: 'un problème dans la modification',
    })
  }
  //modification
  function getformationById(id) {
    console.log('id', id)
    setId(id)
    getFormation(id)
      .then((response) => {
        console.log('hihii', response.data)
        //setData to the form
        setTitre(response.data.titre)
        setCategorie(response.data.categorie)
        setDescription(response.data.description)
        setPrix(response.data.prix)
        setEtat(response.data.etat)
        //set les valeurs dans lobjet de lupdate pour qu'il ne soient pas null
        values.dateCreation = response.data.dateCreation
        values.auteur.id = response.data.auteur.id
        values.auteur.authority = response.data.auteur.authority
        values.nbrCours = response.data.nbrCours
      })
      .catch((e) => {})
  }
  function handleSubmitMdf(event) {
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
      values.id = id
      values.titre = titre
      values.categorie = categorie
      values.description = description
      values.prix = prix
      values.etat = etat
      console.log('values', values)
      editFormation(id, values).then((response) => {
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

  const handleShowAjt = () => setShowAjt(true)
  const handleCloseAjt = () => setShowAjt(false)

  const handleShowMdf = () => setShowMdf(true)
  const handleCloseMdf = () => setShowMdf(false)

  function Archiverformation(id, item) {
    Swal.fire({
      title: 'Cette formation est ' + item.etat + '! ' + `Voulez vous changez l'état?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'oui',
      denyButtonText: `Non`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        archiverformation(id)
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
  function supprimerFormation(id) {
    Swal.fire({
      title: 'Souhaitez-vous supprimer cet utilisateur ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'supprimer',
      denyButtonText: 'non',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DeleteFormation(id)
          .then((response) => {
            console.log('data', response.data)
            setBool(true)
            setBool(false)
          })
          .catch((e) => {})

        Swal.fire('cette formation a été supprimé avec succes!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Aucune modification ', '', 'info')
      }
    })
  }

  /*getFormation */
  useEffect(() => {
    getFormations()
      .then((response) => {
        setPosts(response.data.reverse())
        console.log('data', response.data)
        console.log('data', response.data[0].auteur)
      })
      .catch((e) => {})
  }, [showAjt, showMdf, bool, boolarchive])
  /*s'il ya aucune formation*/
  if (posts.length == 0)
    return (
      <>
        <CCard>
          <header className="card-heade">
            <p className="card-header-title">
              <span className="icon">
                <i className="mdi mdi-account-circle"></i>
              </span>
              Les formations
            </p>
            <button href="tutorial-single.html" className="btn-Aj" onClick={handleShowAjt}>
              <i
                className="flex fa fa-plus-circle"
                aria-hidden="true"
                style={{ marginRight: 10, paddingTop: 5 }}
              ></i>
              Ajouter formation
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
              <AjoutForm />
            </Modal.Body>
          </Modal>
          <div>
            <div style={{ height: 50, marginLeft: 15, marginTop: 15 }}>
              Aucune formation n{"'"}est diponible!
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
              Les formations
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
              Ajouter formation
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
              <AjoutForm />
            </Modal.Body>
          </Modal>
          {currentPosts.map((item, index) => (
            <div className="tutorial-item mb-6" key={index}>
              <div className="d-flex">
                <div className="img-wrap">
                  <a href="#">
                    <img src={photo1} alt="Image" className="img-fluid" />
                  </a>
                </div>
                <div className="it-cont">
                  <h3>
                    <a href="#">{item.titre}</a>
                    <span style={{ marginLeft: 10 }}>{item.prix} Dt</span>
                  </h3>
                  {/* <p>{item.description.substr(1, 60)}...</p> */}
                  <div className="meta">
                    <div style={{ marginBottom: 12 }}>
                      <i
                        className="fa fa-user-circle"
                        style={{ color: '#3399ff', marginRight: 14 }}
                        aria-hidden="true"
                      ></i>
                      <span className="info-det">Créer par:</span>
                      <span className="info-det" style={{ marginLeft: 86 }}>
                        {item.auteur.prenom} {item.auteur.nom}
                      </span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <i
                        className="fa fa-list-alt"
                        style={{ color: '#3399ff', marginRight: 14 }}
                        aria-hidden="true"
                      ></i>
                      <span className="info-det">Categorie:</span>
                      <span className="info-det" style={{ marginLeft: 80 }}>
                        {item.categorie}
                      </span>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <i
                        className="fa fa-users"
                        style={{ color: '#3399ff', marginRight: 8 }}
                        aria-hidden="true"
                      ></i>
                      <span className="info-det">Candidats inscrits:</span>
                      <span className="info-det" style={{ marginLeft: 40 }}>
                        40
                      </span>
                    </div>
                    <div>
                      <span className="mr-2 mb-2">Date de publication: {item.dateCreation}</span>
                      <p className="mr-2 mb-2">Dérnière date de modfication: {item.dateMdf}</p>
                    </div>
                  </div>

                  <Link
                    to="/GestionFormation/listeFormation/listeCours"
                    state={item}
                    className="link-cours"
                  >
                    <button className="btn-plus">Voir cours</button>
                  </Link>
                </div>
              </div>
              <div className="buttons">
                <button
                  className="btn-Modf custom-btn"
                  title="Modifier"
                  onClick={() => {
                    getformationById(item.id)
                    handleShowMdf()
                  }}
                >
                  <i className="far fa-edit fa-2x"></i>
                </button>
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
                        style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}
                      >
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
                        style={{
                          paddingLeft: 15,
                          paddingRight: 20,
                          paddingTop: 15,
                          paddingBottom: 15,
                        }}
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
                          <CFormFeedback invalid>
                            Vous devez séléctionner une Catégorie.
                          </CFormFeedback>
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
                        {etat == 'Non archivé' ? (
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
                        ) : (
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

                        <CCol md={8}>
                          <CFormLabel
                            style={{ fontWeight: 'bold' }}
                            htmlFor="exampleFormControlTextarea1"
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
                            onClick={handleSubmitMdf}
                          >
                            Modifier
                          </Button>
                        </CCol>
                      </CForm>
                    </CCard>
                  </Modal.Body>
                </Modal>
                <button className="btn-Supp custom-btn" title="Supprimer">
                  <i
                    className="far fa-trash-alt fa-2x"
                    onClick={() => supprimerFormation(item.id)}
                  ></i>
                </button>

                {item.etat == 'Non archivé' ? (
                  <button className="btn-arch custom-btn" title="Non archivé">
                    <i
                      className="fa fa-eye fa-2x"
                      onClick={() => Archiverformation(item.id, item)}
                    ></i>
                  </button>
                ) : (
                  <button className="btn-arch custom-btn" title="Archiver">
                    <i
                      className="fa fa-eye-slash fa-2x"
                      onClick={() => Archiverformation(item.id, item)}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <br></br>
          <CPagination
            className="justify-content-center"
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
export default ListeFormation
