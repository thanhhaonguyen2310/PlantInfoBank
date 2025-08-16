import createApiClient from "./api.services";
class PropertiesService {
  constructor(baseUrl = "/api/propertiesvalue") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post("/create", data)).data;
  }
  async update(data) {
    return (await this.api.put(`/update`, data)).data;
  }
  async delete(data) {
    return (await this.api.delete(`/delete`, { data: data })).data;
  }
}
export default new PropertiesService();
