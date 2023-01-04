const Role = require("../models/Role");
const checkaccess = require("../middleware/checkuseraccess");

exports.deleterole = async (req, res) => {
  const access = await checkaccess(req.user.id, "roles", "del");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    await Role.findOneAndDelete({ name: req.body.data });
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Getting roles",
    });
  }
};

exports.getroles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({
      status: "success",
      roles,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Getting roles",
    });
  }
};

exports.editrole = async (req, res) => {
  const access = await checkaccess(req.user.id, "roles", "edit");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    console.log(req.body);
    await Role.findOneAndUpdate(
      { name: req.body.nameid },
      { name: req.body.role }
    );
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.getarole = async (req, res) => {
  try {
    console.log(req.body);
    const role = await Role.find(
      { name: req.body.role },
      { _id: 0, id: 0, name: 0, __v: 0 }
    );
    console.log(role);

    res.status(200).json({
      status: "success",
      role,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Getting roles",
    });
  }
};

exports.addnewrole = async (req, res) => {
  const access = await checkaccess(req.user.id, "roles", "create");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    console.log(req.body);
    const newrole = await Role.create(req.body);
    res.status(200).json({
      status: "success",
      newrole,
    });
  } catch (error) {
    res.status(404).json({
      errors: "Error Creating role",
    });
  }
};

exports.updateroleaccess = async (req, res) => {
  const access = await checkaccess(req.user.id, "roles", "edit");
  if (!access) {
    return res.status(422).json({
      errors: "You dont have access for this request",
    });
  }
  try {
    //console.log(req.body);
    const data = req.body.modify;
    const access = req.body.access;
    const role = await Role.findOne({ name: req.body.name });

    //console.log("before", role);
    role[access] = data.access;
    await role.save();
    //console.log("after", role);
    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      errors: "Error Editing role",
    });
  }
};
