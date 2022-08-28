import classNames from "utils/classNames";

const Button = ({ children, ...props }: any) => {
  return (
    <button
      className={classNames(
        "py-2 px-4 text-gray-50 font-medium bg-gray-800 hover:bg-gray-900 dark:text-black dark:bg-gray-400 dark:hover:bg-white rounded-lg",
        "disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
