const transactionsRoutes = ({ app, db }) => {
  app.get(
    "/clients/:clientId/accounts/:accountId/creditCards/:creditCardId/transactions/:transactionId",
    async (req, res) => {
      const {
        params: { clientId, accountId, creditCardId, transactionId },
      } = req

      const [transaction] = await db("transactions")
        .select("transactions.*", "accounts.iban", "clients.firstName")
        .innerJoin("creditCards", "creditCards.id", "transactions.creditCardId")
        .innerJoin("accounts", "accounts.id", "creditCards.accountId")
        .innerJoin("clients", "clients.id", "accounts.clientId")
        .where({
          "transactions.id": transactionId,
          "creditCards.id": creditCardId,
          "accounts.id": accountId,
          "clients.id": clientId,
        })

      res.send(transaction)
    }
  )
}

module.exports = transactionsRoutes
