import Link from 'next/link';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { LiquidGlassCard, LiquidGlassText } from '@/components/ui/LiquidGlass';

const Footer = () => {
  return (
    <footer className="w-full py-8">
      <LiquidGlassCard className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:px-6 max-w-screen-lg"
        config={{
          opacity: 0.12,
          blur: 32,
          saturation: 125,
          brightness: 108,
          shadowIntensity: 0.04
        }}
      >
        <div className="text-center md:text-left">
          <LiquidGlassText variant="secondary" as="p" className="text-sm">
            &copy; {new Date().getFullYear()} Gabriel Mancillas Portfolio. All rights reserved.
          </LiquidGlassText>
          <LiquidGlassText variant="secondary" as="p" className="text-xs mt-1">
            Data Science Graduate Student & Strategic Innovator
          </LiquidGlassText>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/Gabeleo24" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="h-5 w-5 text-muted-foreground hover:text-[#333333] hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin className="h-5 w-5 text-muted-foreground hover:text-[#0077B5] hover:scale-110 transition-all duration-300" />
          </Link>
          <Link href="mailto:gabrielmancillas1034@icloud.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
            <FaEnvelope className="h-5 w-5 text-muted-foreground hover:text-[#EA4335] hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </LiquidGlassCard>
    </footer>
  );
};

export default Footer;
