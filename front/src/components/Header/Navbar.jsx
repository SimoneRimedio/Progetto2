import { useEffect, useState } from 'react';
import { IconUser, IconUsersGroup, IconChalkboard, IconDoor, IconLogin2, IconSun, IconMenu2, IconX } from '@tabler/icons-react'
import useFetch from '../../hooks/useFetch';
import Link from '../Link/Link'
import InpTextWithMenu from '../Input/InpTextWithMenu';
import InpSwitch from '../Input/InpSwitch';
import DropDownMenu from '../Menu/DropDownMenu';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 flex justify-between items-center w-full py-4 z-100 bg-white shadow-md'>
       <div className="flex items-center"> {/* Utilizzo flex per allineare i componenti */}
    <Logo />
    <span className='sm:text-xl font-semibold ml-2 hidden sm:block'>J.C Maxwell</span> {/* La scritta sarà visibile solo su schermi di dimensioni maggiore o uguali a sm */}
  </div>
  <div className="flex flex-grow items-center justify-center"> {/* Utilizzo flex-grow per far espandere questo container */} 
    <Input />
  </div>
      <UserProps />
    </nav>
  );
};


const Logo = () => {
  return (
    <Link href={'/'}  className='flex items-center'>
      <div className='ml-10'>
      <img className='w-10 h-10 sm:w-12 sm:h-12' src='/maxwelllogo.png' alt='Maxwell Logo' />
        </div>
    </Link>
  );
};


const Input = () => {
  const dropDownMenuProps = {
    optionsList: [
      { icon: <IconUsersGroup />, text: 'Docenti', onClick: () => setCurrentSearchOption(0) },
      { icon: <IconChalkboard />, text: 'Classi', onClick: () => setCurrentSearchOption(1) },
      { icon: <IconDoor />, text: 'Aule', onClick: () => setCurrentSearchOption(2) },
    ]
  };
  const [currentSearchOption, setCurrentSearchOption] = useState(0);
  const [searchingValue, setSearchingValue] = useState([]);

  const getCurrentValueForSearch = () => {
    return dropDownMenuProps.optionsList[currentSearchOption].text;
  };

  useEffect(() => {
    const getAutocompleteOptions = async () => {
      const currentValueForSearch = getCurrentValueForSearch();
      const autocompleteOptions = await useFetch({ url: `http://localhost:3000/autoComplete?searchFor=${currentValueForSearch}`});
  
      setSearchingValue(autocompleteOptions.data);
    };

    getAutocompleteOptions();
  }, [currentSearchOption]);

  return <InpTextWithMenu phldr={'Search'} inpAutocomplete={searchingValue} elmsMenu={dropDownMenuProps.optionsList} className="w-full sm:w-64"/>;
};


const UserProps = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Stato per il tema scuro

  const userAction = {
    button: { iconOpen: <IconUser/> },
    optionsList: [
      { icon: <IconLogin2 />, text: 'Login', isLink: '/login'  },
      //{ icon: <IconSun />, text: 'Theme', extItem: <InpSwitch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} /> }, // Inserito lo stato del tema scuro nell'InpSwitch
    ],
  };

  useEffect(() => {
    // Aggiorna il tema globale in base allo stato del tema scuro
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className='relative flex justify-between items-center mr-10'>
      <DropDownMenu btnProps={userAction.button} elements={userAction.optionsList}/>
    </div>
  );
}

export default Navbar;