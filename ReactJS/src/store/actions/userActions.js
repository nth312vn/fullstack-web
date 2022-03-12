import actionTypes from "./actionTypes";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});
export const userLoginSuccess = (userInfo) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
  };
};
export const processLogout = () => {
  return {
    type: actionTypes.PROCESS_LOGOUT,
  };
};
export const userLoginFail = () => {
  return {
    type: actionTypes.USER_LOGIN_FAIL,
  };
};
