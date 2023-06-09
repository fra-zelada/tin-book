// Generated by https://quicktype.io

export enum Genre {
    Autoayuda = "Autoayuda",
    CienciaDivulgativa = "Ciencia divulgativa",
    CienciaFicción = "Ciencia ficción",
    Fantasía = "Fantasía",
    FicciónContemporánea = "Ficción contemporánea",
    Histórico = "Histórico",
    LiteraturaClásica = "Literatura clásica",
    MisterioThriller = "Misterio/Thriller",
    Romance = "Romance",
    YoungAdultJóvenesAdultos = "Young Adult (Jóvenes adultos)",
}

// Generated by https://quicktype.io

export interface BooksBase {
    title: string;
    img: string;
    date: string;
    author: string[];
    description?: string;
    rating?: number;
    link: string;
    link2: string;
    genre: Genre;
    isbn?: Isbn[];
}

export interface Isbn {
    type: Type;
    identifier: string;
}

export enum Type {
    Isbn10 = "ISBN_10",
    Isbn13 = "ISBN_13",
    Other = "OTHER",
}
