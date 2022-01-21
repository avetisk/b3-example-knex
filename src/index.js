const express = require("express")
const { default: knex } = require("knex")
const morgan = require("morgan")
const knexfile = require("../knexfile")
const handleDBErrors = require("./handleDBErrors")

const app = express()

// middleware
app.use(morgan("dev"))
app.use(express.json())

const db = knex(knexfile)

// users
// CREATE
app.post("/users", async (req, res) => {
  const {
    body: { firstName, lastName, email },
  } = req

  try {
    const [user] = await db("users")
      .insert({
        firstName,
        lastName,
        email,
      })
      .returning("*")

    res.send(user)
  } catch (err) {
    const error = handleDBErrors(err)

    res.status(420).send({ error })
  }
})

// READ
// single
app.get("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req

  const [user] = await db("users").where({ id: userId })

  if (!user) {
    res.status(404).send({ error: "no such user" })

    return
  }

  res.send(user)
})

// READ
// collection
app.get("/users", async (req, res) => {
  res.send(await db("users"))
})

// UPDATE
// full
app.put("/users/:userId", async (req, res) => {
  const {
    params: { userId },
    body: { firstName, lastName, email },
  } = req

  const [user] = await db("users").where({ id: userId })

  if (!user) {
    res.status(404).send({ error: "no such user" })

    return
  }

  await db("users").delete().where({ id: userId })

  const [updatedUser] = await db("users")
    .insert({
      id: user.id,
      firstName,
      lastName,
      email,
    })
    .returning("*")

  res.send(updatedUser)
})

// UPDATE
// partial
app.patch("/users/:userId", async (req, res) => {
  const {
    params: { userId },
    body: payload,
  } = req

  const [user] = await db("users").where({ id: userId })

  if (!user) {
    res.status(404).send({ error: "no such user" })

    return
  }
  console.log(user, payload)
  const [updatedUser] = await db("users")
    .update({
      ...user,
      ...payload,
    })
    .where({ id: userId })
    .returning("*")

  res.send(updatedUser)
})

// DELETE
app.delete("/users/:userId", async (req, res) => {
  const {
    params: { userId },
  } = req

  const [user] = await db("users").where({ id: userId })

  if (!user) {
    res.status(404).send({ error: "no such user" })

    return
  }

  await db("users").delete().where({ id: userId })

  res.send()
})

app.listen(3000, () => console.log("Listening on :3000"))
