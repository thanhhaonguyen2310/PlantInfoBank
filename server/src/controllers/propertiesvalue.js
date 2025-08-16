import * as propertiesValueService from "../services/propertiesvalue";

export const createPropertiesValue = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    if (!data)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    const response = await propertiesValueService.createPropertiesValueService(
      data
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const updateProperty = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const data = req.body;
    const response = await propertiesValueService.updatePropertyService(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        err: 1,
        msg: "Not parameters",
      });
    }
    const response = await propertiesValueService.deletePropertyService(
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

export const getAllProperties = async (req, res) => {
  try {
    const id = req.id;
    const respone = await propertiesService.getAllPropertiesService(id);
    return res.status(200).json(respone);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller : " + error,
    });
  }
};
