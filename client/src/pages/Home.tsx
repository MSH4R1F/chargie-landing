import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chargie } from '@/components/Chargie';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Target, 
  Wallet, 
  CheckCircle2, 
  XCircle, 
  Camera, 
  Bell, 
  TrendingUp,
  ChevronDown,
  Apple,
  Quote,
  Shield,
  Clock,
  Users,
  Sparkles
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const testimonials = [
  {
    quote: "Having accountability forced me to pull through and accomplish the goals I had set out. I realized how easy it is for me to make an excuse and trick myself into thinking it's valid.",
    author: "Mahad",
    context: "On breaking through mental barriers"
  },
  {
    quote: "I've never locked in this much on my cut. There are countless times I would've folded, but the accountability kept me in a calorie deficit.",
    author: "Tayyab K.",
    context: "Lost 15lbs in 4 weeks"
  },
  {
    quote: "Friends + money covers all grounds. When I think I haven't done X, I sometimes don't mind losing money. But then I remember you guys. And sometimes it's the other way around.",
    author: "Hasnat",
    context: "On the power of dual accountability"
  },
  {
    quote: "Great challenge, forced some accountability. Nice that the goals were set properly. I've at least had trackable work done across the week.",
    author: "Amaan",
    context: "Hit 7-day streak"
  }
];

const stats = [
  { value: '84%', label: 'Success rate' },
  { value: '£1.5K', label: 'Staked this month' },
  { value: '3.2x', label: 'More likely to complete' }
];

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Chargie size={40} />
            <span className="font-heading font-bold text-xl">Chargie</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-how-it-works">How it Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-testimonials">Results</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors text-sm" data-testid="link-faq">FAQ</a>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 font-heading font-semibold" 
            onClick={() => setWaitlistOpen(true)}
            data-testid="button-nav-cta"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Join Waitlist
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeInUp} className="mb-8">
            <Chargie size={160} state="idle" className="mx-auto" />
          </motion.div>
          
          <motion.h1 
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            You've tried willpower.
            <br />
            <span className="text-gradient">What if you tried money?</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Losing £50 hurts twice as much as gaining £50 feels good. 
            Chargie uses your brain against your excuses.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-heading font-semibold text-lg px-8 py-6 glow-violet"
              onClick={() => setWaitlistOpen(true)}
              data-testid="button-hero-cta"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Join the Waitlist
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-muted-foreground hover:text-foreground font-heading"
              data-testid="button-hero-secondary"
            >
              See How It Works
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.p 
            className="text-sm text-muted-foreground mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Free to download. Only pay when you're ready to commit.
          </motion.p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border/50 bg-card/50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-3 gap-8 text-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="font-heading text-3xl md:text-4xl font-bold text-gradient" data-testid={`stat-value-${i}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Motivation fades. Money doesn't.
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Other apps track habits. We enforce them. Set a goal, put money on it, 
            and watch how quickly "I'll do it tomorrow" turns into "I'm doing it now."
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Target,
                title: "Set a goal you care about",
                description: "Wake up at 6am. Hit the gym 5x/week. Read for 30 minutes. You decide what matters."
              },
              {
                icon: Wallet,
                title: "Put money on it",
                description: "£10 to £100, your choice. The bigger the stake, the bigger the motivation."
              },
              {
                icon: CheckCircle2,
                title: "Hit it or lose it",
                description: "Submit photo proof before your deadline. Miss it? Your money goes to charity."
              }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-8 bg-card border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3" data-testid={`step-title-${i}`}>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            No excuses. No gaming the system.
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Chargie is your accountability partner who doesn't accept "I forgot" or "I'll start Monday."
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Camera,
                title: "Photo Verification",
                description: "Submit proof. We verify timestamps and location. No gaming the system."
              },
              {
                icon: Bell,
                title: "Persistent Reminders",
                description: "Morning nudges. Evening warnings. Your money on the line every single day."
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "See your streak. See your stake. See exactly what you'll lose if you quit."
              },
              {
                icon: Users,
                title: "Friend Accountability",
                description: "Add friends to your challenge. When the money doesn't motivate, letting them down will."
              }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-6 bg-card/50 border-border/50 hover:bg-card transition-all duration-300 flex gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold mb-1" data-testid={`feature-title-${i}`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Real results from real people
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Don't take our word for it.
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-6 bg-card border-border/50 h-full relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                  <p className="text-foreground mb-4 relative z-10" data-testid={`testimonial-quote-${i}`}>
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">
                        {testimonial.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.context}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-card/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 
            className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Questions? We've got answers.
          </motion.h2>

          <motion.div 
            className="space-y-4"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                q: "What happens to my money if I fail?",
                a: "It's donated to charity. You can't get it back. That's the point."
              },
              {
                q: "Can I cheat the verification?",
                a: "We use timestamps, location data, and photo analysis. Gaming the system is harder than doing the habit."
              },
              {
                q: "What if something unexpected happens?",
                a: "Life happens. We have grace periods for genuine emergencies, but not for excuses."
              },
              {
                q: "How much should I stake?",
                a: "Enough that losing it would hurt. For most people, that's £25-50. Users who stake £50+ are 3x more likely to complete their goals."
              }
            ].map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="p-6 bg-card border-border/50">
                  <h3 className="font-heading font-semibold mb-2" data-testid={`faq-question-${i}`}>
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Chargie size={140} state="idle" className="mx-auto mb-8" />
          </motion.div>
          
          <motion.h2 
            className="font-heading text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to put your money
            <br />
            <span className="text-gradient">where your goals are?</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Stop making excuses. Start making progress.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-heading font-semibold text-lg px-10 py-7 glow-violet"
              onClick={() => setWaitlistOpen(true)}
              data-testid="button-final-cta"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Join the Waitlist
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Free to try. Only pay when you're ready to commit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Chargie size={32} />
              <span className="font-heading font-bold">Chargie</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Chargie. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
