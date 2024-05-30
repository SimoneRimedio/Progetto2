import { useEffect, useState } from 'react';
import { IconUser, IconUsersGroup, IconChalkboard, IconDoor, IconLogin2, IconSun, IconMenu2, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Link from '../Link/Link';
import InpSwitch from '../Input/InpSwitch';
import DropDownMenu from '../Menu/DropDownMenu';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 flex justify-between items-center w-full py-4 z-100 bg-white shadow-md'>
      <div className="flex items-center">
        <Logo />
        <span className='sm:text-xl font-semibold ml-2 hidden sm:block'>J.C Maxwell</span>
      </div>
      <div className="flex flex-grow items-center justify-center mx-10">
        <Input />
      </div>
      <UserProps />
    </nav>
  );
};

const Logo = () => {
  return (
    <Link href={'/'} className='flex items-center'>
      <div className='ml-10'>
        <img className='w-10 h-10 sm:w-12 sm:h-12' src='/maxwelllogo.png' alt='Maxwell Logo' />
      </div>
    </Link>
  );
};

const Input = () => {
  const navigate = useNavigate();
  const [currentSearchOption, setCurrentSearchOption] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Aggiunto stato per gestire l'apertura e la chiusura del menu

  const dropDownMenuProps = {
    button: { iconOpen: <IconMenu2 />, iconClose: <IconX /> },
    optionsList: [
      { icon: <IconUsersGroup />, text: 'Docenti', onClick: () => setCurrentSearchOption(0), className: currentSearchOption === 0 ? 'focus:bg-blue-500 text-white' : '' },
      { icon: <IconChalkboard />, text: 'Classi', onClick: () => setCurrentSearchOption(1), className: currentSearchOption === 1 ? 'focus:bg-blue-500 text-white' : '' },
      { icon: <IconDoor />, text: 'Aule', onClick: () => setCurrentSearchOption(2), className: currentSearchOption === 2 ? 'focus:bg-blue-500 text-white' : '' },
    ]
  };

  const handleSearch = () => {
    const selectedOption = dropDownMenuProps.optionsList[currentSearchOption];
    navigate(`/table?search=${inputValue}&option=${selectedOption.text}`);
  };

  return (
    <div className='flex items-center'>
      <input
        type="text"
        id="searchInput"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className='border p-2 rounded-l ml-2'
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Aggiunto un gestore di eventi per aprire e chiudere il menu
      />
      <button onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded-r'>
        Cerca
      </button>
      {isMenuOpen && ( // Aggiunta condizione per mostrare il menu solo se isMenuOpen è true
        <DropDownMenu
          btnProps={dropDownMenuProps.button}
          elements={dropDownMenuProps.optionsList}
          className='absolute left-0 mt-10' // Applicato uno stile per posizionare il menu
        />
      )}
    </div>
  );
};

const UserProps = () => {
  const userAction = {
    button: { iconOpen: <IconUser /> },
    optionsList: [
      { icon: <IconLogin2 />, text: 'Login', isLink: '/login' },
      { icon: <IconSun />, text: 'Theme', extItem: <InpSwitch /> },
    ],
  };


};

export default Navbar;
