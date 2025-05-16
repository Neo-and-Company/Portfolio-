
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Briefcase, FolderGit2, UserCircle2, Mail, HomeIcon as Home } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#about', icon: <Home className="h-4 w-4 mr-2" />, active: true },
  { label: 'About', href: '#about-details', icon: <UserCircle2 className="h-4 w-4 mr-2" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="h-4 w-4 mr-2" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="h-4 w-4 mr-2" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4 mr-2" /> },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full sm:mt-3 sm:rounded-xl sm:max-w-[calc(100%-2rem)] lg:max-w-screen-xl mx-auto bg-background/85 backdrop-blur-lg shadow-md border-border/20 border">
      <div className="container mx-auto flex h-16 w-full items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          LinkPro
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors flex items-center px-3 py-1.5 rounded-md ${
                item.active
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' // Active
                  : 'text-foreground hover:bg-accent/20' // Inactive
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-accent/20 focus-visible:bg-accent/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground border-l border-border/30">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-lg font-medium transition-colors flex items-center px-3 py-2 rounded-md ${
                      item.active
                        ? 'bg-accent text-accent-foreground hover:bg-accent/90' // Active
                        : 'text-foreground hover:bg-accent/20' // Inactive
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
