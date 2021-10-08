import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";

export const BookInstance = sequelize.define("Book", {
    isbn: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
