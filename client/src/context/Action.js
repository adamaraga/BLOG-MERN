export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  });
  
  export const Logout = () => ({
    type: "LOGOUT",
  });

  export const RegisterStart = (userCredentials) => ({
    type: "REGISTER_START",
  });

  export const RegisterSuccess = () => ({
    type: "REGISTER_SUCCESS",
  });
  
  export const RegisterFailure = () => ({
    type: "REGISTER_FAILURE",
  });
  
  export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START",
  });
  
  export const UpdateSuccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
  });
  
  export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE",
  });