const MongoLib = require("../lib/mongo");

class CategoryService {
  constructor() {
    this.collection = "categories";
    this.mongoDB = new MongoLib();
  }

  async getCategories() {
    const categories = await this.mongoDB.getAll(this.collection);
    return categories || [];
  }

  async getCategory({ categoryId }) {
    const category = await this.mongoDB.get(this.collection, categoryId);
    return category || {};
  }

  async createCategory({ category }) {
    const createdCategory = await this.mongoDB.create(
      this.collection,
      category
    );
    return createdCategory;
  }

  async modifyCategory({ categoryId, category }) {
    const modifiedCategory = await this.mongoDB.update(
      this.collection,
      categoryId,
      category
    );

    return modifiedCategory;
  }

  async deleteCategory({ categoryId }) {
    const deletedCategory = await this.mongoDB.delete(
      this.collection,
      categoryId
    );

    return deletedCategory;
  }

  async categoryProducts({ categoryId }) {
    const products = await this.mongoDB.get("products", {
      categoryId: categoryId,
    });

    return products;
  }
}

module.exports = CategoryService;
