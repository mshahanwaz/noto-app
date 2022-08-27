const Button = ({ children, ...props }: any) => {
  return (
    <button
      className="py-2 px-4 text-white font-medium bg-black dark:text-black dark:bg-white rounded-lg"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
