import createApiClient from "./api.services";
class PropertiesService {
  constructor(baseUrl = "/api/properties") {
    this.api = createApiClient(baseUrl);
  }
  async createProperty(data) {
    return (await this.api.post("/create", data)).data;
  }
  async getProperties(id) {
    return (await this.api.get(`/all/${id}`)).data;
  }
  async getPropertyID(id) {
    return (await this.api.get(`/get/${id}`)).data;
  }
  async getPropertiesGenus(id) {
    return (await this.api.get(`/genus/${id}`)).data;
  }
  async getPropertyColumn(data) {
    return (await this.api.post("/column", data)).data;
  }
  async addSpecies(id, data) {
    return (await this.api.post(`/add/${id}`, data)).data;
  }
  async addSpeciesExcel(id, data) {
    return (await this.api.post(`/add/excel/${id}`, data)).data;
  }
  async update(data) {
    return (await this.api.put(`/update`, data)).data;
  }
  async delete(data) {
    return (await this.api.delete(`/delete`, { data: data })).data;
  }
}
export default new PropertiesService();
