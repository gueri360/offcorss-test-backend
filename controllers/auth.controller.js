import {User} from "../models/User.js";
import {generateRefreshToken, generateToken} from "../utils/token.js";

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        let userToLogin = await User.findOne({email})
        if(!userToLogin) return res.status(403).json({error: 'user doesn\'t exist'})

        const passwordMatch = await userToLogin.comparePassword(password);
        if(!passwordMatch){
            return res.status(403).json({message: 'wrong credential'});
        }

        //Generate web token
        const { token, expiresIn } = generateToken(userToLogin.id);
        generateRefreshToken(userToLogin.id, res);

        return res.json({ token, expiresIn });
    }catch (error) {
        console.log(error);
        return res.status(500).json({error: 'something went wrong'})
    }
};

export const register = async (req, res) => {
    const user = req.body;
    try {
        //valid before save
        let userToRegister = await User.findOne({"email": user.email})
        if(userToRegister) throw {code: 11000, message: 'user already exist'}

        userToRegister = new User(user);

        await userToRegister.save();

        //jwt token
        const {token, expiresIn} = generateToken(userToRegister.id);
        generateRefreshToken(userToRegister.id, res)

        return res.json({token, expiresIn})

    } catch (error){
            return res.status(403).json({error: error.message})
    }
};

export const infoUser = async (req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({user}) //mover
    } catch (error) {
        return res.status(403).json({error: error.message})
    }
}

export const updateInfo = async (req, res) => {
    try {
        let updateUser = await User.findByIdAndUpdate(req.uid, {
            email: req.body.email,
            userName: req.body.userName,
            lastName: req.body.lastName,
            userType: req.body.userType,
            refid: req.body.refid,
        })
        return res.json({message: 'user updated'}) //mover
    } catch (error) {
        return res.status(403).json({error: error.message})
    }
}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "error de server" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ ok: true });
};