import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { Footer } from "../../components/common/Footer/Footer";
import { useEffect, useState } from "react";

const Article = () => {
  return (
    <>
      <article className="w-full flex flex-col gap-3 border border-gray-200 border-opacity-60 p-2 rounded-md backdrop-blur-sm">
        <header>
          <h3 className="font-bold text-lg">User name</h3>
          <span>Published: date</span>
        </header>
        <main className="ml-2">
          <a href="#">
            <h3 className="font-bold text-2xl">Title post</h3>
          </a>
        </main>
      </article>
    </>
  );
};

export const Home = () => {
  const [skip, setSkip] = useState(0)

  useEffect(()=>{

  })

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight} = e.target;
    console.log("scroll")
    console.log("offsetHeight  ===> ",offsetHeight)
    console.log("scrollTop  ===> ",scrollTop)
    console.log("scrollHeight  ===> ",scrollHeight)

    if (offsetHeight + scrollTop > scrollHeight) {
     console.log("reached bottom")
    }
  }
  return (
    <>
      <MainLayout
        className={`border border-white grid grid-cols-1 md:grid-cols-[22rem_1fr]  gap-2`}
     
      >
        <div className="border border-white">Sidebar</div>
        <div className="p-4"  >
          Feed
          <div className="article_list flex flex-col gap-4 max-w-[40rem] max-h-[42rem] p-4 border border-white overflow-auto" 
             onScroll={handleScroll}
         >
            {Array.from(new Array(10)).map(()=>{
              return <Article/>
            })}
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
};
