import { useState, useEffect } from 'react';
import Link from '../Link/Link';

const DropDownMenu = ({ btnProps, elements, closeNow }) => {
  const [menuIsOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!menuIsOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [closeNow]);

  return (
    <>
      <button 
        className='absolute right-3 flex justify-center items-center' 
        onClick={toggleMenu}
      >
        {btnProps && (menuIsOpen ? (btnProps.iconClose ? btnProps.iconClose : btnProps.iconOpen) : btnProps.iconOpen)}
      </button>
      {menuIsOpen && (
        <div className='absolute top-full right-0 mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md'>
          <ul>
            {elements.map((item, index) => (
              item.isLink ? (
                <Link key={index} href={item.isLink} onClick={item.onClick} className='flex justify-start items-start py-2 gap-3 cursor-pointer'>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                  {item.extItem}
                </Link>
              ) : (
                <li key={index} onClick={item.onClick} className='flex justify-start items-start py-2 gap-3 cursor-pointer'>
                <span>{item.icon}</span>
                <span>{item.text}</span>
                {item.extItem}
                </li>
              )
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDownMenu;
