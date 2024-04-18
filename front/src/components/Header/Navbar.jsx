import { useEffect, useState } from 'react';
import { IconUser, IconUsersGroup, IconChalkboard, IconDoor, IconLogin2, IconSun, IconMenu2, IconX } from '@tabler/icons-react'
import useFetch from '../../hooks/useFetch';
import Link from '../Link/Link'
import InpTextWithMenu from '../Input/InpTextWithMenu';
import InpSwitch from '../Input/InpSwitch';
import DropDownMenu from '../Menu/DropDownMenu';

const Navbar = () => {
  return (
      <nav className='absolute flex justify-between items-center w-full py-4'>
        <Logo />
        <Input />
        <UserProps />
      </nav>
  )
}

const Logo = () => {
  return (
    <Link href={'/'}>
      <img className='w-12 h-12' src='/maxwelllogo.png' alt='Maxwell Logo' />
      <div className='sm:block hidden'>
        <span className='text-xl font-semibold'>J.C Maxwell</span>
      </div>
    </Link>
  )
}

const Input = () => {
  const dropDownMenuProps = {
    button: { iconOpen: <IconMenu2/>, iconClose: <IconX/> },
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
      const autocompleteOptions = await useFetch({ url: `http://localhost:4000/searchFor=${currentValueForSearch}` });
  
      setSearchingValue(autocompleteOptions.data);
    };

    getAutocompleteOptions();
  }, [currentSearchOption]);

  return <InpTextWithMenu phldr={'Search'} inpAutocomplete={searchingValue} btnIcon={dropDownMenuProps.button} elmsMenu={dropDownMenuProps.optionsList} />;
};

const UserProps = () => {
  const userAction = {
    button: { iconOpen: <IconUser/> },
    optionsList: [
    { icon: <IconLogin2 />, text: 'Login', isLink: '/login'  },
    { icon: <IconSun />, text: 'Theme', extItem: <InpSwitch/> },
    ],
  };

  return (
    <div className='relative flex justify-between items-center'>
      <DropDownMenu btnProps={userAction.button} elements={userAction.optionsList} />
    </div>
  );
}

export default Navbar;
