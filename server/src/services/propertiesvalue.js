import db from '../models'
import { Op} from 'sequelize'
import { v4 } from 'uuid'


export const createPropertiesValueService = (data) => new Promise(async (resolve, reject) => {

    try {
        const properValueNew = await db.PropertiesValue.build({        
            propertiesId: data?.propertiesId,
            option: data?.option,
            description: data?.description,
            description_en: data?.description_en,
        })
        await properValueNew.save()
        resolve({
            err: 0,
            msg:'Created is successfully !' ,
        })

    } catch (error) {
        reject(error)
    }
})

export const updatePropertiesValueService = (data) => new Promise(async (resolve, reject) => {
    try {
            const properties = await db.PropertiesValue.findOne({
                where: {id: data.id},
                raw: false
            })
            if (!properties) {
                resolve({
                    err: 1,
                    msg: 'The user is not defined'
                })
            }
           
                properties.propertiesId= data?.propertiesId;
                properties.description = data?.description;
                properties.option= data?.option,
                properties.description_en= data?.description_en,
            

            await properties.save()
            resolve({
                err: 0,
                msg: 'updated SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
})

export const deletePropertiesValueService = (id) => new Promise(async (resolve, reject) => {
    try {   
            
            const properties = await db.PropertiesValue.findOne({
                where: {id: id}
            })
            if (!properties) {
                resolve({
                    err: 2,
                    msg: 'PropertiesValue is not defined'
                })
            }

            await properties.destroy();
            
            resolve({
                err: 0,
                msg: 'deleted SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
})

// export const getAllPropertiesService = (speciesId) => new Promise(async(resolve, reject) => {
//     try {
//         const respone = await db.Mon_an.findOne({
//             where: {id: id},
//             raw: true,
//             nest: true,
//             include: [
//                 // {model: db.Image, as: 'images', attributes: ['image']},
//                 {model: db.Loai_mon, as: 'loai', attributes: ['ten_loai']},
//             ],
//             attributes: ['id', 'ten_mon','anh_mon','gia','mo_ta']
//         }) 
//         // console.log(respone)
//         resolve({
//             error: respone ? 0:1,
//             msg: respone? 'OK': 'Get post fail.',
//             respone
//         })
//     } catch (error) {
//         reject(error)
//     }
// })