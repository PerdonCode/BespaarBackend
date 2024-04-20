const News = require("../models/NewsModel")
const mongoose = require('mongoose');

// Functie om alle nieuwsartikelen op te halen
const getAllNews = async (req, res) => {
    try {
      const allNews = await News.find();
      res.json(allNews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Functie om een nieuw nieuwsartikel te maken
  const createNews = async (req, res) => {
    const { img, title, text, category } = req.body;
  
    const newNewsArticle = new News({
      img,
      title,
      text,
      category,
    });
  
    try {
      const savedNewsArticle = await newNewsArticle.save();
      res.status(201).json(savedNewsArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
    
  const getNewsByCategory = async (req, res) => {
    const category = req.params.category;
    console.log('category is', category);  // Check if this log is displayed
  
    try {
      const newsByCategory = await News.find({ category });
      res.json(newsByCategory);
    } catch (error) {
      console.error('Error fetching news by category:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Functie om een nieuwsartikel bij te werken
  const updateNews = async (req, res) => {
    const { img, title, text, category } = req.body;
  
    try {
      const updatedNewsArticle = await News.findByIdAndUpdate(
        req.params.id,
        { img, title, text, category },
        { new: true }
      );
  
      res.json(updatedNewsArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Functie om een nieuwsartikel te verwijderen
  const deleteNews = async (req, res) => {
    try {
      const deletedNewsArticle = await News.findByIdAndDelete(req.params.id);
      res.json(deletedNewsArticle);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAllNews,
    createNews,
    getNewsByCategory,
    updateNews,
    deleteNews,
  };