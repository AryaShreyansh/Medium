import {string, z} from "zod";

//validation for signup route
export const signupInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})



//validations for signin routes

export const signinInput = z.object({
    email:z.string().email(),
    password:z.string().min(6),
    
})



//validation for blog creation
export const createBlogInput = z.object({
    title:z.string(),
    content:z.string()
})




//update blog input 

export const updateBlogInput = z.object({
    title:z.string(),
    content:z.string(),
    id: z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>

