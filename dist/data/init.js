"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const books_1 = require("../books");
const sqlite3 = sqlite3_1.default.verbose();
exports.db = new sqlite3.Database("db.sqlite", (err) => {
    if (err) {
        console.log(err.message);
        throw err;
    }
    else {
        console.log("Connected to the database");
        exports.db.run(`
CREATE TABLE author(
    id INTEGER PRIMARY KEY,
    name TEXT
)
`, (dberr) => {
            if (dberr) {
                console.log("Authors' table already created.");
            }
            else {
                const insert = 'INSERT INTO author (id,name) VALUES (?,?)';
                exports.db.run(insert, [0, "Philip K. Dick"]);
                exports.db.run(insert, [1, "Frank Herbert"]);
            }
        });
        exports.db.run(`
CREATE TABLE book(
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    rating INTEGER,
    numberrating INTEGER
)
`, (dberr) => {
            if (dberr) {
                console.log("Books' table already created.");
            }
            else {
                const insert = `
INSERT INTO book (id,title, image, rating, numberrating) VALUES (?,?,?,?,?)
`;
                books_1.books.forEach(b => {
                    exports.db.run(insert, [b.id, b.title, b.image, b.rating, b.numberrating]);
                });
            }
        });
        exports.db.run(`
CREATE TABLE author_book(
    author_id INTEGER,
    book_id INTEGER,
    FOREIGN KEY(author_id) REFERENCES author(author_id),
    FOREIGN KEY(book_id) REFERENCES book(book_id)
)
`, (dberr) => {
            if (dberr) {
                console.log("Book/Author relation table already created.");
            }
            else {
                const insert = `
INSERT INTO author_book (author_id, book_id) VALUES (?,?)
`;
                exports.db.run(insert, [0, 1]);
                exports.db.run(insert, [0, 2]);
                exports.db.run(insert, [0, 3]);
                exports.db.run(insert, [0, 4]);
                exports.db.run(insert, [1, 5]);
            }
        });
    }
});
//# sourceMappingURL=init.js.map