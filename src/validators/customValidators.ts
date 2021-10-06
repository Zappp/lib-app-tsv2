import { CustomValidator } from "express-validator";
import { BookItemInstance } from "../models/bookItem";
import { LibraryInstance } from "../models/library";

export const libraryExists: CustomValidator = async (value) => {
  return await LibraryInstance.findByPk(value).then(library => {
    return library ? Promise.resolve() : Promise.reject("library does not exist");
  });
}

export const bookItemExists: CustomValidator = async (value) => {
  return await BookItemInstance.findByPk(value).then(bookItem => {
    return bookItem ?  Promise.reject("bookItem already exists") : Promise.resolve();
  });
}
