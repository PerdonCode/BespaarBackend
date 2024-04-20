const Product = require('../models/productModel')
const Category = require('../models/categoryModel');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
          return res.status(404).json({ message: 'Product niet gevonden' });
        }
        res.json(product);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const limit = req.query.limit // Haal de limiet uit de query parameters

    let query = Product.find({ category: categoryId });
    if (limit) {
      query = query.limit(parseInt(limit)); // Beperk het aantal resultaten tot de limiet, als deze is opgegeven
    }
    const products = await query.exec();

    if (products.length === 0) {
      return res.status(404).json({ message: 'Geen producten gevonden voor deze categorie' });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Er is een probleem opgetreden bij het ophalen van de producten' });
  }
};

const createProduct = async (req, res) => {
  try {
    const categoryId = req.body.category.categoryId; // Bijwerking om de categorie-ID correct te verkrijgen
    const productData = { ...req.body };
    delete productData.category; // Verwijder de geneste "category" eigenschap, omdat de categorie-ID al is geëxtraheerd

    console.log('Received request body:', req.body);
    console.log('Received categoryId:', categoryId);

    const category = await Category.findById(categoryId);
    console.log('Retrieved category:', category);

    if (!category) {
      console.error('Category not found in the database.');
      return res.status(404).json({ message: 'Categorie niet gevonden' });
    }

    const product = await Product.create({ ...productData, category: categoryId });
    console.log('Created product:', product);

    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(400).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product niet gevonden' });
    }

    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Niet gelukt om producten te verwijderen' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { categoryId, ...productData } = req.body;
    const productId = req.params.id;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { category: categoryId, ...productData },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const filters = req.body;
    // Ensure this function is marked as async
    const filteredProducts = await executeFilterQuery(buildFilterQuery(filters, Product));

    return res.status(200).json(filteredProducts);
  } catch (error) {
    console.error('Error retrieving filtered products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const buildFilterQuery = (filter, Product) => {
  const filterGroupConditions = filter.map(buildFilterGroupConditions).filter(condition => condition !== null);

  if (filterGroupConditions.length === 0) {
    return {};
  }

  const query = { $and: filterGroupConditions };

  return query;
};

const buildFilterGroupConditions = (filterGroup) => {
  const filterGroupConditions = filterGroup.values.map(value => buildFilterCondition(value, filterGroup.groupName));

  const condition = { $or: filterGroupConditions.flat() };

  return filterGroupConditions.length > 0 ? condition : null;
};

const buildFilterCondition = (value, groupName) => {
  const condition = {
    'attributes.groupName': groupName,
    'attributes.specifications.value': Array.isArray(value) ? { $in: value } : value
  };

  return condition;
};
const executeFilterQuery = async (query) => {
  try {
    const filteredProducts = await Product.find(query).populate('category').lean();
    return filteredProducts;
  } catch (error) {
    throw error;
  }
};

const getCountOfFilteredProducts = async (req, res) => {
  try {
    const filters = req.body;
    const count = await executeCountQuery(buildCountQuery(filters, Product));

    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error retrieving count of filtered products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const buildCountQuery = (filter, Product) => {
  const filterGroupConditions = filter.map(buildFilterGroupConditions).filter(condition => condition !== null);

  if (filterGroupConditions.length === 0) {
    return {};
  }

  const query = { $and: filterGroupConditions };

  return query;
};

const executeCountQuery = async (query) => {
  try {
    const count = await Product.countDocuments(query);
    return count;
  } catch (error) {
    throw error;
  }
};


module.exports = {
    getProducts,
    getProduct,
    getProductsByCategory,
    createProduct,
    deleteProduct,
    updateProduct,
    getFilteredProducts,
    getCountOfFilteredProducts
}