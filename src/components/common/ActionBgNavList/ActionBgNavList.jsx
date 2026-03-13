import { useKeyBoardListNav } from "@/hooks/utils/useKeyBoardListNav";
import { cn } from "@/lib/utils";
import { createContext, forwardRef, useContext } from "react";

const ListContext = createContext(null);

const ListContextProvider = ({ children, listLength, onEnterKeyPress }) => {
  const { activeIndex } = useKeyBoardListNav({
    listLength,
    onEnterKeyPress,
  });
  return (
    <ListContext.Provider value={{ activeIndex, listLength }}>
      {children}
    </ListContext.Provider>
  );
};

const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("Please use Nav List inside ListContextProvider");
  }
  return context;
};

const ListItem = forwardRef((props, ref ) => {
  const { idx, children, className = "", onActive = () => {}, ...rest } = props;
  const { activeIndex } = useListContext();
  const isActive = activeIndex === idx;
  if (isActive) {
    onActive(activeIndex);
  }

  return (
    <li
      className={cn(
        {
          "bg-action-color": isActive,
        },
        className,
       
      )}
      {...rest}
      ref={ref}
      item-id={`item_${idx}`}
    >
      {children}
    </li>
  );
});

const List = ({ children, className }) => {
  return <ul className={cn(className)}>{children}</ul>;
};

const ActionBgNavList = ({
  children,
  listLength = 0,
  className = "",
  onEnterKeyPress = () => {},
}) => {
  return (
    <ListContextProvider
      listLength={listLength}
      onEnterKeyPress={onEnterKeyPress}
    >
      <List className={className}>{children}</List>
    </ListContextProvider>
  );
};

ActionBgNavList.ListItem = ListItem;

export default ActionBgNavList;
