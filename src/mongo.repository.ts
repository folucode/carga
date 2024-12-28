import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  mongo,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export abstract class MongoRepository<ModelClass> {
  private modelClass: Model<ModelClass>;

  constructor(modelClass: Model<ModelClass>) {
    this.modelClass = modelClass;
  }

  async findOne(
    filter: FilterQuery<ModelClass>,
    projection?: ProjectionType<ModelClass>,
    options?: QueryOptions<ModelClass>,
  ): Promise<ModelClass | null> {
    try {
      return await this.modelClass.findOne(filter, projection, options);
    } catch (error) {
      throw new Error(`Error finding document: ${error.message}`);
    }
  }

  async findById(
    id: string,
    projection?: ProjectionType<ModelClass>,
    options?: QueryOptions<ModelClass>,
  ): Promise<ModelClass | null> {
    try {
      return await this.modelClass.findById(id, projection, options);
    } catch (error) {
      throw new Error(`Error finding document by ID: ${error.message}`);
    }
  }

  async findMany(
    filter: FilterQuery<ModelClass>,
    projection?: ProjectionType<ModelClass>,
    options?: QueryOptions<ModelClass>,
    limit = 10,
    skip = 0,
  ): Promise<ModelClass[]> {
    try {
      return await this.modelClass
        .find(filter, projection, options)
        .limit(limit)
        .skip(skip);
    } catch (error) {
      throw new Error(`Error finding documents: ${error.message}`);
    }
  }

  async count(filter: FilterQuery<ModelClass>): Promise<number> {
    try {
      return await this.modelClass.countDocuments(filter);
    } catch (error) {
      throw new Error(`Error counting documents: ${error.message}`);
    }
  }

  async create(doc: Partial<ModelClass>): Promise<ModelClass> {
    try {
      return await this.modelClass.create(doc);
    } catch (error) {
      throw new Error(`Error creating document: ${error.message}`);
    }
  }

  async createMany(docs: Partial<ModelClass>[]): Promise<ModelClass[]> {
    try {
      const result = await this.modelClass.insertMany(docs);
      return result as ModelClass[]; // Cast the result to ModelClass[]
    } catch (error) {
      throw new Error(`Error creating multiple documents: ${error.message}`);
    }
  }

  async updateOne(
    filter: FilterQuery<ModelClass>,
    update: UpdateQuery<ModelClass>,
    options?: QueryOptions<ModelClass>,
  ): Promise<ModelClass | null> {
    try {
      return await this.modelClass.findOneAndUpdate(filter, update, {
        ...options,
        new: true,
      });
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async updateMany(
    filter: FilterQuery<ModelClass>,
    update: UpdateQuery<ModelClass>,
    options?: mongo.UpdateOptions,
  ): Promise<number> {
    try {
      const result = await this.modelClass.updateMany(filter, update, options);
      return result.modifiedCount;
    } catch (error) {
      throw new Error(`Error updating multiple documents: ${error.message}`);
    }
  }

  async deleteOne(filter: FilterQuery<ModelClass>): Promise<void> {
    try {
      await this.modelClass.deleteOne(filter);
    } catch (error) {
      throw new Error(`Error deleting document: ${error.message}`);
    }
  }

  async deleteMany(filter: FilterQuery<ModelClass>): Promise<number> {
    try {
      const result = await this.modelClass.deleteMany(filter);
      return result.deletedCount || 0;
    } catch (error) {
      throw new Error(`Error deleting multiple documents: ${error.message}`);
    }
  }

  async softDelete(id: string): Promise<ModelClass> {
    try {
      return this.modelClass.findByIdAndUpdate(id, { $set: { deleted: true } });
    } catch (error) {
      throw new Error(`Error soft deleting document: ${error.message}`);
    }
  }

  async aggregate(pipeline: any[]): Promise<any[]> {
    try {
      return await this.modelClass.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Error aggregating documents: ${error.message}`);
    }
  }

  async replaceOne(
    filter: FilterQuery<ModelClass>,
    replacement: ModelClass,
    options?: QueryOptions<ModelClass>,
  ): Promise<ModelClass | null> {
    try {
      return await this.modelClass.findOneAndReplace(filter, replacement, {
        ...options,
        new: true,
      });
    } catch (error) {
      throw new Error(`Error replacing document: ${error.message}`);
    }
  }

  async exists(filter: FilterQuery<ModelClass>): Promise<boolean> {
    try {
      const result = await this.modelClass.exists(filter);
      return !!result;
    } catch (error) {
      throw new Error(`Error checking document existence: ${error.message}`);
    }
  }
}
