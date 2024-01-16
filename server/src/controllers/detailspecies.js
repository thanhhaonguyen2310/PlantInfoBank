import * as detailspeciesService from '../services/detailspecies'

export const createDetailspecies = async (req, res) => {
    const data = req.body
    try {
        if (!data) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await detailspeciesService.createDetailspeciesService(data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const updateDetailSpecies = async (req, res) => {  
    try {
        if (!req.body.id){
            return res.status(400).json({
                err: 1,
                msg: 'Not parameters'
            })
        } 
        const data = req.body;
        const response = await detailspeciesService.updateDetailSpeciesService(data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const deleteDetailSpecies = async (req, res) => {
    console.log(req.body.id)
    try {
        if (!req.body.id){
            return res.status(400).json({
                err: 1,
                msg: 'Not parameters'
            })
        } 
        const response = await detailspeciesService.deleteDetailSpeciesService(req.body.id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

 export const getAllDetailSpecies = async (req, res ) => {
    try {
        // const id = req.id
        const respone = await detailspeciesService.getAllDetailSpeciesService()
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}