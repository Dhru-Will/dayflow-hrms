'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AvatarDropdown from './AvatarDropdown';

const navigationItems = [
  { href: '/employees', label: 'Employees' },
  { href: '/attendance', label: 'Attendance' },
  { href: '/time-off', label: 'Time Off' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-dark-surface border-b border-dark-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-3">
            <Link href="/employees" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dayflow HRMS
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? 'bg-primary-600/20 text-primary-400'
                        : 'text-dark-textSecondary hover:text-dark-text hover:bg-dark-surfaceHover'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Avatar Dropdown */}
          <AvatarDropdown />
        </div>
      </div>
    </nav>
  );
}

