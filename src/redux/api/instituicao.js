import axios from 'axios';

// get
export const GetInstituicoes = name =>
  axios.get(`/Instituicao?nome=${name}`).then(response => response.data);
