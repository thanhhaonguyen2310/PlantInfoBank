import * as speciesService from "../services/genus";

export const createGenus = async (req, res) => {
  const data = req.body;
  try {
    if (!data)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await speciesService.createGenusService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const getAllGenus = async (req, res) => {
  try {
    const respone = await speciesService.getAllGenusService();
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};

export const deleteGenus = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const response = await speciesService.deleteGenusService(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const updateGenus = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const data = req.body;
    const response = await speciesService.updateGenusService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};
//   export const getDistribution = async (req, res) => {
//     try {
//       const respone = await distributionService.getDistributionService();
//       return res.status(200).json(respone);
//     } catch (error) {
//       return res.status(500).json({
//         err: -1,
//         msg: "Failed at post controller : " + error,
//       });
//     }
//   };
