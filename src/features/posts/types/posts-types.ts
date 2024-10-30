import { ObjectId } from "mongodb"

export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
}

export type PostViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string
    createdAt: string
}

export type PostDbType = {
  _id?: ObjectId,
  title: string,
  shortDescription: string,
  content: string,
  blogId: ObjectId,
  blogName: string,
  createdAt: string
}

// export type BlogsViewCollectionModel = {
//     pagesCount: number,
//     page: number,
//     pageSize: number,
//     totalCount: number,
//     items: Array<PostViewModel>
//   }