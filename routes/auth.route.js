import express  from "express";
import {infoUser, login, logout, refreshToken, register, updateInfo} from "../controllers/auth.controller.js";
import {loginValidator, registrationValid} from "../middleware/validation.js";
import {requireToken} from "../middleware/requireAuth.js";
import {requireRefreshToken} from "../middleware/requieRefreshToken.js";

const router = express.Router();

router.post('/login',loginValidator ,login);

router.post('/register', registrationValid, register);

router.post('/updateUser', requireToken, updateInfo);

router.get('/getUser', requireToken ,infoUser);

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/logout", logout);


export default router;