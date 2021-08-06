import { DataTypes, Model, Sequelize } from "sequelize";
import { sequalize } from "../config/database.config";

interface BookAttributes {
  isbn: string,
  title: string,
  completed: boolean
}

export const BookInstance = sequalize.define('BookInstance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {});
