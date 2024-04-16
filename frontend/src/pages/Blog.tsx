import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export default function Blog(){
    const {id} = useParams();
    const {loading, blog} = useBlog(
       { id: id || ""}
    );

    if(loading || !blog){
        return(
            <div>
                <Spinner />
            </div>
        )
    }
    return(
        <div>
            <FullBlog blog={blog } /> 
        </div>
    )
}