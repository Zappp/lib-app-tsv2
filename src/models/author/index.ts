import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";

export const AuthorInstance = sequelize.define("Author", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
