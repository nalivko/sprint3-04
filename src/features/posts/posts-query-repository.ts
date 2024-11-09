import { PostDbType } from "./types/posts-types"
import { BlogDbType } from "../../db/blog-db-type"
import { postsRepository } from "./posts-db-repository"
import { postsCollection } from "../../db/mongodb"
import { postsQueryParamsType } from "../../helpers/helper"
import { ObjectId } from "mongodb"
import { BlogModelClass } from "../blogs/domain/blog.entity"
import { BlogViewModel } from "../blogs/types/blogs-types"

export const postsQueryRepository = {

    async findPosts(queryParams: postsQueryParamsType, blogId?: string) {
        const filter = blogId ? {blogId: new ObjectId(blogId)} : {}

        const items = await postsCollection
            .find(filter)
            .sort(queryParams.sortBy, queryParams.sortDirection)
            .skip((queryParams.pageNumber - 1) * queryParams.pageSize)
            .limit(queryParams.pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / queryParams.pageSize),
            page: queryParams.pageNumber,
            pageSize: queryParams.pageSize,
            totalCount,
            items: items.map(postsRepository.mapPost)
        }
    },

    async getBlogById(id: string): Promise<BlogViewModel | null> {
        let blog = await BlogModelClass.findOne({ _id: id })

        return blog ? this.mapBlog(blog) : null
    },

    mapBlog(blog: BlogDbType) {
        return {
            id: (blog._id!).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    }

}