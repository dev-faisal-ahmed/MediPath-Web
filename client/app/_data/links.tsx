import { RiDashboardFill } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { RiBillFill } from "react-icons/ri";

export const links = [
  { title: 'Dashboard', url: '/', icon: <RiDashboardFill /> },
  { title: 'Doctors', url: '/doctors', icon: <FaUserDoctor /> },
  { title: 'Patients', url: '/patients', icon: <HiUsers /> },
  { title: 'OPD Entry', url: '/odp/add', icon: <RiBillFill /> },
];
