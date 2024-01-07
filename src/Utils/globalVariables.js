let currentUserEmail = null;
let currentUserToken = null;

function setCurrentUserEmail(email) {
  currentUserEmail = email;
}

function getCurrentUserEmail() {
  return currentUserEmail;
}

function setCurrentUserToken(token) {
  currentUserToken = `Bearer ${token}`;
}

function getCurrentUserToken() {
  return currentUserToken;
}

module.exports = {
  setCurrentUserEmail,
  getCurrentUserEmail,
  setCurrentUserToken,
  getCurrentUserToken,
};
