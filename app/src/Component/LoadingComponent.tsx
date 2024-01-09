const Loading = () => {
  return (
    <div className="flex justify-center my-3 h-12">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-dashed border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-dashed border-blue-500 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Loading;
