import { sequelize } from "../../config/database.config";
import { AccountInstance } from "../account";

export const MemberInstance = sequelize.define("Member", {});

AccountInstance.hasOne(MemberInstance);
MemberInstance.belongsTo(AccountInstance);
