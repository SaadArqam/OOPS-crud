"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendee = exports.AttendeeMongooseModel = void 0;
const mongoose_1 = require("mongoose");
const AttendeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
});
exports.AttendeeMongooseModel = (0, mongoose_1.model)("Attendee", AttendeeSchema);
class Attendee {
    constructor(name, email, id) {
        this._name = name;
        this._email = email;
        if (id)
            this._id = id;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
}
exports.Attendee = Attendee;
exports.default = Attendee;
