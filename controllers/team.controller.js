const Team = require("../models/team.model");

exports.getAll = async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
};

exports.getById = async (req, res) => {
  const team = await Team.findById(req.params.id);
  res.json(team);
};

exports.create = async (req, res) => {
  const newTeam = new Team(req.body);
  await newTeam.save();
  res.json(newTeam);
};

exports.update = async (req, res) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: "Team deleted ✅" });
};
