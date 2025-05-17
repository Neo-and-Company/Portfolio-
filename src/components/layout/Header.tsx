
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#about' }, 
  { label: 'About', href: '#experience' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="py-6 px-4 sm:px-6 lg:px-16 fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-foreground">
          G.
        </Link>

        <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm ${
                pathname === item.href || (item.href === "#about" && (pathname === "/" || pathname.startsWith("/#")))
                  ? 'text-accent font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Search" className="text-muted-foreground hover:text-foreground">
            <Search className="h-6 w-6" />
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-muted-foreground hover:text-foreground">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground w-[280px] p-0">
              <SheetHeader className="p-6 border-b border-border/20">
                <SheetTitle className="text-left text-2xl font-extrabold text-foreground">G.</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-lg py-3 px-3 rounded-md ${
                      pathname === item.href || (item.href === "#about" && (pathname === "/" || pathname.startsWith("/#")))
                        ? 'bg-accent/20 text-accent font-semibold'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    } transition-colors`}
                  >
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
