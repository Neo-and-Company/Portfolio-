import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Briefcase, FolderGit2, UserCircle2, Mail } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about', icon: <UserCircle2 className="h-4 w-4 mr-2" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="h-4 w-4 mr-2" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4 mr-2" /> },
];

const Header = () => {
  return (
    <header className="sticky top-4 z-50 w-full max-w-screen-lg mx-auto rounded-xl shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          LinkPro
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors flex items-center"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
