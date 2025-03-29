"use client";

const LoadingBar: React.FC = () => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
      <div className="bg-blue-500 h-full animate-pulse"></div>
    </div>
  );
};

export default LoadingBar;
