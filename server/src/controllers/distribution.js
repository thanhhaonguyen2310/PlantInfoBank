import * as distributionService from "../services/distribution";

export const createDistribution = async (req, res) => {
  const data = req.body;
  try {
    if (!data)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await distributionService.createDistributionService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const updateDistribution = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const data = req.body;
    const response = await distributionService.updateDistributionService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const deleteDistribution = async (req, res) => {
  console.log(req.body.id);
  try {
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const response = await distributionService.deleteDistributionService(
      req.body.id
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getAllDistribution = async (req, res) => {
  try {
    const id = req.params.id
    const respone = await distributionService.getAllDistributionService(id);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const getDistribution = async (req, res) => {
  try {
    const respone = await distributionService.getDistributionService();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
