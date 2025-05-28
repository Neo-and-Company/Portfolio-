
"use client";

import { useState, useEffect, useTransition } from 'react';
import { useActionState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send, Loader2, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

// Contact form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type FormData = z.infer<typeof formSchema>;

const initialState: ContactFormState = {
  message: "",
  success: false,
  errors: {},
  fieldValues: { name: "", email: "", message: "" }
};

function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

const ContactSection = () => {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const [isTransitionPending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: state.fieldValues?.name || "",
      email: state.fieldValues?.email || "",
      message: state.fieldValues?.message || "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
        icon: state.success ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    }

    if (state.success) {
      form.reset({ name: "", email: "", message: "" });
      form.clearErrors();
    } else if (state.errors) {
      Object.entries(state.errors).forEach(([fieldName, fieldErrors]) => {
        if (fieldErrors && fieldErrors.length > 0) {
          form.setError(fieldName as keyof FormData, {
            type: 'server',
            message: fieldErrors[0],
          });
        }
      });
      if (state.fieldValues) {
        form.reset(state.fieldValues, { keepErrors: true });
      }
    } else if (state.fieldValues && !state.success && state.message) {
      form.reset(state.fieldValues);
    }
  }, [state, toast, form]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <section id="contact" className="w-full py-16 md:py-24 relative z-10 section-fade-in bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-center mb-12 text-foreground font-mono">
          Get In Touch
        </h2>

        {/* Contact Section with CTA and Form side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* CTA Box - Styled to match Card component structure */}
          <div className="bg-gradient-to-br from-primary to-blue-500 rounded-xl shadow-lg text-white flex flex-col h-full overflow-hidden">
            <div className="px-6 py-6 border-b border-white/10"> {/* Matches CardHeader padding */}
              <h3 className="text-2xl font-bold font-mono flex items-center">
                <Phone className="mr-2 h-6 w-6" />
                Let's Connect
              </h3>
              <p className="text-sm text-white/80 mt-1 font-mono">
                If I don't respond to your message within 24 hours, please call me directly!
              </p>
            </div>

            <div className="px-6 py-6 flex-grow flex flex-col justify-between"> {/* Matches CardContent padding */}
              <div className="space-y-6"> {/* Matches form field spacing */}
                <div className="space-y-2"> {/* Matches FormItem spacing */}
                  <p className="text-sm font-medium font-mono">Phone</p>
                  <div className="flex items-center text-white/90 h-10"> {/* Matches Input height */}
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="font-mono">+1 (555) 123-4567</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium font-mono">Email</p>
                  <div className="flex items-center text-white/90 h-10">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="font-mono">gabrielmancillas1034@icloud.com</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium font-mono">Social</p>
                  <div className="space-y-3">
                    <Link
                      href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-mono h-10"
                    >
                      <FaLinkedin className="h-5 w-5 mr-3 flex-shrink-0 text-[#0077B5]" />
                      <span>LinkedIn Profile</span>
                    </Link>
                    <Link
                      href="https://github.com/Gabeleo24"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-mono h-10"
                    >
                      <FaGithub className="h-5 w-5 mr-3 flex-shrink-0 text-white" />
                      <span>GitHub Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <Card className="shadow-lg h-full flex flex-col overflow-hidden">
            <CardHeader className="px-6 py-6 border-b border-border/40">
              <CardTitle className="text-2xl font-bold flex items-center font-mono">
                <Mail className="mr-2 h-6 w-6 text-accent" />
                Contact Me
              </CardTitle>
              <CardDescription className="text-sm mt-1 font-mono">
                Have a question or want to work together? Fill out the form below.
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
                <CardContent className="px-6 py-6 flex-grow">
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="name" className="text-sm font-medium font-mono">Full Name</FormLabel>
                          <FormControl>
                            <Input id="name" placeholder="John Doe" {...field} className="h-10 font-mono" />
                          </FormControl>
                          <FormMessage className="text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="email" className="text-sm font-medium font-mono">Email Address</FormLabel>
                          <FormControl>
                            <Input id="email" type="email" placeholder="john.doe@example.com" {...field} className="h-10 font-mono" />
                          </FormControl>
                          <FormMessage className="text-xs font-mono" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel htmlFor="message" className="text-sm font-medium font-mono">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              id="message"
                              placeholder="Hi there, I'd like to discuss..."
                              {...field}
                              className="min-h-[120px] resize-none font-mono"
                            />
                          </FormControl>
                          <FormMessage className="text-xs font-mono" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>

                <CardFooter className="px-6 py-6 border-t border-border/40">
                  <SubmitButton isLoading={isTransitionPending} />
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
