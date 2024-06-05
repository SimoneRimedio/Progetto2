import { useEffect, useState } from 'react';
import {
  IconUser, IconUsersGroup, IconChalkboard, IconDoor,
  IconLogin2, IconSun, IconMenu2, IconX
} from '@tabler/icons-react';
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
  const [searchingValue, setSearchingValue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropDownMenuProps = {
    button: { 
      iconOpen: <IconMenu2 />, 
      iconClose: <IconX />,
    },
    optionsList: [
      { 
        icon: <IconUsersGroup />, 
        text: 'Docenti', 
        index: 0,
        onClick: () => setCurrentSearchOption(0),
        tabIndex: 0, // Imposta il tabIndex sugli elementi della lista delle opzioni
        className: 'focus', // Aggiungi la classe focus per gestire gli stili del focus
      },
      { 
        icon: <IconChalkboard />, 
        text: 'Classi', 
        index: 1,
        onClick: () => setCurrentSearchOption(1),
        tabIndex: 0, // Imposta il tabIndex sugli elementi della lista delle opzioni
        className: 'focus', // Aggiungi la classe focus per gestire gli stili del focus
      },
      { 
        icon: <IconDoor />, 
        text: 'Aule', 
        index: 2,
        onClick: () => setCurrentSearchOption(2),
        tabIndex: 0, // Imposta il tabIndex sugli elementi della lista delle opzioni
        className: 'focus', // Aggiungi la classe focus per gestire gli stili del focus
      },
    ]
  };

  useEffect(() => {
    const getAutocompleteOptions = async () => {
      const autocompleteOptions = await useFetch({ url: `http://localhost:3000/searchFor=${dropDownMenuProps.optionsList[currentSearchOption].text}` });

      setSearchingValue(autocompleteOptions.data);
    };

    getAutocompleteOptions();
  }, [currentSearchOption]);

  const handleSearch = () => {
    const selectedOption = dropDownMenuProps.optionsList[currentSearchOption];
    navigate(`/table?search=${inputValue}&option=${selectedOption.text}`);
  };

  return (
    <div className='relative flex items-center'>
      <input
        type="text"
        id="searchInput"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className='border p-2 rounded-l relative flex'
      />
      <button onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded-r text-white-900 hover:text-grey-600'>
        Cerca
      </button>
      <div className='ml-10 relative inset-0 flex justify-center items-center z-10'>
        <DropDownMenu
          btnProps={dropDownMenuProps.button}
          elements={dropDownMenuProps.optionsList}
          className='bg-white border rounded shadow-md focus'
        />
      </div>
    </div>
  );
};

const UserProps = () => {
  const userAction = {
    button: { iconOpen: <IconUser /> },
    optionsList: [
      { icon: <IconLogin2 />, text: 'Login', isLink: '/login' },
    ],
  };

  return (
    <DropDownMenu
      btnProps={userAction.button}
      elements={userAction.optionsList}
      className='relative focus'
    />
  );
};

export default Navbar;
      