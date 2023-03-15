const ipRoute = require('./iproute');

import { Router } from "express";
const router = Router();

router.use('/ip', ipRoute);

export {router}