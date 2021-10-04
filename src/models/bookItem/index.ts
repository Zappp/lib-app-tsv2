import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";
import { BookInstance } from "../book";

export const BookItemInstance = sequelize.define("BookItem", {
  barcode: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
});

BookItemInstance.belongsTo(BookInstance, {
  foreignKey: 'isbn'
});
