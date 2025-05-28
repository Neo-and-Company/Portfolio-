import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
          <Link href="https://github.com/Gabeleo24" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="h-5 w-5 text-muted-foreground hover:text-[#333333] hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="h-5 w-5 text-muted-foreground hover:text-[#0077B5] hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="mailto:gabrielleolukotun@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <FaEnvelope className="h-5 w-5 text-muted-foreground hover:text-[#EA4335] hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
