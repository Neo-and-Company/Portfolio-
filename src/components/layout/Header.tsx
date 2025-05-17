
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Added SheetTrigger
import { Menu, Home, UserCircle2, Briefcase, FolderGit2, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#about', icon: <Home className="h-4 w-4 mr-2 md:hidden" />, active: true },
  { label: 'About', href: '#about-details', icon: <UserCircle2 className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4 mr-2 md:hidden" /> },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent hover:opacity-80 transition-opacity">
          <div className="bg-accent text-accent-foreground h-10 w-10 flex items-center justify-center rounded-md font-bold text-xl">
            LP
          </div>
          <span className="hidden sm:inline">LinkPro</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors px-4 py-2 rounded-md ${
                item.active
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                  : 'text-muted-foreground hover:text-accent'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted focus-visible:bg-muted">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground border-l border-border/30 w-[280px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-accent text-lg flex items-center gap-2">
                  <div className="bg-accent text-accent-foreground h-8 w-8 flex items-center justify-center rounded-md font-bold">
                    LP
                  </div>
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-base font-medium transition-colors flex items-center px-3 py-2.5 rounded-md ${
                      item.active
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                        : 'text-muted-foreground hover:bg-muted hover:text-accent-foreground'
                    }`}
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
