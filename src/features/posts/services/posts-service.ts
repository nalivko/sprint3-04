import { ObjectId } from "mongodb";
import { PostDbType } from "../types/posts-types";
import { setPostsQueryParams } from "../../../helpers/helper";
import { PostInputModel, PostViewModel } from "../types/posts-types";
import { BlogsService } from "../../blogs/services/blogs-service";
import { postsRepository } from "../posts-db-repository";
import { postsQueryRepository } from "../posts-query-repository";
import { BlogViewModel } from "../../blogs/types/blogs-types";
import { postLikeQueryRepository } from "../../likes/infrastructure/post-like-query-repository";
import { PostLikeDbType } from "../../likes/types/likeTypes";
import { ExtendedLikesInfo } from "../types/posts-types";
import { log } from "console";

export const postsService = {
    // blogsService: new BlogsService(),

    async findPosts(query: { [key: string]: string | undefined }, userId: string | undefined) {
        const queryParams = setPostsQueryParams(query)
        const posts = await postsQueryRepository.findPosts(queryParams)

        await this.mapPosts(posts.items, userId)
        
        return posts
    },

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
    },

    async getPostById(id: string): Promise<PostViewModel | null> {
        return await postsRepository.getPostById(id)
    },

    async createPost(post: PostInputModel): Promise<PostViewModel> {
        const blog = await this.getBlogById(post.blogId)

        const newPost: PostDbType = {
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: new ObjectId(post.blogId),
            blogName: blog!.name,
            createdAt: new Date().toISOString()
        }

        return await postsRepository.createPost(newPost)
    },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        return await postsRepository.updatePost(id, data)
    },

    async deletePost(id: string): Promise<boolean> {
        return await postsRepository.deletePost(id)
    },

    async getBlogById(id: string): Promise<BlogViewModel | null> {
        return postsQueryRepository.getBlogById(id)
    },

    getMyLikeStatus(userId: string | undefined, postsLikes: PostLikeDbType[], postId: string) {
        console.log('user', userId);
        
        if (userId) {
            const myPostLike = postsLikes.find(like => like.postId === postId && like.authorId === userId)
            if (myPostLike) {
                return myPostLike.status
            }
        }

        return "None"
    },

    async getExtendedLikesInfo(postId: string, userId: string | undefined): Promise<ExtendedLikesInfo> {
        const likesCount = await postLikeQueryRepository.getCommentLikesCount(postId)
        const dislikesCount = await postLikeQueryRepository.getCommentDislikesCount(postId)
        const myStatus = userId ? await postLikeQueryRepository.getMyCommentStatus(postId, userId) : 'None'
        const newestLikes = await postLikeQueryRepository.getLastThreeLikes(postId)

        return {
            likesCount,
            dislikesCount,
            myStatus,
            newestLikes
        }
    }
}