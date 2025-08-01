import { Textarea } from "@/components/common/Textarea/Textarea";
import { Button } from "@/components/ui/button";
import { forwardRef } from "react";

export const EditCommentForm = forwardRef(
  ({ handleSubmit, handleFormDismiss, defaultContent }, ref) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:gap-4 gap-3">
       
          <Textarea
            name="edit_comment"
            placeholder={`Edit comment`}
            id="edit_comment_text_area"
            ref={ref}
            defaultValue={defaultContent}
            onKeyUp={(e) => {
              if (e.code === "Enter") {
                handleSubmit(e);
              }
            }}
            data-test={`edit-comment-text-area`}
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="action"
              className="self-start tracking-wide"
              data-test={`edit-comment-submit-btn`}
            >
              Submit
            </Button>

            <Button
              type="button"
              className="self-start"
              onClick={handleFormDismiss}
              data-test={`edit-comment-dismiss-btn`}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </form>
    );
  }
);
