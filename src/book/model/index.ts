import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";

interface BookAttributes { // requeres to extend something to use, check in docs
  id: string,
  title: string,
}

const BookInstance = sequelize.define('BookInstance', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {});

export default BookInstance;
