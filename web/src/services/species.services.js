import createApiClient from "./api.services";
class SpeciesService {
  constructor(baseUrl = "/api/species") {
    this.api = createApiClient(baseUrl);
  }
  async getSpecies(id,page) {
    
    return (await this.api.get(`/all/${id}?page=${page}`)).data;
  }

  async getProperty(id) {
    return (await this.api.get(`/get/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new SpeciesService();
