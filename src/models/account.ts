import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

export default class AccountInstance extends Model { }
AccountInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
  sequelize,
  tableName: 'account'
});
