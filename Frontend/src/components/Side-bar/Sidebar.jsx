import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import GroupIcon from '@mui/icons-material/Group';
import SportsIcon from '@mui/icons-material/Sports';
import FriendsIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sidebar = () => {
  const items = [
    { text: 'Global Leaderboard', icon: <HomeIcon />, link: '/leaderboard' },
    { text: 'Coin Store', icon: <StoreIcon />, link: '/store' },
    { text: 'Daily Challenges', icon: <AssignmentIcon />, link: '/challenges' },
    { text: 'Gifting System', icon: <GiftIcon />, link: '/gifting' },
    { text: 'Clans & Guilds', icon: <GroupIcon />, link: '/clans' },
    { text: 'Betting Arena', icon: <SportsIcon />, link: '/betting' },
    { text: 'Friends System', icon: <FriendsIcon />, link: '/friends' },
    { text: 'Achievements', icon: <EmojiEventsIcon />, link: '/achievements' },
    { text: 'Game News & Updates', icon: <NotificationsIcon />, link: '/news' },
    { text: 'Support/FAQ', icon: <HelpIcon />, link: '/support' },
    { text: 'Site Settings', icon: <SettingsIcon />, link: '/settings' },
    { text: 'Logout', icon: <ExitToAppIcon />, link: '/logout' },
  ];

  return (
    <div className="w-16 hover:w-64 bg-[#1a1b26] h-screen fixed flex flex-col items-center transition-width duration-300">
      {items.map((item, index) => (
        <Link 
          to={item.link}
          key={index} 
          className="w-full flex items-center space-x-4 p-3 text-white hover:text-purple-500 group"
        >
          <div className="flex-shrink-0">{item.icon}</div>
          <span className="hidden group-hover:inline ">{item.text}</span>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;