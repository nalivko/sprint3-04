import { BlogsRepository } from "./blogs-db-repository"
import { BlogsQueryRepository } from "./blogs-query-repository"
import { BlogsService } from "./services/blogs-service"
import { BlogController } from "./controllers/BlogController"
import { Container, injectable, inject } from "inversify"

// const objects: any[] = []

// const blogRepository = new BlogsRepository()
// objects.push(blogRepository)

// const blogQueryRepository = new BlogsQueryRepository()
// objects.push(blogQueryRepository)

// const blogService = new BlogsService(blogQueryRepository, blogRepository)
// objects.push(blogService)

// export const blogController = new BlogController(blogService)
// objects.push(blogController)

// export const ioc = {
//     getInstance<T>(ClassType: any) {
//         const targetInstance = objects.find(o => o instanceof ClassType)
//         return targetInstance as T
//     }
// }

export const container = new Container()

container.bind(BlogController).to(BlogController);
container.bind<BlogsService>(BlogsService).to(BlogsService);
container.bind<BlogsQueryRepository>(BlogsQueryRepository).to(BlogsQueryRepository);
container.bind<BlogsRepository>(BlogsRepository).to(BlogsRepository);