import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogsCard"
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks"


export const Blogs = ()=>{

    const {loading, blogs} = useBlogs();

    if(loading){
        return (
            <div>
                <Skeleton />
            </div>
        )
    }


    return (
        <div >
            <Appbar/>
            <div className="flex flex-col justify-center items-center">
                <div className="">
                    {blogs.map(blog=>(
                        <BlogCard
                            id={blog.id}
                            authorName={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publishedDate={"2nd Feb 2024"}
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    )
}