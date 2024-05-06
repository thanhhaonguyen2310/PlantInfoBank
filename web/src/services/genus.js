import createApiClient from "./api.services";
class ProvinceService {
  constructor(baseUrl = "/api/genus") {
    this.api = createApiClient(baseUrl);
  }
  async getProvince(id) {
    return (await this.api.get(`/get/${id}`)).data;
  }
  async getAllGenus() {
    return (await this.api.get(`/all`)).data;
  }
  async createGenus(data) {
    return (await this.api.post(`/create`, data)).data;
  }

  async update(data) {
    return (await this.api.put(`/update`, data)).data;
  }
  async delete(data) {
    return (await this.api.delete(`/delete`, { data: data })).data;
  }
}
export default new ProvinceService();
