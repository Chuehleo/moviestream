import { useCallback, useState, useEffect} from 'react';
import Link from 'next/link';
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from './AccountMenu';
import { useRouter } from 'next/router';
import useSearch from '@/hooks/useSearch';

interface NavbarProps {
    favoriteOnClick: () => void;
  }
const TOP_OFFSET = 66;

import { BsChevronDown, BsSearch, BsBell} from 'react-icons/bs';

const Navbar: React.FC<NavbarProps> = ({ favoriteOnClick }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: searchResults } = useSearch(searchTerm);
  
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      router.push(`/search?q=${searchTerm}`);
    };
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, []);
    
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current)
    }, []);

    const handleHomeClick = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
    

    return (
        <nav className="w-full fixed z-40">
            <div className={`px-10 md:px-18 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        
            <img className="h-8 lg:h-14" src="/images/logo.png" alt="Logo" />
            <div 
              className="
              flex-row
              ml-8
              gap-7
              hidden
              lg:flex
              "
            >
          <Link href="/" passHref>
            <NavbarItem label="Home" onClick={handleHomeClick}/>
          </Link>
                <NavbarItem label="Series" />
                <NavbarItem label="Favorites" onClick={favoriteOnClick}/>
                <NavbarItem label="Browse by languages" />
            </div>
            <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
              <p className="text-white text-sm">Browse</p>
              <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
              <MobileMenu visible={showMobileMenu} />
            </div>
            
            <div className="flex flex-row ml-auto gap-7 items-center">
                <div className="relative">
                    <button
                        onFocus={() => setShowSearch(true)}
                        onBlur={() => {
                            if (!inputHover) {
                            setShowSearch(false);
                            }
                        }}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                        <BsSearch className="text-white hover:text-gray-300 transition duration-300" />
                    </button>
                <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search"
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                    onBlur={() => setShowSearch(false)}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className={`${
                        showSearch ? 'opacity-100 w-48' : 'opacity-0 w-0'
                    } transition-all duration-300 bg-transparent border-b outline-none absolute top-1/2 right-2 transform -translate-y-1/2 text-white`}
                    />
                        <button type="submit"></button>
                </form>
                </div>
                <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                    <BsBell />    
                </div>

                <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                    <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                        <img src="/images/default1.png" alt="" />
                    </div>
                    <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
          </div>
        </nav>
    )
}

export default Navbar;




