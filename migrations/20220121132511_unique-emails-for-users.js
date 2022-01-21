exports.up = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.text("email").notNullable().unique().alter()
  })
}

exports.down = async (knex) => {
  await knex.schema.alterTable("users", (table) => {
    table.dropUnique("email", "users_email_unique")
  })
}
