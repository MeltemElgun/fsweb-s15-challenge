/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const defRiddles = require("../../api/bilmeceler/bilmeceler-data");
const defRoles = [{ rolename: "admin" }, { rolename: "user" }];

const defUsers = [
  {
    username: "meltem",
    password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    role_id: 1,
  },
  {
    username: "meltem2",
    password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
    role_id: 2,
  },
];

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("riddles").truncate();
  await knex("users").truncate();
  await knex("roles").truncate();

  await knex("riddles").insert(defRiddles); //önce az ilişkili olan tablo
  await knex("roles").insert(defRoles);
  await knex("users").insert(defUsers);
};
