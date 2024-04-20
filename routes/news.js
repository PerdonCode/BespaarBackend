// newsRoutes.js
const express = require('express');
const {
  getAllNews,
  createNews,
  getNewsByCategory,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');

const router = express.Router();

// Route to get all news articles
router.get('/', getAllNews);

// Route to create a new news article
router.post('/', createNews);

// Route to get news by category
router.get('/category/:category', getNewsByCategory);

// Route to update a news article
router.put('/news/:id', updateNews);

// Route to delete a news article
router.delete('/news/:id', deleteNews);

module.exports = router;
