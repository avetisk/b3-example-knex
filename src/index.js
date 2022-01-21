const express = require("express")
const { default: knex } = require("knex")
const morgan = require("morgan")
const knexfile = require("../knexfile")
const transactionsRoutes = require("./routes/clients/accounts/creditCards/transactions")

const app = express()

// middleware
app.use(morgan("dev"))
app.use(express.json())

const db = knex(knexfile)

transactionsRoutes({ app, db })

// /clients/:clientId/accounts/:accountId

app.listen(3000, () => console.log("Listening on :3000"))
