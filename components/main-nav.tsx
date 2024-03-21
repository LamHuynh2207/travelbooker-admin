"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.userId}`,
      label: 'Overview',
      active: pathname === `/${params.userId}`,
    },
    {
      href: `/${params.userId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.userId}/billboards`,
    },
    {
      href: `/${params.userId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.userId}/categories`,
    },
    {
      href: `/${params.userId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.userId}/sizes`,
    },
    {
      href: `/${params.userId}/colors`,
      label: 'Colors',
      active: pathname === `/${params.userId}/colors`,
    },
    {
      href: `/${params.userId}/products`,
      label: 'Products',
      active: pathname === `/${params.userId}/products`,
    },
    {
      href: `/${params.userId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.userId}/orders`,
    },
    {
      href: `/${params.userId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.userId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};