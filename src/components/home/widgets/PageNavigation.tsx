import { FunctionComponent as FC } from "react";

interface PageNavigationProps {
  pageMap: number[];
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageNavigation: FC<PageNavigationProps> = ({
  pageMap,
  page,
  setPage,
}) => {
  return (
    <div className="flex flex-row gap-4 justify-center">
      {pageMap.map((item, index) => (
        <button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={index + 1 === page ? "font-bold" : ""}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PageNavigation;
