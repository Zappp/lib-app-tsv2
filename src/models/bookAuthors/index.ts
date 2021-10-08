import { BookInstance } from "../book";
import { AuthorInstance } from "../author";
import { sequelize } from "../../config/database.config";

export const BookAuthorsInstance = sequelize.define("BookAuthors", {});

BookInstance.belongsToMany(AuthorInstance, { through: 'BookAuthors' });
AuthorInstance.belongsToMany(BookInstance, { through: 'BookAuthors' });
