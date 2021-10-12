import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.config";
import { AccountInstance } from "../../interfaces";

const account = sequelize.define<AccountInstance>("Account", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default account;
