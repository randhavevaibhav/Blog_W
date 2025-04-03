import { useContext } from "react"
import { PostContext } from "../../contexts/Post/PostContextProvider"

export const usePostContext = ()=>{
return useContext(PostContext);

}