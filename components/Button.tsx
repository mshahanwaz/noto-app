import classNames from "utils/classNames";

const Button = ({ children, ...props }: any) => {
  return (
    <button
      className={classNames(
        "py-2 px-4 text-gray-50 font-medium bg-gray-800 hover:bg-gray-900 dark:text-gray-900 dark:bg-gray-100 dark:hover:bg-gray-50 rounded-lg",
        "disabled:text-gray-400 disabled:bg-gray-200 dark:disabled:text-gray-500 dark:disabled:bg-gray-700 disabled:cursor-not-allowed transition-all"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
