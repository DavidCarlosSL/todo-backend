import express from 'express';

import userAuthenticationRoute from './authentication/user.authentication.route';

const router = express.Router();

router.use("/authentication", userAuthenticationRoute);

export default router;