import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { PiTestTubeFill } from 'react-icons/pi';
import { RiDashboardFill } from 'react-icons/ri';
import { BiSolidDetail } from 'react-icons/bi';
import { FaUserDoctor } from 'react-icons/fa6';
import { RiBillFill } from 'react-icons/ri';
import { GiWallet } from 'react-icons/gi';

export const links = [
  { title: 'Dashboard', url: '/', icon: <RiDashboardFill /> },
  { title: 'Overview', url: '/overview', icon: <BiSolidDetail /> },
  { title: 'Referrer', url: '/referrers', icon: <FaUserDoctor /> },
  { title: 'Services', url: '/services', icon: <PiTestTubeFill /> },
  { title: 'Bills', url: '/bills', icon: <FaMoneyBillTransfer /> },
  { title: 'Bill Entry', url: '/bill/add', icon: <RiBillFill /> },
  { title: 'Expenses', url: '/expenses', icon: <GiWallet /> },
];
