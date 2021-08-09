export interface AuthorAttributes {
  id: string,
  name: string
}

export interface BookAttributes {
  id: string,
  title: string
}

export interface Book_has_authorAttributes { //used for model
  BookInstanceId: string,
  AuthorInstanceId: string
}

export interface Book_has_authorInterface { //used for request object
  book: BookAttributes,
  authors: AuthorAttributes[]
}
