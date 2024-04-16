import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@shreyansharya1/medium-common"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const Auth =({type}:{type: "signin" | "signup"})=>{
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"/":"signin"}`, 
                postInputs
            );
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");

        }catch(e){
            alert('Error while signing up!')
        }
    }

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="max-w-lg flex flex-col justify-center items-center max-h-lg p-1">
                <div className="p-5 flex flex-col justify-center items-center mb-2 w-54">
                    {/* //heading and subHeading */}

                    <h1 className="text-4xl font-bold mb-2">
                        Create an account
                        
                    </h1>
                    <p className="text-lg font-normal text-zinc-500 ">
                        {type === "signin" ?"Don't have an account?":"Already have an account?"}
                        <Link to={type === "signin" ?"/signup":"/signin"} className="underline ml-1">
                            {type === "signin" ?"Sign up":"Sign in"}
                        </Link></p>

                </div>

                {/* input boxes */}
                {type==="signup"? <LabelInput label="Name" placeholder="John Doe..." onChange={(e)=>{
                   setPostInputs(c=>({
                    ...c,
                    name:e.target.value
                   }))
                }} />: null}

                <LabelInput label="username" placeholder="abc@gmail.com" onChange={(e)=>{
                   setPostInputs(c=>({
                    ...c,
                    email:e.target.value
                   }))
                }} />

                <LabelInput label="password" type={'password'} placeholder="****" onChange={(e)=>{
                   setPostInputs(c=>({
                    ...c,
                    password:e.target.value
                   }))
                }} />

                <button onClick={sendRequest} type="submit" className=" m-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 w-96 font-medium rounded-lg text-sm p-3 m-3 dark:bg-gray-800
                 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up": "Sign in"}</button>

            </div>
            

            
                
            
        </div>  
    )
}

interface LabelInputType{
    label:string,
    placeholder:string,
    onChange : (e: ChangeEvent<HTMLInputElement>)=> void;
    type?: string
};

function LabelInput({label,placeholder, onChange, type}:LabelInputType){

    return(
        <div className=" w-96">
            <div>
                <label  className=" block mb-2 text-sm  text-gray-900 dark:black font-semibold">{label}</label>
                <input type={type || "text"} onChange={onChange}  id="first_name" className="bg-gray-50 border
                 border-gray-300 text-gray-900 text-sm rounded-lg mb-1
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
            </div>
        </div>
    )
}