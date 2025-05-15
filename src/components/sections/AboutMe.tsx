import Image from 'next/image';
import { UserCircle2, Briefcase, Zap, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const AboutMe = () => {
  const skills = ["Data Science", "Machine Learning", "Software Engineering", "Python", "Next.js", "Cloud Computing"];

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 bg-card section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <div className="grid gap-10 md:grid-cols-3 items-center">
          <div className="md:col-span-1 flex justify-center">
            <Image
              src="https://placehold.co/240x240.png"
              alt="Professional Headshot"
              width={240}
              height={240}
              className="rounded-full shadow-lg"
              data-ai-hint="professional headshot"
            />
          </div>
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-sm">Hello, I'm LinkPro User</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                Innovative Data Scientist & Engineer
              </h1>
              <p className="text-lg text-foreground">
                Passionate about leveraging data to drive impactful solutions and build cutting-edge applications. With a strong foundation in machine learning, software development, and cloud technologies, I thrive on transforming complex challenges into actionable insights and robust products.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary flex items-center">
                <Zap className="mr-2 h-5 w-5 text-accent" />
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                Career Goals
              </h3>
              <p className="text-foreground">
                Seeking to contribute to a dynamic team focused on innovation and growth, where I can apply my expertise in data science and engineering to solve real-world problems and drive technological advancement. Eager to explore leadership opportunities and mentor aspiring tech professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
