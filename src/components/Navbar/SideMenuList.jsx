import { Link } from "react-router-dom"


export const SideMenuList = ({list,handleShowSidebar,handleLogOut})=>{
    return (<>
     <ul className={`flex  flex-col gap-4`}>
            {list.map((item) => (
              <li
                className="px-2"
                key={item.id}
                onClick={() => handleShowSidebar()}
              >
                <Link
                  to={item.linkTo}
                  className=" md:block flex items-center gap-2 text-lg p-2 rounded-lg   dark:bg-[#212020] bg-[#efefef]"
                  onClick={() => handleLogOut(item.node)}
                >
                  <span>{item.icon}</span>

                  <span> {item.node}</span>
                </Link>
              </li>
            ))}
          </ul>
    </>)
}