'use strict';

import { Service } from "typedi";
import IGoogleAuthService from "./IServices/IGoogleAuthService";

const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '793782258027-gsjpgbgn5sbeinnrvs06k90fe0enkh4r.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const client = new OAuth2Client(CLIENT_ID);

@Service()
export default class GoogleAuthService implements IGoogleAuthService {
  constructor() {}

  async validateToken(token): Promise<Boolean> {

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    console.log(payload)

    await this.storeSession(userId)

    return true;
  }

  async storeSession(tokenUser) {
    const express = require('express');
    const session = require('express-session');

    const app = express();

    app.use(session({
      secret: CLIENT_SECRET,
      resave: false,
      saveUninitialized: true,
    }));

    app.get('', (req, res) => {
      const accessToken = tokenUser;
      req.session.accessToken = accessToken;
      res.send('Access token stored in session');
    });

  }

}
