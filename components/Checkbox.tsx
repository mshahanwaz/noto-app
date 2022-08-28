import classNames from "utils/classNames";

const Checkbox = ({ doc, onClick }: any) => {
  return (
    <div
      className="rounded-lg p-2 hover:bg-gray-900 dark:hover:bg-gray-50 cursor-pointer group transition-all"
      onClick={onClick}
    >
      <div
        className={classNames(
          "flex items-center justify-center w-5 h-5 border-2 rounded-md border-gray-900 group-hover:border-gray-50 dark:border-gray-50 dark:group-hover:border-gray-900"
        )}
      >
        <span
          className={classNames(
            "w-3 h-3 rounded group-hover:bg-gray-50 dark:group-hover:bg-gray-900 scale-0 group-hover:scale-100 transition-all",
            doc?.completed && "bg-gray-900 dark:bg-gray-50 scale-100"
          )}
        />
      </div>
    </div>
  );
};

export default Checkbox;
