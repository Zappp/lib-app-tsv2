import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";

export default class BookInstance extends Model { }
BookInstance.init(
  {
    isbn: {
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
