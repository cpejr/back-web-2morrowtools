let currentUserEmail = null;

function setCurrentUserEmail(email) {
  currentUserEmail = email;
}

function getCurrentUserEmail() {
  return currentUserEmail;
}

module.exports = { setCurrentUserEmail, getCurrentUserEmail };
