import axiosConfig from '../axiosConfig';

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/user/register',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})
export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/user/login',
            data: payload
        })
        resolve(response)

    } catch (error) {
        reject(error)
    }
})

export const apiGetUser = () =>new Promise(async(resolve, reject)=> {
    try {
        const respone = await axiosConfig({
            method: 'get',
            url: '/api/user/all',
        })
        resolve(respone)
    } catch (error) {
        reject(error)
    }
})
export const apiDeleteUser = (id) =>new Promise(async(resolve, reject)=> {
    try {
        // console.log(id)
        const respone = await axiosConfig({
            method: 'delete',
            // url: `/api/v1/menu/limit?page=${page}`,
            url: `/api/user/delete-user`,
            data: id
            
        })
        resolve(respone)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdateUser = (data) =>new Promise(async(resolve, reject)=> {
    try {
        console.log(data)
        const respone = await axiosConfig({
            method: 'put',
            // url: `/api/v1/menu/limit?page=${page}`,
            url: `/api/user/update-user`,
            data: data
            
        })
        resolve(respone)
    } catch (error) {
        reject(error)
    }
})

export const apiGetCurrent = () =>new Promise(async(resolve, reject)=> {
    try {
        const respone = await axiosConfig({
            method: 'get',
            url: '/api/user/get-current',
        })
        resolve(respone)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAllUser = () =>new Promise(async(resolve, reject)=> {
    try {
        const respone = await axiosConfig({
            method: 'get',
            url: '/api/user/all',
        })
        resolve(respone)
    } catch (error) {
        reject(error)
    }
})


// import createApiClient from "./api.services";
// class UesrService {
//   constructor(baseUrl = "/api/user") {
//     this.api = createApiClient(baseUrl);
//   }
//   async getAll() {
//     return (await this.api.get("/")).data;
//   }
//   async apiRegister(data) {
//     return (await this.api.post("/register", data)).data;
//   }
//   async apiLogin(data) {
//     return (await this.api.post("/login", data)).data;
//   }
//   async deleteAll() {
//     return (await this.api.delete("/")).data;
//   }
//   async getCurrent(id) {
//     return (await this.api.get(`/${id}`)).data;
//   }
//   async update(id, data) {
//     return (await this.api.put(`/${id}`, data)).data;
//   }
//   async delete(id) {
//     return (await this.api.delete(`/${id}`)).data;
//   }
// }
// export default new UesrService();
