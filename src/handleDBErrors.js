const handleDBErrors = (err) => {
  return err.code === "23505"
    ? {
        type: "unique_violation",
        target: err.constraint,
      }
    : { type: "unknown" }
}

module.exports = handleDBErrors
