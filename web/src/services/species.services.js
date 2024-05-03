import createApiClient from "./api.services";
class SpeciesService {
  constructor(baseUrl = "/api/species") {
    this.api = createApiClient(baseUrl);
  }
  async getAllSpecies() {
    return (await this.api.get(`/species`)).data;
  }
  async getSpecies(id, page) {
    return (await this.api.get(`/all/${id}?page=${page}`)).data;
  }
  async getFilterSpecies(datafilter) {
    return (await this.api.get("/filter", { params: { data: datafilter } }))
      .data;
  }
  async getProperty(id) {
    return (await this.api.get(`/get/${id}`)).data;
  }
  async getIdSpecies(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getAddSpecies(id) {
    return (await this.api.get(`/get-addspecies/${id}`)).data;
  }
  async getAllAddSpecies(id) {
    return (await this.api.get(`/get-addspecies/all/${id}`)).data;
  }
  async setApprove(id, data) {
    // console.log(data)
    return (await this.api.post(`/${id}`, data)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new SpeciesService();
