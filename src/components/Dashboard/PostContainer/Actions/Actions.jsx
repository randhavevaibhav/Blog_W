export const Actions = ({ handlePostDeleteAction, postTitle }) => {
  return (
    <div className="flex actions justify-self-end">
      <div>
        <a
          href="#"
          className="p-1"
          onClick={() => handlePostDeleteAction(postTitle)}
        >
          Delete
        </a>
      </div>
      <div>
        <a href="#" className="p-1">
          Edit
        </a>
      </div>
    </div>
  );
};
