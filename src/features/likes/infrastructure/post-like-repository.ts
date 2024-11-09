import { PostLikeDocument } from "../domain/post.like.entity";

export const postLikeRepository = {
    async save(like: PostLikeDocument) {
        await like.save()
    }
}