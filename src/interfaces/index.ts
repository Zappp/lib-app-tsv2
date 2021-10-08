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
