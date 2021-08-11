import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import BookInstance from "./book";

export default class BookItemInstance extends Model { }
BookItemInstance.init(
  {
    isbn: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: BookInstance,
        key: 'isbn'
      }
    },
    price: {
      type: DataTypes.DECIMAL(20,2),
      allowNull: false
    }
  }, {
  sequelize,
  tableName: 'bookItem',
});
