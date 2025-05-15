"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateProfileDescription, type ProfileDescriptionInput } from "@/ai/flows/profile-description-generator";
import { Loader2, Wand2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  skills: z.string().min(10, "Please provide a comprehensive list of your skills (min 10 characters)."),
  jobExperiences: z.string().min(50, "Please describe your job experiences in detail (min 50 characters)."),
});

type FormData = z.infer<typeof formSchema>;

const ProfileImprover = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: "",
      jobExperiences: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedDescription(null);
    try {
      const input: ProfileDescriptionInput = {
        skills: data.skills,
        jobExperiences: data.jobExperiences,
      };
      const result = await generateProfileDescription(input);
      setGeneratedDescription(result.profileDescription);
      toast({
        title: "Profile Improved!",
        description: "Your new profile description has been generated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating profile description:", error);
      toast({
        title: "Error",
        description: "Failed to generate profile description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="improver" className="w-full py-16 md:py-24 bg-background section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-12">
          AI Profile Improver
        </h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wand2 className="mr-2 h-6 w-6 text-accent" />
              Enhance Your Profile
            </CardTitle>
            <CardDescription>
              Provide your skills and job experiences, and our AI will generate a concise and professional profile description for you.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="skills" className="text-lg">Your Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          id="skills"
                          placeholder="e.g., Python, JavaScript, Project Management, Data Analysis, Cloud Computing..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobExperiences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="jobExperiences" className="text-lg">Your Job Experiences</FormLabel>
                      <FormControl>
                        <Textarea
                          id="jobExperiences"
                          placeholder="Describe your roles, responsibilities, and achievements in previous jobs..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Improve Profile
                </Button>
              </CardFooter>
            </form>
          </Form>
          {generatedDescription && (
            <CardContent className="mt-6 border-t pt-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Generated Profile Description:</h3>
              <div className="p-4 bg-muted rounded-md whitespace-pre-wrap text-foreground">
                {generatedDescription}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
};

export default ProfileImprover;
