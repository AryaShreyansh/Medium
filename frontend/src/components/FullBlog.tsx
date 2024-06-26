import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./BlogsCard"

export const FullBlog= ({blog}:{blog:Blog })=>{

    return (
        <div>

            <Appbar />
            <div className="flex justify-center mb-11">
                <div className="grid grid-cols-12 px-10 w-full  max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-400 pt-3">
                            Posted on 2nd Deeember 2023
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    
                    <div className="col-span-4">
                        Author
                        <div className="flex">
                            <div className="pr-2 flex flex-col justify-center">
                                 <Avatar name={blog.author.name || "Anonymous"} size={"big"} /> 
                            </div>
                            <div>   
                                <div className=" text-lg font-bold pl-4 text-slate-600">
                                    {blog.author.name|| "Anonymous"}
                                </div>
                                
                                <div className="pt-2 text-slate-500 pl-4">
                                    Random Phrase for catching attention of the viewers
                                </div>
                            </div>
                           
                            
                        </div>
                        
                    </div>
                    

                </div>
            </div>
         </div>
    )
}