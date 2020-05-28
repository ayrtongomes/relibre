import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
  instituicaoData: [],

  instituicaoDataFailed: false
};

const fetchInstituicaoData = (state, action) => {
  return updateObject(state, {
    instituicaoData: action.instituicaoData
  });
};

// DATA FAIL
const fetchInstituicaoFail = (state, action) => {
  return updateObject(state, {
    instituicaoDataFailed: true
  });
};

const instituicaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INSTITUICAO_DATA:
      return fetchInstituicaoData(state, action);
    case actionTypes.FETCH_INSTITUICAO_FAILED:
      return fetchInstituicaoFail(state, action);
    default:
      return state;
  }
};

export default instituicaoReducer;
