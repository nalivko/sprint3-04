import { ObjectId } from "mongodb";
import { setBlogsQueryParams, setPostsQueryParams } from "../../../helpers/helper";
import { postsRepository } from "../../posts/posts-db-repository";
import { postsQueryRepository } from "../../posts/posts-query-repository";
import { PostDbType, PostInputModel, PostViewModel } from "../../posts/types/posts-types";
import { BlogsRepository } from "../blogs-db-repository";
import { BlogsQueryRepository } from "../blogs-query-repository";
import { BlogInputModel, BlogModel, BlogsViewCollectionModel, BlogViewModel } from "../types/blogs-types";
import { injectable, inject } from "inversify";
import { postLikeQueryRepository } from "../../likes/infrastructure/post-like-query-repository";
import { PostLikeDbType } from "../../likes/types/likeTypes";

@injectable()
export class BlogsService {
    constructor(
        @inject(BlogsQueryRepository) protected blogsQueryRepository: BlogsQueryRepository,
        @inject(BlogsRepository) protected blogsRepository: BlogsRepository) {
    }

    async findBlogs(query: { [key: string]: string | undefined }): Promise<BlogsViewCollectionModel> {
        const queryParams = setBlogsQueryParams(query)

        return this.blogsQueryRepository.findBlogs(queryParams)
    }

    async getBlogById(id: string): Promise<BlogViewModel | null> {
        return this.blogsRepository.getBlogById(id)
    }

    async createBlog(blog: BlogInputModel): Promise<BlogViewModel> {
        // const newBlog: BlogDbType = {
        //     name: blog.name,
        //     description: blog.description,
        //     websiteUrl: blog.websiteUrl,
        //     createdAt: new Date().toISOString(),
        //     isMembership: false
        // }

        const newBlog: BlogModel = new BlogModel(blog.name, blog.description, blog.websiteUrl, new Date().toISOString(), false)

        return await this.blogsRepository.createBlog(newBlog)
    }

    async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
        return await this.blogsRepository.updateBlog(id, data)
    }

    async deleteBlog(id: string): Promise<boolean> {
        return await this.blogsRepository.deleteBlog(id)
    }

    async getPostByBlogId(query: { [key: string]: string | undefined }, blogId: string, userId: string) {
        const queryParams = setPostsQueryParams(query)

        const posts = await postsQueryRepository.findPosts(queryParams, blogId)

        await this.mapPosts(posts.items, userId)

        return posts
    }

    async mapPosts(posts: PostViewModel[], userId: string | undefined) {
        const postsLikes = await postLikeQueryRepository.getPostLikes()

        return await Promise.all(posts.map(async post => {
            const postLikes = postsLikes.filter(like => like.postId === post.id)

            post.extendedLikesInfo = {
                likesCount: postLikes.filter(like => like.status === "Like").length,
                dislikesCount: postLikes.filter(like => like.status === "Dislike").length,
                myStatus: this.getMyLikeStatus(userId, postsLikes, post.id),
                newestLikes: await postLikeQueryRepository.getLastThreeLikes(post.id)
            }

            return post
        }))
    }

    getMyLikeStatus(userId: string | undefined, postsLikes: PostLikeDbType[], postId: string) {
        console.log('user', userId);
        
        if (userId) {
            const myPostLike = postsLikes.find(like => like.postId === postId && like.authorId === userId)
            if (myPostLike) {
                return myPostLike.status
            }
        }

        return "None"
    }

    async createPostByBlogId(blogId: string, post: PostInputModel) {
        const blog = await this.getBlogById(blogId)

        const newPost: PostDbType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: new ObjectId(blogId),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPost(newPost)
    }
}

// export const blogsService = new BlogsService()