import jwt from 'jsonwebtoken'

const verifyToken = (req,res ,next) =>{
    let accessToken = req.headers.authorization?.split(' ')[1]
    // console.log(req.headers.authorization)
    // console.log(process.env.SECRET_KEY)
    //kiem tra
    
    if(!accessToken) return res.status(401).json({
        err:1,
        msg: 'Mising access token'
    })

    jwt.verify(accessToken,process.env.SECRET_KEY, (err, user) => {
        // console.log(err)
        if(err)  return res.status(401).json({
                err:1,
                msg: 'token hết hạn'
         })


         req.user = user
         next()
    })
}

export default verifyToken