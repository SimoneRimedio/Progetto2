import { useState } from "react";

const InpSwitch = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className={`flex w-10 h-6 ${isSelected ? 'bg-green-600' : 'bg-gray-600'} rounded-full`} onClick={() => setIsSelected(!isSelected)}>
      <span className={`${isSelected ? 'ml-4' : ''} w-6 h-6 bg-white rounded-full transition-all duration-200`}></span>
    </div>
  );
};

export default InpSwitch;
