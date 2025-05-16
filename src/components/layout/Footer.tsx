import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:px-6 max-w-screen-lg">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LinkPro. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            LinkPro by Gabriel.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-accent transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
