import React, { useEffect, useState } from 'react'
import photo1 from 'src/assets/images/Software-development.jpg'
import 'src/views/NosFormations/formationInfos.css'
import { Accordion, Modal, Button, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import { CoursByIdFormation } from 'src/services/CoursService'
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'
const FormationInfo = () => {
  const [show, setShow] = useState(false)
  const [cours, setCours] = useState([])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [values, setValues] = useState({
    titre: '',
    categorie: '',
    description: '',
    prix: '',
    nbrCours: '',
  })

  const location = useLocation()

  console.log('hiii', location.state.titre)
  values.titre = location.state.titre
  values.categorie = location.state.categorie
  values.prix = location.state.prix
  values.nbrCours = location.state.nbrCours
  values.description = location.state.description
  console.log('values', values)
  useEffect(() => {
    CoursByIdFormation(location.state.id)
      .then((response) => {
        setCours(response.data.reverse())
        console.log('cours', response.data)
      })
      .catch((e) => {})
  }, [])
  return (
    <div className="formation">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="formation_container">
              <div className="formation_title"> {values.titre}</div>
              {/*formation Image -->"*/}
              <div className="formation_image">
                <img src={photo1} alt="" />
              </div>

              {/*!-- formation Tabs -->*/}
              {/*       <Nav justify variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                  <LinkContainer to="/CoursTabs">
                    <Nav.Link>Active</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
              </Nav> */}
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
                  <div className="tab_panels">
                    {/*<!-- Description -->*/}
                    <div className="tab_panel active">
                      <div className="tab_panel_title">{values.titre}</div>
                      <div>
                        <div className="tab_panel_text">
                          <p>{values.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-contact"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                ></div>
              </div>
            </div>
          </div>

          {/*<!-- formation sidebarFormation -->*/}
          <div className="col-lg-4">
            <div className="sidebarFormation">
              {/*<!-- Feature -->*/}
              <div className="sidebarFormation_section">
                <div className="sidebarFormation_section_title">Détails formation</div>
                <div className="sidebarFormation_feature">
                  <div className="formation_price">{values.prix} Dt</div>

                  <div className="feature_list">
                    <div className="feature d-flex flex-row align-items-center justify-content-start">
                      <div className="feature_title">
                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        <span>Cours:</span>
                      </div>
                      <div className="feature_text ml-auto">{values.nbrCours}</div>
                    </div>

                    <div className="feature d-flex flex-row align-items-center justify-content-start">
                      <div className="feature_title">
                        <i className="fa fa-list-alt" aria-hidden="true"></i>
                        <span style={{ marginRight: 50 }}>Catégorie:</span>
                      </div>
                      <div className="feature_text ml-auto">{values.categorie}</div>
                    </div>

                    <div className="feature d-flex flex-row align-items-center justify-content-start">
                      <div className="feature_title">
                        <i className="fa fa-users" aria-hidden="true"></i>
                        <span>Candidats inscrits:</span>
                      </div>
                      <div className="feature_text ml-auto">35</div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="home_search_button" onClick={handleShow}>
                S{"'"} inscrire au cours
              </button>
              <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Demande d{"'"}inscription</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Cette formation coûte 40dt si vous êtes sur de s{"'"}inscrire cliquer sur envoyer
                  et un agent va bientôt vous contacter pour fixer un rendez-vous pour venir chez
                  nous et payer le montant demandé.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Fermer
                  </Button>
                  <Button style={{ height: 39 }} variant="primary" onClick={handleClose}>
                    Envoyer
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          {cours != null && (
            <div
              className="tab_panel_title"
              style={{ marginBottom: 20, marginTop: 15, marginLeft: 28 }}
            >
              Cours
            </div>
          )}
          {cours.length != 0 && (
            <CAccordion activeItemKey={2} style={{ width: 700 }}>
              {cours.map((item, index) => (
                <CAccordionItem Key={index} itemKey={index}>
                  <CAccordionHeader>
                    {item.titre} #{index}
                  </CAccordionHeader>
                  <CAccordionBody>
                    <strong>Description</strong>
                    <p>{item.description}</p>
                    <strong>Objectif</strong>
                    <p>{item.objectif}</p>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          )}
        </div>
      </div>
    </div>
  )
}
export default FormationInfo
