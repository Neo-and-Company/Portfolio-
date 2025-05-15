"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { submitContactForm, type ContactFormState } from "@/lib/actions";
import { Mail, Send, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

const ContactForm = () => {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

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
      if (state.success) {
        form.reset({ name: "", email: "", message: ""});
      }
    }
    // Update form default values if server state changes (e.g. validation errors preserve input)
    form.reset(state.fieldValues);

  }, [state, toast, form]);


  // This function is needed to bridge react-hook-form with useFormState action
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    formAction(formData);
  };


  return (
    <section id="contact" className="w-full py-16 md:py-24 bg-card section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-12">
          Get In Touch
        </h2>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-6 w-6 text-accent" />
              Contact Me
            </CardTitle>
            <CardDescription>
              Have a question or want to work together? Fill out the form below.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
             {/* We use form.handleSubmit to trigger client-side validation first */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage>{state.errors?.name?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage>{state.errors?.email?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message">Your Message</FormLabel>
                      <FormControl>
                        <Textarea id="message" placeholder="Hi there, I'd like to discuss..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage>{state.errors?.message?.[0]}</FormMessage>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                 <SubmitButton />
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
};

export default ContactForm;
