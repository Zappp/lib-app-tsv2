import { DataTypes, Model } from "sequelize";
import AuthorInstance from "./author";
import BookInstance from "./book";
import { sequelize } from "../config/database.config";

export default class Book_has_authorInstance extends Model { }
Book_has_authorInstance.init(
  {
    BookInstanceId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: BookInstance,
        key: 'isbn'
      }
    },
    AuthorInstanceId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: AuthorInstance,
        key: 'id'
      }
    },
  }, {
  sequelize,
  tableName: 'book_has_author'
}
);
