const Board = require("../models/board.model");

exports.getAll = async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
};

exports.getById = async (req, res) => {
  const board = await Board.findById(req.params.id);
  res.json(board);
};

exports.create = async (req, res) => {
  const newBoard = new Board(req.body);
  await newBoard.save();
  res.json(newBoard);
};

exports.update = async (req, res) => {
  const updated = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json({ message: "Board deleted ✅" });
};
