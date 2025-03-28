import { Link } from "react-router-dom"


export const SideMenuList = ({list,hideSidebar,handleLogOut})=>{
    return (<>
     <ul className={`flex  flex-col gap-4`}>
            {list.map((item) => (
              <li
                className="px-2"
                key={item.id}
                onClick={() => hideSidebar()}
              >
                <Link
                  to={item.linkTo}
                  className=" md:block flex items-center gap-2 text-lg p-2 rounded-lg   bg-bg-shade"
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