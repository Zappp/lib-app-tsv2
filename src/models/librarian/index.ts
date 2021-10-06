import { sequelize } from "../../config/database.config";
import { AccountInstance } from "../account";

export const LibrarianInstance = sequelize.define("Librarian", {});

AccountInstance.hasOne(LibrarianInstance);
LibrarianInstance.belongsTo(AccountInstance);
