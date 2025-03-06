import { format } from "date-fns";
const Comment = ({ userName, date, content }) => {
  return (
    <div className="flex flex-col gap-4 indiviual_comment w-full border dark:border-gray-50 dark:border-opacity-50 rounded-md py-4 px-2">
      <header className="">
        <a href="" className="mr-4 font-bold text-lg">
          {userName}
        </a>
        <span className="text-sm">
          {" "}
          Published: {format(new Date(date), "yyyy-MM-dd")}
        </span>
      </header>
      <div className="comment_body">{content}</div>
    </div>
  );
};

const formateData = (data) => {
  return JSON.parse(data);
};

export const IndiviualComment = ({ data }) => {
  return (
    <>
      {formateData(data.comments).map((comment) => {
        // console.log("comment.id ===> ",comment)
        return (
          <Comment
            key={comment.id}
            userName={comment.userName}
            date={comment.created_at}
            content={comment.content}
          />
        );
      })}
    </>
  );
};
