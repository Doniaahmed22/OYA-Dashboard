import { UserComment } from "./user-comment";

export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: UserComment;
}
