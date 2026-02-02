"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_repository_1 = require("../repositories/book.repository");
class BookService {
    constructor(repository = new book_repository_1.BookRepository()) {
        this.repository = repository;
    }
    async createBook(data) {
        this.validateCreateData(data);
        return await this.repository.create(data);
    }
    async getBookById(id) {
        return await this.repository.findById(id);
    }
    async listBooks(query) {
        return await this.repository.findAll(query);
    }
    async updateBook(id, data) {
        this.validateUpdateData(data);
        return await this.repository.update(id, data);
    }
    async deleteBook(id) {
        return await this.repository.delete(id);
    }
    validateCreateData(data) {
        if (!data.title || !data.author) {
            throw new Error("title and author are required");
        }
        if (data.publishedYear === undefined || data.publishedYear === null) {
            throw new Error("publishedYear is required");
        }
        if (typeof data.publishedYear !== "number") {
            throw new Error("publishedYear must be a number");
        }
        if (data.price !== undefined && typeof data.price !== "number") {
            throw new Error("price must be a number");
        }
    }
    validateUpdateData(data) {
        if (data.publishedYear !== undefined &&
            typeof data.publishedYear !== "number") {
            throw new Error("publishedYear must be a number");
        }
        if (data.price !== undefined && typeof data.price !== "number") {
            throw new Error("price must be a number");
        }
    }
}
exports.BookService = BookService;
