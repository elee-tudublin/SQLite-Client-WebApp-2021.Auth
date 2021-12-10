
// check login status
function checkStatus() {
  // Get access tokem from browser sessionStorage
  const accessToken = sessionStorage.getItem('accessToken');
  // Check if expired
  const expirationDate = new Date(Number.parseInt(sessionStorage.getItem('expirationDate')));
  const isExpired = expirationDate < new Date();
  let status;

  // Log details to console
  if (!accessToken) {
    status = 'There is no access token present in local storage, meaning that you are not logged in.';
  } else if (isExpired) {
    status = 'There is an expired access token in local storage.';
  } else {
    status = `There is an access token in local storage, and it expires on ${expirationDate}.`;
  }
  console.log("status: ", status);

  // If logged in
  if (accessToken && !isExpired) {
    return true;
    // reload data??
  } else {
    return false;
  }
}

// Get access token (from session storage, etc.)
function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

// Save the token to session storage 
function saveAuthResult(result) {
  sessionStorage.setItem('accessToken', result.accessToken);
  sessionStorage.setItem('idToken', result.idToken);
  sessionStorage.setItem('expirationDate', Date.now() + Number.parseInt(result.expiresIn) * 1000);
  // check login status
  checkStatus();
}

// Check token validity + refresh if expired
function checkSession() {
  auth0WebAuth.checkSession({
    responseType: 'token id_token',
    timeout: 5000,
    usePostMessage: true
  }, function (err, result) {
    if (err) {
      console.log(`Could not get a new token using silent authentication (${err.error}).`);
      return false;
    } else {
      saveAuthResult(result);
    }
    return true;
  });
}

//
// docode a JWT
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

//
// use jwt-decode to check if jwt contains a permission for the user
// return true or false
function checkAuth(permission) {
  // read the JWT
  const jwt = sessionStorage.getItem('accessToken');
  // check permissions (if a jwt was returned)
  if (jwt == null) {
    return false;
  }
  const decoded = parseJwt(jwt);
  return decoded.permissions.includes(permission);
} // End function

// Export functions
export {
  checkStatus,
  getAccessToken,
  saveAuthResult,
  checkSession,
  checkAuth
};