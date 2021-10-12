import { Model, Optional } from "sequelize";

export interface AuthorAttributes {
    id: string
    name: string
}

interface BookAttributes {
    isbn: string
    title: string
}

export interface RequestBookAttributes extends BookAttributes {
    authors: AuthorAttributes[]
}

export interface RequestBookItemAttributes extends RequestBookAttributes {
    barcode: string,
    libraryId: string,
    price: number
}


export interface AccountAttributes {
    id?: string,
    username: string,
    hash: string,
    salt: string
}
interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> { }
export interface AccountInstance
    extends Model<AccountAttributes, AccountCreationAttributes>,
    AccountAttributes {
    createdAt?: Date, //check later if works if deleted
    updatedAt?: Date
}
