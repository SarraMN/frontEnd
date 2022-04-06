import React, { useEffect, useState } from 'react'
import 'src/views/NosFormations/formation.css'
import photo1 from 'src/assets/images/Software-development.jpg'
import { CCard, CPagination, CPaginationItem } from '@coreui/react'
import { getFormations } from 'src/services/FormationService'
import { Link, useNavigate } from 'react-router-dom'
const FormationDispo = () => {
  const [posts, setPosts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setpostsPerPage] = useState(3)
  const [NextPage, setNextPage] = useState(currentPage + 1)
  const [PreviewsPage, setPreviewsPage] = useState(1)
  const [activeNumber, setactiveNumber] = useState(1)
  const [selectValue, setselectValue] = useState('3')
  let navigate = useNavigate()

  useEffect(() => {
    getFormations()
      .then((response) => {
        setPosts(response.data.reverse())
        console.log('data', response.data)
        console.log('LONGUER', posts.length)
      })
      .catch((e) => {})
  }, [])

  /*   function change(item) {
    navigate('/NosFormations/formations/formationInfo', {
      state: item,
    })
  } */

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

    //selcetionner nombre de posts per page
    const handleChange = (event) => {
      console.log(event.target.value)
      setselectValue(event.target.value)
      setpostsPerPage(selectValue)
    }
    const change = (item) => {
      /*      console.log('item', item)
      navigate('/NosFormations/formations/formationInfo', {
        state: item,
      }) */
    }
    return (
      <CCard>
        <div className="container">
          <div className="row">
            {currentPosts.map((item, index) => (
              <div
                className="col-lg-4 course_col"
                style={{ marginTop: 25, marginRight: 0 }}
                key={index}
              >
                <div className="course">
                  <div className="course_image">
                    <img src={photo1} alt="" />
                  </div>
                  <div className="course_body">
                    <h3 className="course_title" style={{ marginBottom: 25 }}>
                      <strong>
                        <Link to="/NosFormations/formations/formationInfo" state={item}>
                          {item.titre}
                        </Link>
                      </strong>
                    </h3>
                    <div className="course_text">
                      <p>{item.description.substr(0, 35)}...</p>
                    </div>
                    <div className="course_Date">
                      <strong>Date de publication :</strong> {item.dateCreation}
                    </div>
                  </div>
                  <div className="course_footer">
                    <div className="course_footer_content d-flex flex-row align-items-center justify-content-start">
                      <div className="course_info">
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        <span>20 Student</span>
                      </div>
                      <div className="course_info">
                        <i className="fa fa-star" aria-hidden="true" />
                        <span>5 Ratings</span>
                      </div>
                      <div className="course_price ml-auto">{item.prix} DT</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
            <CPaginationItem active>{activeNumber}</CPaginationItem>
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

        <div
          style={{ marginRight: 15, marginBottom: 15 }}
          className="d-flex flex-row align-items-center justify-content-start"
        >
          <div className="ml-auto clearfix">
            <div className="courses_show_text">
              <span className="courses_showing">1-{postsPerPage}</span> de{' '}
              <span className="courses_total">{posts.length}</span> resultats:
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
      </CCard>
    )
  } else if (posts == null)
    return (
      <CCard>
        <div>aucune formation pour le moment</div>
      </CCard>
    )
}
export default FormationDispo
