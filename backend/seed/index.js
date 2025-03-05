const mongoose = require('mongoose');
const Category = require('../models/category.model');
const fs = require('fs');

const seedData = async () => {
    try {
        const categoryData = fs.readFileSync('seed/json_data/category.json', 'utf8');
        const parsedData = JSON.parse(categoryData);

        for (const item of parsedData) {
            const existingRecord = await Category.findOne({ name: item.name });

            if (!existingRecord) {
                await Category.create(item);
            }
        }
    } catch (err) {
        console.error('Error processing data:', err);
    }
};

module.exports = { seedData };
