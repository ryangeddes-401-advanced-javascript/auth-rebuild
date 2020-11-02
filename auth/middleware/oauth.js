'use strict';
//code implemented from: http://thecodebarbarian.com/github-oauth-login-with-node-js.html
const axios = require('axios');
let token = null;

module.exports = async (req, res, next) => {
console.log('OAUTH MIDDLEWARE HIT')
    const body = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.query.code
    };
    const opts = { headers: { accept: 'application/json' } };
    axios.post(`https://github.com/login/oauth/access_token`, body, opts).
      then(res => res.data['access_token']).
      then(_token => {
        console.log('My token:', token);
        token = _token;
        res.json({ ok: 1 });
        console.log('oauth token:', token)
      }).
      catch(err => res.status(500).json({ message: err.message }));
};