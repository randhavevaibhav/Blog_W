import { twMerge } from "tailwind-merge";

const defaultClasses = `max-w-[75rem] mx-auto mt-[var(--header-height)] `;

export const MainLayout = ({ children, className }) => {
  const overrideClasses = twMerge(defaultClasses, className);

  return (
    <>
      <main className={overrideClasses}>{children}</main>
      <footer className="h-footer">
        <ul className="flex gap-4 justify-center border-t-[1px] p-2">
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </footer>
    </>
  );
};
