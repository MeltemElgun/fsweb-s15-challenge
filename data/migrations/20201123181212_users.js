exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id"); // boş olunca id
      roles.string("rolename", 64).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 255).notNullable().unique();
      users.string("password", 255).notNullable();
      users
        .integer("role_id")
        .notNullable()
        .unsigned()
        .references("role_id")
        .inTable("roles")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("riddles", (riddles) => {
      riddles.string("id").notNullable().unique();
      riddles.string("bilmece").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("riddles")
    .dropTableIfExists("users")
    .dropTableIfExists("roles"); //İLİŞKİSİ AZ OLANDAN
};
