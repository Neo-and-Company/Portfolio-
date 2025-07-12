
"use client";

import { useEffect, useTransition } from 'react';
import { useActionState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
    <section id="contact" className="w-full py-28 md:py-40 relative z-10 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-6 font-mono">
            Ready to Hire or Partner?
          </h2>
          <div className="h-2 w-48 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-mono leading-relaxed">
            Seeking full-time data science roles or consulting partnerships. Let's discuss how my expertise in advanced analytics and machine learning can accelerate your organization's growth and innovation.
          </p>
        </div>

        {/* Contact Section with improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-mono">Contact Information</h3>
              <p className="text-gray-600 font-mono leading-relaxed">
                Available for immediate hire or project collaboration. Let's discuss opportunities to work together.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 font-mono">Phone</p>
                <div className="flex items-center text-gray-900">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <a href="tel:+16197141285" className="text-lg font-mono hover:text-blue-600 transition-colors duration-300">
                    (619) 714-1285
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 font-mono">Email</p>
                <div className="flex items-center text-gray-900">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <a href="mailto:gabrielmancillas1034@icloud.com" className="text-lg font-mono hover:text-green-600 transition-colors duration-300">
                    gabrielmancillas1034@icloud.com
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 font-mono">LinkedIn Profile</p>
                <Link
                  href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <FaLinkedin className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-lg font-mono">LinkedIn Profile</span>
                </Link>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 font-mono">GitHub Profile</p>
                <Link
                  href="https://github.com/Gabeleo24"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-900 hover:text-gray-700 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-colors duration-300">
                    <FaGithub className="h-6 w-6 text-gray-700" />
                  </div>
                  <span className="text-lg font-mono">GitHub Profile</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 font-mono flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                Contact Me
              </h3>
              <p className="text-gray-600 font-mono leading-relaxed">
                Interested in hiring me or discussing a partnership? Let's connect!
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2 block font-mono">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          {...field}
                          className="h-12 border-gray-300 rounded-xl font-mono text-lg focus:border-primary focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage className="text-sm font-mono text-red-600 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email" className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2 block font-mono">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@gmail.com"
                          {...field}
                          className="h-12 border-gray-300 rounded-xl font-mono text-lg focus:border-primary focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage className="text-sm font-mono text-red-600 mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2 block font-mono">
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Hi! I'm interested in hiring you for... / I'd like to discuss a partnership..."
                          {...field}
                          className="min-h-[140px] border-gray-300 rounded-xl font-mono text-lg resize-none focus:border-primary focus:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage className="text-sm font-mono text-red-600 mt-1" />
                    </FormItem>
                  )}
                />

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isTransitionPending}
                    className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold rounded-xl transition-all duration-300 font-mono text-lg flex items-center justify-center"
                    style={{
                      color: '#ffffff !important',
                      textShadow: 'none !important'
                    }}
                  >
                    {isTransitionPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" style={{ color: '#ffffff !important' }} />
                        <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                          Sending Message...
                        </span>
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" style={{ color: '#ffffff !important' }} />
                        <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                          Send Message
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
