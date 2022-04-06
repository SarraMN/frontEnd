import {
  CCard,
  CCardHeader,
  CPagination,
  CPaginationItem,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getusers } from 'src/services/gestionutilisateurs'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilUserPlus, cilUserUnfollow } from '@coreui/icons'

const ListeUtilisateurs = () => {
  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(1)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)

  useEffect(() => {
    getusers()
      .then((response) => {
        setPosts(response.data)
        console.log('data', response.data)
        console.log('LONGUER', posts.length)
      })
      .catch((e) => {})
  }, [])

  console.log('posts', posts)

  if (posts) {
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

    return (
      <>
        <CCard>
          <CCardHeader style={{ backgroundColor: '#213f77', color: 'white', fontWeight: 'bold' }}>
            <CIcon
              icon={cilPeople}
              style={{
                marginRight: 15,
              }}
            />
            Liste d{"'"}attente
          </CCardHeader>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">Nom</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Prénom</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Genre</CTableHeaderCell>
                <CTableHeaderCell className="text-center">E-mail</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Numero</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
                <CTableHeaderCell className="text-center">last login</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Approuver</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentPosts.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  {/* Nom*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.nom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Prénom*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.prenom}</strong>
                    </div>
                  </CTableDataCell>
                  {/* genre*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.genre}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Email*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.email}</strong>
                    </div>
                  </CTableDataCell>
                  {/* Numtell*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.numero_de_telephone}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.authority.authority}</strong>
                    </div>
                  </CTableDataCell>
                  {/* LastLogin*/}
                  <CTableDataCell className="text-center">
                    <div className="small text-medium-emphasis">
                      <strong>{item.lastLogin}15/05/2022</strong>
                    </div>
                  </CTableDataCell>
                  {/* Approuver*/}
                  <CTableDataCell>
                    <button
                      style={{
                        border: 0,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <CIcon
                        icon={cilUserPlus}
                        customClassName="nav-icon"
                        style={{
                          marginTop: 5,
                          width: 30,
                          height: 30,
                          color: 'green',
                          marginLeft: 7,
                          marginRight: 7,
                        }}
                      />
                    </button>
                    <button
                      style={{
                        border: 0,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <CIcon
                        icon={cilUserUnfollow}
                        customClassName="nav-icon"
                        style={{
                          marginTop: 5,
                          width: 30,
                          height: 30,
                          color: 'red',
                        }}
                      />
                    </button>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <div style={{ 'text-align': ' center' }}>
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
                <CPaginationItem active>{activeNumber}</CPaginationItem>
              </a>
              <a
                onClick={() => {
                  if (NextPage < posts.length) {
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
          </div>
        </CCard>
      </>
    )
  } else return <div>rien</div>
}
export default ListeUtilisateurs
