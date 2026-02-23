import { useGetIndividualPost } from "@/hooks/posts/useGetIndividualPost";
import PageNotFound from "../PageNotFound/PageNotFound";
import { setLocalStorageItem } from "@/utils/browser";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();
  const {
    isPending: isFetchIndividualPostPending,
    data,
    isError,
    error,
  } = useGetIndividualPost({ postId });

  if (isError) {
    if (error.status === 404) {
      return <PageNotFound>No post found !</PageNotFound>;
    } else {
      return <Error>Error while loading post !</Error>;
    }
  }

  if (isFetchIndividualPostPending) {
    return <Loading>Loading post...</Loading>;
  }

  const { title, content, titleImgURL, hashtags:tagList } = data.postData;

  setLocalStorageItem("PostData", {
    title: title,
    content: content,
    imgURL: titleImgURL,
    isEditPostData: true,
    tagList,
  });
  return <CreatePost mode={"EDIT"} />;
};

export default EditPost;
