export type LikeInputModel = {
    likeStatus: "None" | "Like" | "Dislike"
}

export type LikePostInputModel = {
    likeStatus: "None" | "Like" | "Dislike"
}

export type LikeDataType = {
    status: "None" | "Like" | "Dislike",
    authorId: string,
    commentId: string
}

export type PostLikeDataType = {
    status: "None" | "Like" | "Dislike",
    authorId: string,
    postId: string
}

export type LikeDbType = {
    createdAt: string,
    status: "None" | "Like" | "Dislike",
    authorId: string,
    commentId: string
}

export type PostLikeDbType = {
    createdAt: string,
    status: "None" | "Like" | "Dislike",
    authorId: string,
    postId: string
}