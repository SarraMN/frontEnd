import axios from 'axios'
const getToken = () => {
  return localStorage.getItem('USER_KEY')
}

export const getFormations = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation`,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const AjoutFormation = (authRequest) => {
  return axios({
    method: 'POST',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation`,
    data: authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const DeleteFormation = (authRequest) => {
  return axios({
    method: 'Delete',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
export const getFormation = (authRequest) => {
  return axios({
    method: 'GET',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + authRequest,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}

export const editFormation = (id, authRequest) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
    data: authRequest,
  })
}

export const archiverformation = (id) => {
  return axios({
    method: 'PUT',
    url: `${process.env.hostUrl || 'http://localhost:8080'}/api/formation/archiver/` + id,
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  })
}
