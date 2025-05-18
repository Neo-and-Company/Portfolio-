
import Image from 'next/image';

const AboutMe = () => {
  return (
    <main
      id="about" // This ID is used for navigation
      className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-background text-foreground section-fade-in" // Changed pt-32 to pt-24
    >
      <div className="container mx-auto grid md:grid-cols-12 gap-x-8 items-center relative z-10">
        {/* Giant Name Background */}
        <div className="hero-name-display md:col-span-3 lg:col-span-4 text-center md:text-left select-none
                        absolute md:relative inset-0 md:inset-auto
                        flex flex-col justify-center items-center md:items-start
                        -z-10 md:z-0 opacity-05 md:opacity-10 pointer-events-none">
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl break-words">
            GABRIEL
          </h1>
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl -mt-2 sm:-mt-2 md:-mt-3 lg:-mt-4 break-words">
            ELOHI
          </h1>
        </div>

        {/* Image - column for image */}
        <div className="md:col-span-7 lg:col-span-6 flex justify-center relative order-first md:order-none my-8 md:my-0
                        md:-ml-4 lg:-ml-6 xl:-ml-8"> {/* Adjusted negative margins for wider image */}
          <div className="relative z-10 w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]">
             <Image
              src="/DSC02786.png"
              alt="Gabriel Elohi Mancillas Gallardo"
              fill={true}
              className="object-cover" 
              data-ai-hint="professional headshot"
              priority
            />
          </div>
        </div>
            
        {/* Details Block - column for text details */}
        <div className="md:col-span-3 lg:col-span-3 text-center md:text-left relative z-0 md:pl-0 lg:pl-0 order-last md:order-none"> 
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-1 tracking-wide">
            INNOVATIVE DATA SCIENTIST & ENGINEER
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-4 mx-auto md:mx-0"></div> {/* Role underline */}
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights.
          </p>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
            Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
          </p>
          <button className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-3 px-8 rounded-lg text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-opacity-50">
            SEE MORE
          </button>
        </div>
      </div>

      {/* Decorative Circles - adjusted z-index and opacity for subtlety */}
      <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-accent rounded-full opacity-20 pointer-events-none -z-20 blur-lg"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-primary/70 rounded-full opacity-05 pointer-events-none -z-20 blur-2xl"></div>
    </main>
  );
};

export default AboutMe;
