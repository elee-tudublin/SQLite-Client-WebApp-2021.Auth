// Depencencies
const authConfig = require("../config/auth_config.json");
const axios = require('axios').default;

let getAuthUser = async (accessToken) => {

    // Get user info from Auth0
    // include the access token in the authorization header
    const url = `${authConfig.issuer}userinfo`;
    const config = {
      headers: {
        "authorization": `Bearer ${accessToken}`
      }
    }
    // Use axios to make request
    const user = await axios.get(url, config);

    // return the user data
    return user.data;
  }

// Module exports
// expose these functions
module.exports = {
    getAuthUser
};