import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@shreyansharya1/medium-common";


export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
}>();

//middleware
blogRouter.use("/*", async (c, next)=>{

    //fetch the headers
    const authHeader= await c.req.header('authorization') || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if(user){
        c.set("userId", user.id); /** */
       await next();
    }else{
        c.status(403);
        c.json({
            message:"You are not Logged In"
        })
    }
    
});





//
blogRouter.post('/', async(c)=>{
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
    c.status(411);
    return c.json({
      message:"Blog Create Inputs are incorrect"
    })
  }
    //initialise prisma
    const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId: c.get('userId')
        }
    })

    return c.json({
        id: blog.id,
    })
  
})

// update a blog
blogRouter.put('/', async(c)=>{
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
    c.status(411);
    return c.json({
      message:"Blog Update Inputs are incorrect"
    })
  }
    //initialise prisma
    const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,
           
        }
    })

    return c.json({
        id: blog.id,
        message:"successfully updated the entry"
    })

  
})

blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:true
        }
    });

    return c.json({
        blogs
    })


})

blogRouter.get('/:id', async(c)=>{
    const idx = c.req.param("id");
    console.log("printing the uuid based filtering");
    
    console.log(idx);
    //initialise prisma
    const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blog = await prisma.post.findFirst({
            where:{
               id: idx
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }

            }
        })

        return c.json({
            blog
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            message:"Error while fetching blog post"
        })
    }

})



blogRouter.delete('/', async (c)=>{
    const prisma = new PrismaClient({
         datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
        await prisma.post.deleteMany({});

        return c.json({
            success: true,
            message:" all the posts have been deleted"
        })
    }catch(err){
        c.status(411);
        return c.json({
            success: false,
            message: 'Error occurred while deleting all the post'
        })
    }
    
})





