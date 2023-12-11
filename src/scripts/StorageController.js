export const saveToken = function saveToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
};

export const loadToken = function loadToken() {
  return JSON.parse(localStorage.getItem('token'));
};

export const removeToken = function removeToken() {
  localStorage.removeItem('token');
};
