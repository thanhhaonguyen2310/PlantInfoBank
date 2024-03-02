import * as speciesService from "../services/species";

export const createSpecies = async (req, res) => {
  const data = req.body;
  try {
    if (!data)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await speciesService.createSpeciesService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getAllProperty = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.parameter.id)
    const respone = await speciesService.getAllPropertyService(id);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
export const getIdSpecies = async (req, res) => {
  try {
    const name = req.params.id;
    // console.log(req.parameter.id)
    const respone = await speciesService.getIdSpeciesService(name);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const setApprove = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.parameter.id)
    const respone = await speciesService.setApproveService(id);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
export const getAllAddSpecies = async (req, res) => {
  try {
    const respone = await speciesService.getAllAddSpeciesService();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
export const getAddSpecies = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.parameter.id)
    const respone = await speciesService.getAddSpeciesService(id);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const getAllSpecies = async (req, res) => {
  try {
    const id = req.params.id;
    const { page } = req.query;
    // console.log(req.parameter.id)
    const respone = await speciesService.getAllSpeciesService(id, page);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const deleteSpecies = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(req.parameter.id)
    const respone = await speciesService.deleteSpeciesService();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const getAllFilterSpecies = async (req, res) => {
  try {
    // const id = req.id
    const data = req.query;

    const respone = await speciesService.getAllFilterSpeciesService({ data });
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const Kmeans = async (req, res) => {
  try {
    // const id = req.id
    const data = req.body;
    // console.log(data);
    const respone = await speciesService.KmeansService(data);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
