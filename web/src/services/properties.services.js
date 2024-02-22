import createApiClient from "./api.services";
class PropertiesService {
  constructor(baseUrl = "/api/properties") {
    this.api = createApiClient(baseUrl);
  }
  async getProperties(id) {
    
    return (await this.api.get(`/all/${id}`)).data;
  }
  async addSpecies(id, data) {
    return (await this.api.post(`/add/${id}`, data)).data;
  }
  async addSpeciesExcel(id,data) {
    return (await this.api.post(`/add/excel/${id}`, data)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new PropertiesService();
