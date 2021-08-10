interface AuthorAttributes {
  id: string,
  name: string
}

interface BookAttributes {
  id: string,
  title: string
}

export interface Book_has_authorAttributes { 
  book: BookAttributes,
  authors: AuthorAttributes[]
}
