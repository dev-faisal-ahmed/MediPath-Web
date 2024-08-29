import { RiDashboardFill } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { RiBillFill } from 'react-icons/ri';
import { PiTestTubeFill } from 'react-icons/pi';

export const links = [
  { title: 'Dashboard', url: '/', icon: <RiDashboardFill /> },
  { title: 'Doctors', url: '/doctors', icon: <FaUserDoctor /> },
  { title: 'Patients', url: '/patients', icon: <HiUsers /> },
  { title: 'Services', url: '/services', icon: <PiTestTubeFill /> },
  { title: 'Bill Entry', url: '/bill/add', icon: <RiBillFill /> },
];
