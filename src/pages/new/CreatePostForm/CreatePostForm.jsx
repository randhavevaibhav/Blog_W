import { Header } from "./Header";
import { PostContent } from "./PostContent";



export const CreatePostForm = ({postContentRef,postTitleRef}) => {
  
  const markdown2 = `
  \`\`\`typescript
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }
  \`\`\`
  # hello
  1. first
  2. second
  __ksdfs__
`;
  return (
    <form
      className="flex flex-col h-screen md:h-[650px]"
      onSubmit={(e) => e.preventDefault()}
    >
     
      <Header ref={postTitleRef}/>
      <PostContent ref={postContentRef} />
    </form>
  );
}
