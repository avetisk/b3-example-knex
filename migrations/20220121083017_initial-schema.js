exports.up = async (knex) => {
  await knex.schema.createTable("clients", (table) => {
    table.increments("id")
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("email").notNullable().unique()
    table.date("birthdate").notNullable()
    table.text("birthplace").notNullable()
    table.text("addressLine1").notNullable()
    table.text("addressLine2")
    table.text("city").notNullable()
    table.text("zipcode").notNullable()
    table.text("country").notNullable()
    table.text("phone").notNullable().unique()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
  })
  await knex.schema.createTable("accounts", (table) => {
    table.increments("id")
    table.text("iban").notNullable().unique()
    table.text("currency").notNullable()
    table.integer("clientId").notNullable()
    table.foreign("clientId").references("id").inTable("clients")
  })
  await knex.schema.createTable("creditCards", (table) => {
    table.increments("id")
    table.text("number").notNullable().unique()
    table.text("cvc").notNullable()
    table.integer("accountId").notNullable()
    table.foreign("accountId").references("id").inTable("accounts")
  })
  await knex.schema.createTable("transactions", (table) => {
    table.increments("id")
    table.text("label").notNullable()
    table.integer("amount").notNullable()
    table.integer("creditCardId").notNullable()
    table.foreign("creditCardId").references("id").inTable("creditCards")
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable("transactions")
  await knex.schema.dropTable("creditCards")
  await knex.schema.dropTable("accounts")
  await knex.schema.dropTable("clients")
}
