
"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { BookOpenCheck, LayoutDashboard, LogOut, User, ChevronsUpDown, FolderKanban } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
    }
    if (email) {
      return email[0].toUpperCase();
    }
    return 'L';
  }
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 pl-2">
          <BookOpenCheck className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-2xl font-bold group-data-[collapsible=icon]:hidden bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">EduSync</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip="Dashboard">
              <Link href="/dashboard">
                <LayoutDashboard />
                <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith('/dashboard/subjects')} tooltip="Subjects">
              <Link href="/dashboard/subjects">
                <FolderKanban />
                <span className="group-data-[collapsible=icon]:hidden">Subjects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2 bg-border/50" />
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground">
                 <Avatar className="h-8 w-8 border-2 border-primary/50">
                  <AvatarImage src={user.photoURL || ''} alt="User avatar" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">{getInitials(user.displayName, user.email)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-semibold leading-none">
                        {user.displayName || 'Learner'}
                    </p>
                    <p className="text-xs font-normal leading-none text-muted-foreground">
                        {user.email}
                    </p>
                </div>
                <ChevronsUpDown className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mb-2" align="end" side="top" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName || 'Learner'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
