import db from '../models'
import { Op} from 'sequelize'
import { v4 } from 'uuid'



export const createSpeciesService = (data) => new Promise(async (resolve, reject) => {

    try {
        console.log(data)
        const species = await db.Species.findOne({
                where: {name: data.name},
                raw: false
            })
        if(species){
            resolve({
                    err: 1,
                    msg: 'Giống đã tồn tại'
                })
        }
       /*
       name: DataTypes.STRING,
    name_other: DataTypes.STRING,
    origin_vn: DataTypes.STRING,
    origin_en: DataTypes.STRING,
    language: DataTypes.STRING,
    provinceId: DataTypes.STRING,   
    flowering_day: DataTypes.DATE,
    replanting : DataTypes.DATE,

       */

        const response = await db.Species.build({        
                name: data?.name,
                name_other: data?.name_other,
                origin_vn: data?.origin_vn,
                origin_en: data?.origin_en,
                provinceId: data?.provinceId,
                approve: data?.approve
                // id: v4()
            
        })
        await response.save()
        resolve({
            err: 0,
            msg:'Created is successfully !' ,
        })

    } catch (error) {
        reject(error)
    }
})

export const getAllPropertyService = (id) => new Promise(async(resolve, reject) => {
    try {
        const respone = await db.DetailSpecies.findAndCountAll({
            where: {speciesId: id},
            // raw: true,
            // nest: true,
            include: [
                // {model: db.Image, as: 'images', attributes: ['image']},
                {model: db.Properties},
                {model: db.PropertiesValue}
            ],
            attributes: ['value']
        }) 
        // console.log(respone)
        resolve({
            error: respone ? 0:1,
            msg: respone? 'OK': 'Get properties fail.',
            respone
        })
    } catch (error) {
        reject(error)
    }
})