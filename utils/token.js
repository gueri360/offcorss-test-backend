import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    const expiresIn = 1000 * 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
        expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODO === "developer"),
        expires: new Date(Date.now() + expiresIn),
    });
};

export const tokenVerificationErrors = {
    "invalid signature": "JWT signature invalid",
    "jwt expired": "JWT expired",
    "invalid token": "Token its no valid",
    "No Bearer": "use  Bearer format",
    "jwt malformed": "JWT format not valid",
};