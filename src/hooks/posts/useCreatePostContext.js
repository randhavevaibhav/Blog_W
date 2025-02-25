import { useContext } from "react"
import { CreatePostContext } from "../../contexts/CreatePost/CreatePostContext"

export const useCreatePostContext = ()=>{

    
    return  useContext(CreatePostContext)
}