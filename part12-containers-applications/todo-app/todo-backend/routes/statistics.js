const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

/* GET added_todos statistics. */
router.get('/', async (_, res) => {
  const addedTodos = await getAsync('added_todos') || 0;
  res.status(200).json({ added_todos: parseInt(addedTodos) });
});

module.exports = router;
