import { CustomValidator } from "express-validator";
import { BookInstance } from "../models/book";
import { BookItemInstance } from "../models/bookItem";
import { LibraryInstance } from "../models/library";

export const libraryExists: CustomValidator = async (libraryId) => {
  return await LibraryInstance.findByPk(libraryId).then(library => {
    if (!library) {
      return Promise.reject('library does not exist');
    }
  });
}

export const bookItemExists: CustomValidator = async (barcode) => {
  return await BookItemInstance.findByPk(barcode).then(bookItem => {
    if (bookItem) {
      return Promise.reject('bookItem already exists');
    }
  });
}

export const bookExists: CustomValidator = async (isbn) => {
  return await BookInstance.findByPk(isbn).then(book => {
    if (book) {
      return Promise.reject('book already exists');
    }
  })
}
