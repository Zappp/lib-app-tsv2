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
    type: DataTypes.DECIMAL(20, 2),
    allowNull: false
  }
});

BookInstance.hasMany(BookItemInstance, {onDelete: 'RESTRICT'});
BookItemInstance.belongsTo(BookInstance);
