import createApiClient from "./api.services";
class ProvinceService {
  constructor(baseUrl = "/api/distribution") {
    this.api = createApiClient(baseUrl);
  }
  async getProvince(id) {
    
    return (await this.api.get(`/get/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new ProvinceService();
