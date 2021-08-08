import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";

interface AuthorAttributes {
  id: string,
  title: string,
}

export default class AuthorInstance extends Model<AuthorAttributes> { }
AuthorInstance.init(
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
  tableName: 'author'
});
