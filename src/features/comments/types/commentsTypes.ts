export type CommentInputModel = {
    content: string,
}

export type CommentViewModel = {
    id: string,
    content: string,
    commentatorInfo: CommentatorInfo,
    createdAt: string,
    likesInfo?: LikesInfo
}

type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type LikesInfo = {
    likesCount: number,
    dislikesCount: number,
    myStatus: string
}

export type PostCommentsType = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items: Array<CommentViewModel>
}