import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { AuthorAttributes } from "../interfaces";

export default class AuthorInstance extends Model<AuthorAttributes> { }
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
