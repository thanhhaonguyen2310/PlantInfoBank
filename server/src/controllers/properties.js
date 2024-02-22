import * as propertiesService from '../services/properties'

export const createProperties = async (req, res) => {
    const data = req.body
    try {
        if (!data) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await propertiesService.createPropertiesService(data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const addSpeciesExcel = async (req, res) => {
    const data = req.body
    const id = req.params
    try {
        if (!data) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await propertiesService.addSpeciesExcelService(id,data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const addSpecies = async (req, res) => {
    const data = req.body
    const id = req.params
    try {
        if (!data) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs !'
        })
        const response = await propertiesService.addSpeciesService(id,data)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

// export const updateProperties = async (req, res) => {  
//     try {
//         if (!req.body.id){
//             return res.status(400).json({
//                 err: 1,
//                 msg: 'Not parameters'
//             })
//         } 
//         const data = req.body;
//         const response = await propertiesService.updatePropertiesService(data)
//         return res.status(200).json(response)

//     } catch (error) {
//         return res.status(500).json({
//             err: -1,
//             msg: 'Fail at auth controller: ' + error
//         })
//     }
// }

export const deleteProperties = async (req, res) => {
    console.log(req.body.id)
    try {
        if (!req.body.id){
            return res.status(400).json({
                err: 1,
                msg: 'Not parameters'
            })
        } 
        const response = await propertiesService.deletePropertiesService(req.body.id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

 export const getProperty = async (req, res ) => {
    try {
        const id = req.params.id
        const respone = await propertiesService.getPropertyService(id)
        return res.status(200).json(respone)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Failed at post controller : ' + error,
        })
    }
}