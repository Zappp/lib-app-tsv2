import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

export default class AuthorInstance extends Model { }
AuthorInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
  sequelize,
  tableName: 'author'
});
