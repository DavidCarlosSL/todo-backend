import express from 'express';

import { tagController } from '../../controllers/tag/tag.controller';

import { verifyUserJwt } from '../../middlewares/verify-user-jwt.middleware';

import tagRoute from "./tag/tag.route";

const router = express.Router();

router.get("/get", verifyUserJwt(), tagController.getTags.bind(tagController));

router.use("/tag", tagRoute);

export default router;