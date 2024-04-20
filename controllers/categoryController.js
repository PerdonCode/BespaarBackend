const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const createCategory = async (req, res) => {
    try {
        const { ...categoryData } = req.body;
        const category = await Category.create({ ...categoryData });
        res.status(201).json(category);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

const updateCategory = async (req, res) => {
    try {
      const { ...categoryData } = req.body;
      const categoryId = req.params.id;
  
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { ...categoryData },
        { new: true }
      );
  
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Categorie niet gevonden' });
      }
  
      res.status(200).json(updatedCategory);

    } catch (err) {
      res.status(500).json({ error: 'Niet gelukt om categorie te updaten' });
    }
};

const deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
  
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Categorie niet gevonden' });
      }
  
      res.status(200).json(deletedCategory);
    } catch (err) {
      res.status(500).json({ error: 'Niet gelukt om categorie te verwijderen' });
    }
  };

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}