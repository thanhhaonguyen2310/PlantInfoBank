import createApiClient from "./api.services";
class SpeciesService {
  constructor(baseUrl = "/api/public") {
    this.api = createApiClient(baseUrl);
  }
  
  async kmeans( data) {
    return (await this.api.post(`/kmeans`, data)).data;
  }

}
export default new SpeciesService();
