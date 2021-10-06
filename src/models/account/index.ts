import { DataTypes } from "sequelize/types";
import { sequelize } from "../../config/database.config";

export const AccountInstance = sequelize.define("Account", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
