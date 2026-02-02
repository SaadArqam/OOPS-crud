"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepository = void 0;
const book_schema_1 = require("../schema/book.schema");
class BookRepository {
    async create(data) {
        const book = new book_schema_1.BookModel(data);
        return await book.save();
    }
    async findById(id) {
        return await book_schema_1.BookModel.findById(id);
    }
    async findAll(query) {
        const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", search, genre, inStock, minPrice, maxPrice, } = query;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
            ];
        }
        if (genre) {
            filter.genre = genre;
        }
        if (typeof inStock === "boolean") {
            filter.inStock = inStock;
        }
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) {
                filter.price.$gte = minPrice;
            }
            if (maxPrice !== undefined) {
                filter.price.$lte = maxPrice;
            }
        }
        const sort = {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            book_schema_1.BookModel.find(filter).sort(sort).skip(skip).limit(limit),
            book_schema_1.BookModel.countDocuments(filter),
        ]);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async update(id, data) {
        return await book_schema_1.BookModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    async delete(id) {
        return await book_schema_1.BookModel.findByIdAndDelete(id);
    }
}
exports.BookRepository = BookRepository;
