import { Comment } from "./Comment"

export interface Movie {
    comments: Comment[],
    _id: string,
    title: string,
    director: string,
    genre: string,
    year: number,
    imageUrl: string,
    plot: string,
    ownerId: string,
    created_at: string,
    updatedAt: string,
    __v: number
} 
