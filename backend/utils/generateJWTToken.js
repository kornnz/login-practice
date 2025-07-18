import jwt from 'jsonwebtoken'

export const generateJWTToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.cookie('token', token, {
        httpOnly: true,                                 // cookie cannot accessed by client script
        secure: process.env.NODE_ENV === 'production',  // cookie will only be set on https
        sameSite: 'strict',                             // cookie will only be set on th same site
        maxAge: 7 * 24 * 60 * 60 * 100                  // 7days
    })

    return token
}