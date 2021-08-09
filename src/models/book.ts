import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { BookAttributes } from "../interfaces";

export default class BookInstance extends Model<BookAttributes> { }
BookInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
  sequelize,
  tableName: 'book'
});
