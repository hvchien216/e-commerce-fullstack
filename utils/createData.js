const { variantProduct, brandProduct, productsInStore, categoryData } = require('./init_data');
const { VariantProduct } = require('./../models/VariantProduct');
const { Brand } = require('./../models/Brand');
const { Product } = require('../models/Product');
const { Category } = require('../models/Category');
const insertEnum = async (list, schema, colForCheck = 'name') => {
  try {
    list.map(async (item) => {
      const existedItem = await schema.findOne({ [`${colForCheck}`]: item[`${colForCheck}`] });
      if (existedItem) {
        console.log(`Enum: "${item[`${colForCheck}`]}" exists, no need to import.`)
      } else {
        await schema.create(item).then((newItem, err) => {
          if (err) {
            throw err;
          } else {
            console.log(`Enum: "${newItem._id}" is inserted.`);
          }
        });
      }
    })
  } catch (error) {
    console.error(`Error occurs: ${error}`);
  }
}

const createInitialEnums = async () => {

  try {
    const promiseVariantProduct = await insertEnum(variantProduct, VariantProduct);
    const promiseBrandProduct = await insertEnum(brandProduct, Brand);
    const promiseProductsInStore = await insertEnum(productsInStore, Product);
    const promiseCategoryData = await insertEnum(categoryData, Category, '_id');
    await Promise.all([
      // promiseVariantProduct,
      // promiseBrandProduct,
      promiseProductsInStore,
      // promiseCategoryData
    ]).then(values => {

    }, error => {
      console.error(`Error occurs: ${error}`);
    });
  } catch (error) {
    console.error(`Error occurs: ${error}`);
  }
}

module.exports = { createInitialEnums }