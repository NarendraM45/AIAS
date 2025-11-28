import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { AuthPanel } from '@/components/AuthPanel';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mic, Zap, Shield, Clock } from 'lucide-react';

const Landing = () => {
  const [authPanelOpen, setAuthPanelOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 overflow-hidden">
        <Header onAuthClick={() => setAuthPanelOpen(true)} />
        
        {/* Navigation Links */}
        <div className="fixed top-20 right-6 z-20 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection('features')}
            className="bg-background/80 backdrop-blur-sm border-border hover:border-electric"
          >
            Features
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection('how-it-works')}
            className="bg-background/80 backdrop-blur-sm border-border hover:border-electric"
          >
            How it Works
          </Button>
        </div>

        <main className="pt-24 pb-16">
          {/* Hero Section with Illustration */}
          <section className="container mx-auto px-6 py-20 relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-electric/20 to-teal/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-teal/20 to-electric/20 rounded-full blur-3xl -z-10" />
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric/10 border border-electric/20 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
                  </span>
                  <span className="text-sm font-medium text-electric">AI-Powered</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-electric to-teal bg-clip-text text-transparent">
                    Transform Audio
                  </span>
                  <br />
                  <span className="text-foreground">Into Intelligence</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  RSENIC uses advanced AI to turn your audio recordings into searchable, 
                  intelligent summaries. Save time, boost productivity, never miss a detail.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    onClick={() => setAuthPanelOpen(true)}
                    size="lg"
                    className="bg-gradient-to-r from-electric to-teal hover:opacity-90 text-white text-lg px-8 py-6 glow-electric"
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6"
                  >
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-electric" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-electric" />
                    <span>Fast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-electric" />
                    <span>Time-saving</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-gradient-to-br from-navy/50 via-electric/10 to-teal/10 backdrop-blur-sm">
                  <div className="aspect-square p-12 flex flex-col items-center justify-center relative">
                    {/* Central Microphone Illustration */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                      className="relative z-10"
                    >
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-electric to-teal glow-electric flex items-center justify-center">
                        <Mic className="w-16 h-16 text-white" />
                      </div>
                    </motion.div>

                    {/* Orbiting Elements */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 10 + i * 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          width: 150 + i * 40,
                          height: 150 + i * 40,
                        }}
                      >
                        <div className="relative w-full h-full">
                          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${
                            i === 0 ? 'bg-electric' : i === 1 ? 'bg-teal' : 'bg-electric/50'
                          }`} />
                        </div>
                      </motion.div>
                    ))}

                    {/* Floating Cards */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute top-8 right-8 bg-card border border-border rounded-lg p-3 shadow-lg"
                    >
                      <Zap className="w-6 h-6 text-electric" />
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      className="absolute bottom-8 left-8 bg-card border border-border rounded-lg p-3 shadow-lg"
                    >
                      <Clock className="w-6 h-6 text-teal" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Grid with Illustrations */}
          <section id="features" className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Why Choose <span className="bg-gradient-to-r from-electric to-teal bg-clip-text text-transparent">RSENIC</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experience the future of audio processing with our powerful AI-driven features
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: 'Lightning Fast Processing',
                  description: 'Transform hours of audio into concise summaries in seconds with our advanced AI engine',
                  color: 'from-electric to-teal',
                  delay: 0.5
                },
                {
                  icon: Shield,
                  title: 'Bank-Level Security',
                  description: 'Your data is encrypted end-to-end and never shared with third parties. Privacy guaranteed.',
                  color: 'from-teal to-electric',
                  delay: 0.6
                },
                {
                  icon: Clock,
                  title: 'Save Valuable Time',
                  description: 'Get instant summaries with timestamps, key insights, and searchable content at your fingertips',
                  color: 'from-electric/80 to-teal/80',
                  delay: 0.7
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-teal/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative bg-card border border-border rounded-2xl p-8 h-full hover:border-electric/50 transition-all">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} glow-electric flex items-center justify-center mb-6`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Visual Process Flow */}
          <section id="how-it-works" className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                How It <span className="bg-gradient-to-r from-electric to-teal bg-clip-text text-transparent">Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your audio
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Upload Audio', desc: 'Drop your file or record directly' },
                { step: '02', title: 'AI Processing', desc: 'Our AI analyzes and summarizes' },
                { step: '03', title: 'Get Insights', desc: 'Search, chat, and explore results' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className="relative text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-electric to-teal glow-electric mb-4 text-2xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-electric to-transparent -z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        </main>

      <AuthPanel isOpen={authPanelOpen} onClose={() => setAuthPanelOpen(false)} />
      <Footer />
    </div>
  );
};

export default Landing;
