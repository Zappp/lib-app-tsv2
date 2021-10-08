import { sequelize } from "../../config/database.config";
import { AuthorInstance } from "../author";
import { BookInstance } from "../book";

export const BookHasAuthorsInstance = sequelize.define("BookHasAuthors", {});

BookInstance.belongsToMany(AuthorInstance, { through: 'BookHasAuthors' });
AuthorInstance.belongsToMany(BookInstance, { through: 'BookHasAuthors' });
