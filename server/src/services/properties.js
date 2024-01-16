import db from '../models'
import { Op} from 'sequelize'
import { v4 } from 'uuid'


export const createPropertiesService = (data) => new Promise(async (resolve, reject) => {

    try {
        console.log(data)
        const species = await db.Properties.findOne({
                where: {name_vn: data.name_vn},
                raw: false
            })
        if(species){
            resolve({
                    err: 1,
                    msg: 'Thuộc tính đã tồn tại'
                })
        }
       /*

       */

        const properNew = await db.Properties.build({        
                name_vn: data?.name_vn,
                name_en: data?.name_en,
        })
        // console.log(properNew)
        
        await properNew.save()
        // const properValueNew = await db.PropertiesValue.build({        
        //         properties_id: properNew[0]?.id,
        //         description: data?.description,
        //         value: data?.value,
        // })
        // await properValueNew.save()
        resolve({
            err: 0,
            msg:'Created is successfully !' ,
        })

    } catch (error) {
        reject(error)
    }
})

// export const updatePropertiesService = (data) => new Promise(async (resolve, reject) => {
//     try {
//             const properties = await db.Properties.findOne({
//                 where: {id: data.id},
//                 raw: false
//             })
//             if (!properties) {
//                 resolve({
//                     err: 1,
//                     msg: 'The user is not defined'
//                 })
//             }
           
//                 properties.id_loai= data.id_loai;
//                 properties.ten_mon= data.ten_mon;
            

//             await properties.save()
//             resolve({
//                 err: 0,
//                 msg: 'updated SUCCESS',
//             })
//         } catch (e) {
//             reject(e)
//         }
// })

export const deletePropertiesService = (id) => new Promise(async (resolve, reject) => {
    try {   
            
            const properties = await db.Properties.findOne({
                where: {id: id}
            })
            if (!properties) {
                resolve({
                    err: 2,
                    msg: 'Properties is not defined'
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

// export const getAllPropertiesService = (species_id) => new Promise(async(resolve, reject) => {
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