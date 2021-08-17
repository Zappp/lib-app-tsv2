import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import AccountInstance from './account';

export default class LibrarianInstance extends Model { }
LibrarianInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      references: {
        model: AccountInstance,
        key: 'id'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
  sequelize,
  tableName: 'account'
});
