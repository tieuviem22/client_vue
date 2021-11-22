const ID_TOKEN_KEY = "token";
const ID_USER_KEY = "user";

// saveUser
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};


export const getUser = () => {
  return window.localStorage.getItem(ID_USER_KEY);
};

export const saveUser = user => {
  window.localStorage.setItem(ID_USER_KEY, user);
};

export const destroyUser = () => {
  window.localStorage.removeItem(ID_USER_KEY);
};
export default { getToken, saveToken, destroyToken, getUser, saveUser , destroyUser  };
