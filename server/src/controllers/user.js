import * as userService from '../services/user'

export const register = async (req, res) => {
    const { name, phone, password } = req.body
    console.log(req.body)
    try {
        if (!req.body) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await userService.registerService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const login = async (req, res) => {
    const { phone, password } = req.body
    console.log(req.body)
    try {
        if (!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await userService.loginService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller: ' + error
        })
    }
}

export const updateUser = async (req, res) => {  
    // console.log(req.body)
    try {
        if (!req.body.id){
            return res.status(400).json({
                err: 1,
                msg: 'Not parameters'
            })
        } 
        const data = req.body;
        const response = await userService.updateUserService(data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const deleteUser = async (req, res) => {
    // console.log(req.body.id)
    // console.log(req.id)
    try {
        if (!req.body.id){
            return res.status(400).json({
                err: 1,
                msg: 'Not parameters'
            })
        } 
        const response = await userService.deleteUserService(req.body.id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const getAllUser = async (req, res ) => {
    try {
        const respone = await userService.getAllUserService()
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}

export const getUserCurrent = async (req, res ) => {
    try {
        const {id} = req.user
        const respone = await userService.getUserCurrentService(id)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}

export const getGenus = async (req, res ) => {
    try {
        const id = req.params.id
        const respone = await userService.getGenusService(id)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}