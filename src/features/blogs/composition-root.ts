import { BlogsRepository } from "./blogs-db-repository"
import { BlogsQueryRepository } from "./blogs-query-repository"
import { BlogsService } from "./services/blogs-service"
import { BlogController } from "./controllers/BlogController"

const blogRepository = new BlogsRepository()
const blogQueryRepository = new BlogsQueryRepository()
const blogService = new BlogsService(blogQueryRepository, blogRepository)
export const blogController = new BlogController(blogService)