import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from "@shreyansharya1/medium-common";
import { shouldProcessLinkClick } from "react-router-dom/dist/dom";

//** */
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}>();

userRouter.post('/signup', async (c)=>{
  const body= await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs are incorrect"
    })
  }

/** */
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  

  try{
    const user = await prisma.user.create({
      data:{
        name:body.name,
        email: body.email,
        password:body.password
      }
    })

    const jwt = await sign({
      id:user.id
    }, c.env.JWT_SECRET)

    return c.json({jwt})


  }catch(e){
    console.log(e)
     c.status(403)
     return c.json({
      error:"error while sign up"})
  }

})
  
  


//signin
userRouter.post('/signin', async (c)=>{
 const body= await c.req.json();
 const {success} = signinInput.safeParse(body);
 if(!success){
    c.status(411);
    return c.json({
      message:"Inputs are incorrect"
    })
  }
 
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

 try{
         //check if the username is correct by looking in the DB
      const user = await prisma.user.findFirst({
        where:{
          email:body.email,
          password: body.password
        }
      })

      if(!user){
        c.status(403);
        return c.json({
          message:"Incorrect Email"
        });
      }

      const jwt = await sign({
        id:user.id
      }, c.env.JWT_SECRET);

      return c.json({
        jwt : jwt,
        message:"Logged In successfully",
      })

 }catch(e){
    console.log(e);
    c.status(403);
    return c.json({
      message:"error has occured",
      error:e
    })
 }

})

userRouter.delete('/delete', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
      await prisma.user.deleteMany({});
      
      return c.json({
        message:"All users deleted successfully",
        success: true
      })
  }catch(err){

    c.status(403);
    return c.json({
      success: false,
      message:"Error while deleting users",
    })
  }
  

})