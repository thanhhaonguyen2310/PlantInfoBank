import * as speciesService from '../services/species'

export const createSpecies = async (req, res) => {
    const data = req.body
    try {
        if (!data) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await speciesService.createSpeciesService(data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const getAllProperty = async (req, res ) => {
    try {
        const id = req.params.id
        // console.log(req.parameter.id)
        const respone = await speciesService.getAllPropertyService(id)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}