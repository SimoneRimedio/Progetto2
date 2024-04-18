import { useState } from 'react';
import DropDownMenu from '../Menu/DropDownMenu';

const InpTextWithMenu = ({ phldr, inpAutocomplete, btnIcon, elmsMenu }) => {
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    const filteredOptions = inpAutocomplete.filter((option) => option.toLowerCase().includes(newValue.toLowerCase()));
    setAutocompleteOptions(filteredOptions);
  };

  return (
    <div className='relative flex items-center'>
      <input 
        type='text' 
        className='py-2 px-3 w-64 border rounded-lg border-stone-700' 
        placeholder={phldr} 
        value={inputValue} 
        onChange={handleInputChange} 
        onFocus={() => setIsInputFocused(true)} 
        onBlur={() => setIsInputFocused(false)}
      />
      <DropDownMenu btnProps={btnIcon} elements={elmsMenu} closeNow={isInputFocused} />
      {(isInputFocused && inputValue) && autocompleteOptions.length > 0 && (
        <div className='absolute top-full mt-2 w-64 bg-white border border-stone-700 rounded-md shadow-md'>
          {autocompleteOptions.map((option, index) => (
            <div key={index} className='py-2 px-3 cursor-pointer hover:bg-gray-100' onClick={() => setInputValue(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InpTextWithMenu;
