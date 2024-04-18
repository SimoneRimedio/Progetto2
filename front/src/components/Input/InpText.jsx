import { useState } from "react";

const InpText = ({ label }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <label className="relative">
      <input
        className="block w-full border-3 border-current p-bezel rounded-lg focus:border-accent"
        type="text"
        placeholder=" "
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <span
        className={`absolute left-0 top-0 ${
          inputValue || isFocused ? "transform translate-x-1/4 -translate-y-3/4 scale-80" : ""
        } bg-background px-bezel py-bezel font-bold line-height-1.2 ${
          inputValue || isFocused ? "text-accent" : ""
        } transition-transform duration-120 ease-in`}
      >
        {label}
      </span>
    </label>
  );
};

export default InpText;
