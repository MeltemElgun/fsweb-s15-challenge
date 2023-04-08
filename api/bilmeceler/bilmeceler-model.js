const db = require("../../data/dbConfig");
const uuidv4 = require("uuidv4");

async function getAll() {
  return await db("riddles");
}

async function getById(riddles_id) {
  return await db("riddles").where("id", riddles_id).first();
}

async function insert(riddle) {
  riddle.id = uuidv4.v4();
  await db("riddles").insert(riddle);
  return getById(riddle.id);
}

module.exports = {
  getAll,
  getById,
  insert,
};
