import { Movie } from "./Movie";

export interface User {
    imageUrl: string,
    movies: Movie[],
    _id: string,
    age: number,
    email: string,
    username: string,
    created_at: string,
    updatedAt: string
}
