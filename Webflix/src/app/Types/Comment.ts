import { User } from "./User";

export interface Comment {
    _id: string,
    text: string,
    userId: User
    movieId: string,
    created_at: string,
    updatedAt: string,
    __v: number
}    

