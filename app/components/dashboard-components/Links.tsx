'use client';

import React  from 'react';
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LinksProps {
  id: number;
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
}

export const dashboardLinks: LinksProps[] = [
  {
    id: 0,
    name: 'Event Types',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    id: 1,
    name: 'Meetings',
    href: '/dashboard/meetings',
    icon: Users2,
  },
  {
    id: 2,
    name: 'Availablity',
    href: '/dashboard/availability',
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

const Links = () => {
//   const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
};

  return (
    <>
      {dashboardLinks?.map((link) => (
        <button
          className={cn(
            path === link.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground',
            'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
          )}
          key={link.id}
          onClick={() => handleClick(link.href)}
          
          onMouseEnter={() => router.prefetch(link.href)}
        >
          <link.icon className="size-4" />
          { link.name}
        </button>
      ))}
    </>
  );
};

export default Links;
