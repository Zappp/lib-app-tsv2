import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.config";

interface BookAttributes {
  id: string,
  title: string,
}

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
