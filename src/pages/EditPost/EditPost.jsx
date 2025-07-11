import { useGetIndividualPost } from "@/hooks/posts/useGetIndividualPost";
import PageNotFound from "../PageNotFound/PageNotFound";
import { setLocalStorageItem } from "@/utils/browser";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import CreatePost from "../CreatePost/CreatePost";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { userId, postId } = useParams();
  const {
    isPending: isFetchIndividualPostPending,
    data,
    isError,
    error,
  } = useGetIndividualPost({ userId, postId });

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

  const postData = data.postData;

  setLocalStorageItem("PostData", {
    title: postData.title,
    content: postData.content,
    imgURL: postData.titleImgURL,
    isEditPostData: true,
  });
  return <CreatePost mode={"EDIT"} />;
};

export default EditPost;
