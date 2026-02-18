import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ryanrehan.pc@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ryanrehan.pc@gmail.com",
  },
  {
    icon: Phone,
    label: "Whatsapp",
    value: "+8801722414475",
    href: "https://wa.me/8801722414475",
  },
  {
    icon: MapPin,
    label: "From",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka,Bangladesh",
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/codeSmith-006" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ryanrehan06/" },
  {
    icon: Mail,
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=ryanrehan.pc@gmail.com",
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ryanrehan.pc@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            _subject: `Portfolio Contact: ${data.subject}`,
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full px-4 sm:px-8 py-8">
      <Toaster position="top-right" richColors theme="dark" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full border-b border-white/20 overflow-hidden"
        style={{ minHeight: "80vh" }}
      >
        <div className="text-center px-6 pt-14 pb-10 border-b border-white/10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.45 }}
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "12px",
            }}
          >
            Contact
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              margin: "0 0 18px 0",
            }}
          >
            GET IN <span className="main-color instrumental-font">TOUCH</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.55 }}
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              maxWidth: "720px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind or just want to say hello? Let&apos;s build
            something useful together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 px-5 sm:px-8 py-8 sm:py-10">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="space-y-6"
          >
            <div className="rounded-md  bg-white/[0.02] p-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-white/65 leading-relaxed">
                I&apos;m open to internships, freelance collaboration, and
                product discussions.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-md  bg-white/[0.02] p-4 hover:border-[#B7FD5B]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#B7FD5B]/60 text-[#B7FD5B] flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/45">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base text-white/85">{item.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-[#B7FD5B] hover:border-[#B7FD5B]/50 transition-colors flex items-center justify-center"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.45 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md border border-white/10 bg-white/[0.02] p-6 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register("name", { required: "Name is required" })}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                {...register("subject", { required: "Subject is required" })}
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                placeholder="Tell me about your project..."
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message must be at least 10 characters" },
                })}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
