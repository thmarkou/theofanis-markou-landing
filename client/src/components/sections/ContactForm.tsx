import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDictionary } from "@/hooks/useDictionary";
import { trpc } from "@/lib/trpc";

/**
 * We intentionally build a locale-aware Zod schema on the fly rather than
 * reusing the shared schema verbatim: the shared server schema carries
 * English error strings for server-side logs, while the form needs messages
 * matched to the user's selected language.
 */
function useContactFormSchema() {
  const { contact } = useDictionary();
  const { validation } = contact.form;

  return z.object({
    name: z.string().trim().min(2, validation.nameRequired),
    email: z.string().trim().email(validation.emailInvalid),
    company: z
      .string()
      .trim()
      .max(200)
      .optional()
      .or(z.literal("").transform(() => undefined)),
    message: z.string().trim().min(20, validation.messageTooShort).max(5000),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof useContactFormSchema>>;

export function ContactForm() {
  const { contact } = useDictionary();
  const { language } = useLanguage();
  const copy = contact.form;
  const schema = useContactFormSchema();
  const submitMutation = trpc.contact.submit.useMutation();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: ContactFormValues) {
    try {
      await submitMutation.mutateAsync({
        name: values.name,
        email: values.email,
        company: values.company,
        message: values.message,
        locale: language,
      });
      toast.success(copy.successTitle, { description: copy.successBody });
      form.reset();
    } catch (error) {
      const description =
        error instanceof Error && error.message ? error.message : copy.errorBody;
      toast.error(copy.errorTitle, { description });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        <div>
          <p className="section-kicker">{contact.kicker}</p>
          <h3 className="mt-3 font-heading text-2xl font-semibold text-white md:text-3xl">
            {copy.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/58">{copy.intro}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="section-kicker text-white/56">
                  {copy.nameLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    placeholder={copy.namePlaceholder}
                    className="h-12 rounded-[1rem] border-white/10 bg-white/[0.04] text-base text-white placeholder:text-white/28 focus-visible:border-[#82c4ff]/60 focus-visible:ring-[#82c4ff]/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="section-kicker text-white/56">
                  {copy.emailLabel}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={copy.emailPlaceholder}
                    className="h-12 rounded-[1rem] border-white/10 bg-white/[0.04] text-base text-white placeholder:text-white/28 focus-visible:border-[#82c4ff]/60 focus-visible:ring-[#82c4ff]/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="section-kicker text-white/56">
                {copy.companyLabel}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="organization"
                  placeholder={copy.companyPlaceholder}
                  className="h-12 rounded-[1rem] border-white/10 bg-white/[0.04] text-base text-white placeholder:text-white/28 focus-visible:border-[#82c4ff]/60 focus-visible:ring-[#82c4ff]/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="section-kicker text-white/56">
                {copy.messageLabel}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  placeholder={copy.messagePlaceholder}
                  className="resize-y rounded-[1rem] border-white/10 bg-white/[0.04] text-base leading-7 text-white placeholder:text-white/28 focus-visible:border-[#82c4ff]/60 focus-visible:ring-[#82c4ff]/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitMutation.isPending}
          className="executive-button w-full rounded-full px-7 py-6 text-sm tracking-[0.16em] uppercase"
        >
          {submitMutation.isPending ? copy.submitting : copy.submit}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
