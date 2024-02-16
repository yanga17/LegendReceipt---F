'use client'

import Link from "next/link";
import { useSession } from "@/context";
import { colors } from "@/utils/colors";
import { usePathname } from 'next/navigation';
import { CalendarCheck, CalendarClock, LayoutDashboard, LogOut, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const pathname = usePathname();
  const { logout } = useSession();

  const MobileNavigation = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleVisibility = () => setIsOpen(!isOpen)

    return (
      <div className="lg:hidden flex relative">
        <div className="w-full items-center justify-between flex">
          <p>AttendTrack</p>
          <LayoutDashboard size={25} strokeWidth={1.5} color={colors?.black} className="cursor-pointer" onClick={toggleVisibility} />
        </div>
        {
          isOpen &&
          <div className="bg-white absolute top-40 left-0 bottom-0 right-0 w-full h-[500px] rounded">
            <X size={30} strokeWidth={1.5} color={colors?.red} className="cursor-pointer absolute top-2 right-2" onClick={toggleVisibility} />
            <ul className="w-full h-full flex flex-col items-center justify-center gap-2">
              <li>
                <Link href='/check-in'>Check-In</Link>
              </li>
              <li>
                <Link href='/'>Attendance</Link>
              </li>
            </ul>
          </div>
        }
      </div>
    )
  }

  const DesktopNavigation = () => {
    return (
      <div className="hidden lg:flex flex-col justify-between gap-1 h-full w-full">
        <ul className="flex flex-col justify-between gap-2 w-full">
          <li className="m-0 p-2 flex items-center justify-start gap-1 uppercase cursor-pointer hover:bg-black ease-in-out duration-500 rounded group">
            <CalendarCheck size={25} strokeWidth={1} color={pathname === '/' ? colors?.purple : colors?.black} />
            <Link href='/' className="text-sm font-medium text-gray-500 group-hover:text-white">Attendance</Link>
          </li>
          <li className="m-0 p-2 flex items-center justify-start gap-1 uppercase cursor-pointer hover:bg-black ease-in-out duration-500 rounded group">
            <CalendarClock size={25} strokeWidth={1} color={pathname === '/check-in' ? colors?.purple : colors?.black} />
            <Link href='/check-in' className="text-sm font-medium text-gray-500 group-hover:text-white">Check In</Link>
          </li>
        </ul>
        <button className="flex items-center justify-start gap-2" onClick={logout}>
          <LogOut size={30} strokeWidth={1} color={colors?.red} />
          <span className="text-red font-medium uppercase text-sm">Logout</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  )
}
