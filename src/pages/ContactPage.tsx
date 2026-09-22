import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Mail } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

const ContactPage = () => {
  return (
    <Layout>
      <nav className="container py-3 border-b border-border">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3 w-3" />
          <li className="text-foreground font-medium">Contact</li>
        </ol>
      </nav>

      <PageHero
        title="Get in Touch"
        subtitle="Have a question, feedback, or want to collaborate? We'd love to hear from you. Our team is here to help."
      />

      {/* Contact Section */}
      <section className="container pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-center">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-red-600" />
                <h2 className="text-base font-semibold text-foreground">Email Editorial Desk</h2>
              </div>
              <a 
                href="mailto:independentaffairsnewsspectrum@gmail.com" 
                className="text-red-600 hover:underline text-sm font-medium break-all"
              >
                independentaffairsnewsspectrum@gmail.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                </svg>
                <h2 className="text-base font-semibold text-foreground">Phone / WhatsApp</h2>
              </div>
              <a 
                href="tel:+919441442403" 
                className="text-foreground hover:text-red-600 font-bold text-base"
              >
                +91 94414 42403
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-xl border border-border">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message..." rows={6} />
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
