import express from "express";

import nodeFetch from "node-fetch"
import {getAll, getProductByname} from "../controllers/vtexApi.controller.js";
import {requireToken} from "../middleware/requireAuth.js";

const router = express.Router();


router.get('/product/:productName', requireToken,getAll);

router.get('/product', requireToken,getProductByname);

export default router;