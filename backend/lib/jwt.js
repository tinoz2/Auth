import jwt from 'jsonwebtoken'

const generateToken = (user, res) => {
    jwt.sign({
        id: user._id,
    }, process.env.TOKEN_JWT, {
        expiresIn: '30d',
    }, (err, token) => {
        err ? console.error(err) :
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        });        
        res.json({
            id: user._id,
            user: user.user,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    })
}

export default generateToken