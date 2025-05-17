
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home as HomeIcon, UserCircle2, Briefcase, FolderGit2, Mail } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#about', icon: <HomeIcon className="h-4 w-4 mr-2 md:hidden" />, active: true },
  { label: 'About', href: '#about-details', icon: <UserCircle2 className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="h-4 w-4 mr-2 md:hidden" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="h-4 w-4 mr-2 md:hidden" /> },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full sm:mt-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6
                      bg-background/85 backdrop-blur-lg border border-border/30 shadow-lg
                      sm:rounded-xl sm:max-w-3xl lg:max-w-5xl">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <div className="bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center rounded-md font-bold text-lg sm:h-9 sm:w-9">
            LP
          </div>
          <span className="hidden sm:inline">LinkPro</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button key={item.label} variant={item.active ? "default" : "ghost"} size="sm" asChild
                    className={`text-sm font-medium transition-colors px-3 py-1.5 rounded-md
                                ${item.active
                                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                                  : 'text-foreground hover:bg-accent/20 hover:text-accent-foreground'
                                }`}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </Button>
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
            <SheetContent side="right" className="bg-background text-foreground border-l border-border/30 w-[280px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle> {/* Visually hidden title */}
                 <div className="flex items-center gap-2 text-xl font-bold text-primary mb-0"> {/* Adjusted for logo in mobile */}
                    <div className="bg-primary text-primary-foreground h-8 w-8 flex items-center justify-center rounded-md font-bold">
                        LP
                    </div>
                    LinkPro
                </div>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-6"> {/* Added mt-6 to push nav down */}
                {navItems.map((item) => (
                   <Button key={item.label} variant={item.active ? "default" : "ghost"} asChild
                           className={`text-base font-medium flex items-center justify-start px-3 py-2.5 rounded-md w-full
                                       ${item.active
                                        ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                                        : 'text-foreground hover:bg-accent/20 hover:text-accent-foreground'
                                      }`}>
                    <Link href={item.href}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
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
