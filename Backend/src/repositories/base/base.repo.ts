import type { Document, Model } from "mongoose";
import type { IRead, IWrite } from "./Ibase.repo.js";

export class BaseRepository<T extends Document> implements IWrite<T>, IRead<T> {

    protected model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }

    async findById(id: string): Promise<T | null> {
        try {
            const res = await this.model.findById(id);
            return res ?? null;
        } catch (error) {
            console.error('Error in findById:', error);
            throw new Error('Error in findById');
        }
    }

    async findByEmail(email: string): Promise<T | null> {
        try {
            const res = await this.model.findOne({ email: { $regex: email, $options: "i" } });
            return res ?? null;
        } catch (error) {
            console.error('Error in findByEmail:', error);
            throw new Error('Error in findByEmail');
        }
    }

    async findByName(name: string): Promise<T | null> {
        try {
            const res = await this.model.findOne({
                name: { $regex: name, $options: "i" }
            });
            return res ?? null;
        } catch (error) {
            console.error('Error in findByEmail:', error);
            throw new Error('Error in findByEmail');
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const res = await this.model.deleteOne({ _id: id });
            return res.deletedCount > 0;
        } catch (error) {
            console.error('Error in delete:', error);
            throw new Error('Error in delete');

        }
    }

    async create(data: Partial<T>): Promise<T> {
        try {
            const newItem = new this.model(data);
            return await newItem.save()
        } catch (error) {
            console.error('Error in create:', error);
            throw new Error('Error in create');
        }
    }

}