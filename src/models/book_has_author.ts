import { DataTypes, Model } from "sequelize";
import AuthorInstance from "./author";
import BookInstance from "./book";
import { sequelize } from "../config/database.config";

export default class Book_has_authorInstance extends Model {
  public BookInstanceId!: string
  public AuthorInstanceId!: string
 }
Book_has_authorInstance.init(
  {
    BookInstanceId: {
      type: DataTypes.UUIDV4,
      references: {
        model: BookInstance,
        key: 'id'
      }
    },
    AuthorInstanceId: {
      type: DataTypes.UUIDV4,
      references: {
        model: AuthorInstance,
        key: 'id'
      }
    }
  }, {
  sequelize,
  tableName: 'book_has_author'
}
);

BookInstance.belongsToMany(AuthorInstance, { through: Book_has_authorInstance });
AuthorInstance.belongsToMany(BookInstance, { through: Book_has_authorInstance });
