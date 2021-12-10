// Declare consts for Auth0 details required in this app

// api roles
const API_ROLES = {
  CREATE_PRODUCT : 'create:products',
  READ_PRODUCT : 'read:products',
  UPDATE_PRODUCT : 'update:products',
  DELETE_PRODUCT : 'delete:products'
};

// The Auth0 id for this app
const AUTH0_CLIENT_ID = '';

// Your Auth0 domain aka account/ tenant
const AUTH0_DOMAIN = 'my-aacount.eu.auth0.com';

// Users of this app require access to the API, identified by...
// This value is the 'Identifier' in your API settings 
const AUDIENCE = 'https://product-api';

// Where Auth0 should return the token to after authentication
const AUTH0_CALLBACK_URL = 'http://localhost:3000';

// Initialise Auth0 connection with parameters defined above
const auth0WebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_CALLBACK_URL,
  responseType: 'id_token token',
  audience: AUDIENCE
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID
});

// Export consts
export {
  API_ROLES,
  auth0WebAuth,
  auth0Authentication
}
