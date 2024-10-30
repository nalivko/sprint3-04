import { LikeModel, LikeDocument } from "../domain/like.entity";

export const likeRepository = {
    async save(like: LikeDocument) {
        await like.save()
    }
}