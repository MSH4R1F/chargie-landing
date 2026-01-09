import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chargie } from './Chargie';
import { X, CheckCircle2, Loader2, Mail, Sparkles } from 'lucide-react';

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [position, setPosition] = useState(0);
  const [totalCount, setTotalCount] = useState(246);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist/count');
        if (response.ok) {
          const data = await response.json();
          setTotalCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
      }
    };

    if (open) {
      fetchCount();
    }
  }, [open]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrorMessage('Email is required');
      setStatus('error');
      return;
    }
    
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to join waitlist');
        setStatus('error');
        return;
      }

      setPosition(data.position);
      setStatus('success');
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after animation
    setTimeout(() => {
      setEmail('');
      setStatus('idle');
      setErrorMessage('');
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 p-0 overflow-hidden">
        <DialogTitle className="sr-only">Join the Waitlist</DialogTitle>
        
        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative p-8">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                >
                  <Chargie size={120} state="success" className="mx-auto mb-6" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-heading text-2xl font-bold mb-2" data-testid="text-success-title">
                    You're on the list!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We'll notify you when Chargie launches.
                    <br />
                    Get ready to put your money where your goals are.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-heading font-medium">Position #{position} in queue</span>
                  </div>
                </motion.div>
                
                <Button 
                  onClick={handleClose}
                  className="mt-8 bg-primary hover:bg-primary/90 font-heading"
                  data-testid="button-success-close"
                >
                  Got it
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-6">
                  <Chargie size={80} state="idle" className="mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold mb-2">
                    Get early access
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Join the waitlist and be first to put your money on your goals.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') {
                          setStatus('idle');
                          setErrorMessage('');
                        }
                      }}
                      className={`pl-11 h-12 bg-background border-border/50 focus:border-primary font-sans ${
                        status === 'error' ? 'border-destructive' : ''
                      }`}
                      disabled={status === 'loading'}
                      data-testid="input-waitlist-email"
                    />
                  </div>
                  
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-destructive"
                        data-testid="text-error-message"
                      >
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 font-heading font-semibold glow-violet"
                    disabled={status === 'loading'}
                    data-testid="button-waitlist-submit"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      'Join the Waitlist'
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  No spam. Just one email when we launch.
                </p>

                {/* Social proof */}
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex -space-x-2">
                      {['M', 'T', 'H', 'A'].map((letter, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center"
                        >
                          <span className="text-xs font-heading font-bold text-primary">
                            {letter}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground font-medium">{totalCount} {totalCount === 1 ? 'person' : 'people'}</span> already waiting
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
