import * as actionTypes from './actionsTypes';
import * as API from '../api/instituicao';

export const fetchInstituicaoData = data => {
  return {
    type: actionTypes.FETCH_INSTITUICAO_DATA,
    instituicaoData: data
  };
};

// FAIL FETCH -------------------------------------
export const fetchInstituicaoFailed = error => {
  return {
    type: actionTypes.FETCH_INSTITUICAO_FAILED,
    instituicaoDataFailed: error
  };
};
// -----------------------------------------

// GET
export const GetInstituicoesData = name => {
  return dispatch =>
    API.GetInstituicoes(name)
      .then(response => {
        dispatch(fetchInstituicaoData(response));
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchInstituicaoFailed(error));
      });
};
