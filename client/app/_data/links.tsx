import { RiDashboardFill } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { RiBillFill } from 'react-icons/ri';
import { PiTestTubeFill } from 'react-icons/pi';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

export const links = [
  { title: 'Dashboard', url: '/', icon: <RiDashboardFill /> },
  { title: 'Doctors', url: '/doctors', icon: <FaUserDoctor /> },
  { title: 'Agents', url: '/agents', icon: <HiUsers /> },
  { title: 'Services', url: '/services', icon: <PiTestTubeFill /> },
  { title: 'Bills', url: '/bills', icon: <FaMoneyBillTransfer /> },
  { title: 'Bill Entry', url: '/bill/add', icon: <RiBillFill /> },
];
