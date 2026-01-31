import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { EditCommentForm } from "@/components/EditComment/EditCommentForm/EditCommentForm";
import { useUpdateComment } from "@/hooks/comments/useUpdateComment";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EditComment = () => {
  const { commentId, content: defaultContent, postId } = useParams();
  const navigate = useNavigate();

  const { isError, error, isPending, isSuccess, updateComment } =
    useUpdateComment({
      postId,
    });

  const commentContentRef = useRef(null);

  if (isPending) {
    return <Loading>Editing comment ...</Loading>;
  }

  if (isError) {
    console.error(error);
    return <Error>Error while editing comment !</Error>;
  }

  if (isSuccess) {
    return <Loading>Redirecting ....</Loading>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentContentRef.current) {
      const content = commentContentRef.current.value;
      if (content === "") {
        toast.error(`Please add some content to edit comment !`);
        return;
      }

      updateComment({
        content,
        commentId,
      });
    }
  };

  const handleFormDismiss = () => {
    navigate(`/post/${postId}#comments`);
  };
  return (
    <>
      <MainLayout className={`mb-0`}>
        <div className="py-10">
          <Card className="max-w-[1024px] md:mx-auto md:px-4 px-2 mx-4 bg-card-bg">
            <CardHeader className="md:p-6 p-3">
              <h2
                className="font-extrabold tracking-wide text-fs_3xl"
                data-test={`edit-comment-header`}
              >
                Edit Comment
              </h2>
            </CardHeader>
            <CardContent className="md:px-16 px-2">
              <EditCommentForm
                handleSubmit={handleSubmit}
                handleFormDismiss={handleFormDismiss}
                ref={commentContentRef}
                defaultContent={defaultContent}
              />
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    </>
  );
};

export default EditComment;
