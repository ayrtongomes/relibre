import * as actionTypes from './actionsTypes';
import { userService } from '../services';
import { push } from 'connected-react-router';
// import { alertActions } from './';

// export const userActions = {
//     login,
//     logout
// };
import * as API from '../api/user';

export const login = obj => {
  debugger;
  return dispatch => {
    // dispatch(request({
    //     username
    // }));

    userService.login(obj).then(
      user => {
        dispatch(success(user));
        dispatch(push('/'));
      },
      error => {
        dispatch(failure(error));
        // dispatch(alertActions.error(error));
      }
    );
  };

  function request(user) {
    return {
      type: actionTypes.LOGIN_REQUEST,
      user
    };
  }

  function success(user) {
    return {
      type: actionTypes.LOGIN_SUCCESS,
      user
    };
  }

  function failure(error) {
    return {
      type: actionTypes.LOGIN_FAILURE,
      error
    };
  }
};

export const logout = () => {
  userService.logout();
  return {
    type: actionTypes.LOGOUT
  };
};

export const fetchUserDataError = error => {
  return {
    type: actionTypes.FETCH_USER_FAILED,
    userDataFailed: error
  };
};

export const PutUserData = data => {
  return {
    type: actionTypes.PUT_USER_DATA,
    userUpdate: data
  };
};

export const PostUserData = data => {
  return {
    type: actionTypes.POST_USER_DATA,
    userUpdate: data
  };
};

export const PostUser = obj => {
  debugger;
  return dispatch =>
    API.PostUser(obj)
      .then(response => {
        dispatch(PostUserData(response));
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchUserDataError(error));
      });
};
// PUT
export const UpdateUser = (id, obj) => {
  return dispatch =>
    API.UpdateUser(id, obj)
      .then(response => {
        dispatch(PutUserData(response));
      })
      .catch(error => {
        console.error(error);
        dispatch(fetchUserDataError(error));
      });
};
