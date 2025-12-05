import { Model, Document, FilterQuery } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";
export declare abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
    private model;
    constructor(model: Model<T>);
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    findOne(condition: FilterQuery<T>): Promise<T | null>;
    find(condition?: FilterQuery<T>): Promise<T[]>;
    update(id: string, updateData: Partial<T>): Promise<T | null>;
    findWithPagination(condition: FilterQuery<T> | undefined, skip: number, limit: number): Promise<T[]>;
}
//# sourceMappingURL=base.repository.d.ts.map