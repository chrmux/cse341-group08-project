const express = require('express');
const router = express.Router();

const { auth } = require('express-openid-connect');
const dotenv = require('dotenv').config();


const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));
// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  //now we try new things
  // if (req.oidc.isAuthenticated() == true) {
  //   const user = req.oidc.user;
  //   console.log(user);
  //   const subId = user.sub;
  //   console.log(subId);
  // }
});

module.exports = router;