import jwt from 'jsonwebtoken'

const verifyToken = (req,res ,next) =>{
    let accessToken = req.headers.authorization?.split(' ')[1]
    // console.log(accessToken)
    //kiem tra
    if(!accessToken) return res.status(401).json({
        err:1,
        msg: 'Mising access token'
    })

    jwt.verify(accessToken,process.env.SECRET_KEY, (err, user) => {
        if(err)  return res.status(401).json({
                err:1,
                msg: 'token hết hạn'
         })

         req.user = user
         next()
    })
}

export default verifyToken