const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    imgs: [
        { type: String }
    ],
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    specs: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
        }
    ],
    attributes: [
        {
            groupName: { 
                type: String, 
                required: true 
            },
            specifications: [
                {
                    name: { 
                        type: String, 
                        required: true 
                    },
                    value:{
                        type: [String], 
                        required: true 
                    },
            }],
        }
    ],
    stores: [
        {
            name: {
                type: String, 
                required: true 
            },
            logo: {
                type: String, 
                required: true 
            },
            price: {
                type: String, 
                required: true 
            },
            link: {
                type: String, 
                required: true 
            },
            delivery: {
                type: String, 
                required: true 
            },
        }
    ],
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },    
}, { timestamps: true})

module.exports = mongoose.model('Product', productSchema);
