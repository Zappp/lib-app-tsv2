import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";

export const LibraryInstance = sequelize.define("Library", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { timestamps: false });
