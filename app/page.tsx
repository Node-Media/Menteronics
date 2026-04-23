'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Code, Zap, Users, Star, CheckCircle, Globe, Smartphone, Database, Menu, X } from 'lucide-react';
import Image from 'next/image';

const NAV_ITEMS = [
  { label: 'Learn', href: 'https://learn.menteronics.tech', external: true },
  { label: 'About', id: 'about', href: '#about' },
  { label: 'Testimonials', id: 'testimonials', href: '#testimonials' },
  { label: 'Contact', id: 'contact', href: '#contact' },
];

const TRUST_ITEMS = [
  { value: '10K+', label: 'Learners' },
  { value: '100%', label: 'Internship Guranteed' },
  { value: 'Live', label: 'Mentorship' },
  { value: '500+', label: 'Projects Built' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlackTheme, setIsBlackTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('courses');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Scroll listener for theme transition
  useEffect(() => {
    const handleScroll = () => {
      const coursesSection = document.getElementById('courses');
      if (!coursesSection) return;

      const coursesRect = coursesSection.getBoundingClientRect();
      const shouldBeBlack = coursesRect.top <= window.innerHeight * 0.3;

      if (shouldBeBlack !== isBlackTheme) {
        setIsBlackTheme(shouldBeBlack);
        // Update body class for smooth transition
        document.body.className = document.body.className
          .replace(/bg-(white|black)-theme/g, '')
          .trim() + ` ${shouldBeBlack ? 'bg-black-theme' : 'bg-white-theme'}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isBlackTheme]);

  useEffect(() => {
    const sections = NAV_ITEMS
      .flatMap((item) => (item.id ? [document.getElementById(item.id)] : []))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.45, 0.65],
        rootMargin: '-20% 0px -45% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-600 ${
          isBlackTheme 
            ? 'bg-black/80 border-white/10' 
            : 'bg-white/80 border-black/10'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.a
              href="/"
              className="flex items-center gap-2.5"
            >
              <Image
                src="/logo-mark.png"
                alt="Menteronics logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-md"
                priority
              />
              <span className="hidden text-2xl font-bold text-gradient sm:inline">
                Menteronics
              </span>
            </motion.a>
            <div className="hidden lg:flex space-x-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className={`transition-colors ${
                    item.id && activeSection === item.id
                      ? 'text-accent'
                      : isBlackTheme
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-black'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
            <button
              type="button"
              className={`lg:hidden rounded-lg p-2 transition-colors ${
                isBlackTheme ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
              }`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <motion.a
              href="/register"
              className="hidden lg:inline-block bg-accent text-accent-foreground px-6 py-2 rounded-full font-medium hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Get Started
            </motion.a>
          </div>
          {isMobileMenuOpen ? (
            <motion.div
              className={`lg:hidden mt-2 mb-4 rounded-2xl border p-4 ${
                isBlackTheme ? 'border-white/10 bg-black/70' : 'border-black/10 bg-white/90'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`rounded-lg px-3 py-2 transition-colors ${
                      item.id && activeSection === item.id
                        ? 'text-accent bg-accent/10'
                        : isBlackTheme
                        ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                        : 'text-gray-700 hover:bg-black/5 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/register"
                  className="mt-2 rounded-full bg-accent px-5 py-2.5 text-center font-medium text-accent-foreground transition hover:bg-accent/90"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          ) : null}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-2 pt-28 pb-24 sm:px-0 sm:pt-24 sm:pb-20"
        style={{ y, opacity }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 20, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Master{' '}
              <span className="text-gradient">Web Dev</span>
              <br />
              Like Never Before
            </motion.h1>
            
            <motion.p 
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-600 ${
                isBlackTheme ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Transform your career with our cutting-edge web development courses. 
              Learn from industry experts and build real-world projects that matter.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.a
                href="/register"
                className="group bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 glow hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
            <motion.div
              className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <div className="grid w-full max-w-xs grid-cols-2 gap-3 sm:hidden">
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border px-3 py-2.5 text-center ${
                      isBlackTheme
                        ? 'border-white/15 bg-white/5 text-gray-200'
                        : 'border-black/10 bg-white text-gray-700'
                    }`}
                  >
                    <p className="text-base font-bold text-gradient">{item.value}</p>
                    <p className="text-[11px] font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="hidden sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-4">
                {TRUST_ITEMS.map((item) => (
                  <span
                    key={item.label}
                    className={`rounded-full border px-5 py-2 text-sm font-medium ${
                      isBlackTheme
                        ? 'border-white/15 bg-white/5 text-gray-200'
                        : 'border-black/10 bg-white text-gray-700'
                    }`}
                  >
                    {item.value} {item.label.toLowerCase()}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-600 ${
            isBlackTheme ? 'border-gray-400' : 'border-gray-600'
          }`}>
            <motion.div 
              className={`w-1 h-3 rounded-full mt-2 transition-colors duration-600 ${
                isBlackTheme ? 'bg-gray-400' : 'bg-gray-600'
              }`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <FeaturesSection isBlackTheme={isBlackTheme} />

      {/* About Section */}
      <AboutSection isBlackTheme={isBlackTheme} />

      {/* Testimonials Section */}
      <TestimonialsSection isBlackTheme={isBlackTheme} />

      {/* CTA Section */}
      <CTASection isBlackTheme={isBlackTheme} />

      {/* Contact Section */}
      <ContactSection isBlackTheme={isBlackTheme} />

      {/* Footer */}
      <Footer isBlackTheme={isBlackTheme} />
    </div>
  );
  }

function FeaturesSection({ isBlackTheme }: { isBlackTheme: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Modern Frameworks',
      description: 'Learn React, Next.js, Vue, and Angular with hands-on projects'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Responsive Design',
      description: 'Master mobile-first design and create stunning user experiences'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Build robust APIs with Node.js, Python, and modern databases'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Full-Stack Projects',
      description: 'Deploy real applications and build an impressive portfolio'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'System Design',
      description: 'Learn to design scalable applications, APIs, and architecture for real-world products'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Industry Mentorship',
      description: 'Get guidance from experienced developers working at top companies'
    }
  ];

  return (
    <motion.section 
      ref={ref}
      id="courses"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Everything You Need to <span className="text-gradient">Succeed</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-600 ${
            isBlackTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our comprehensive curriculum covers everything from basics to advanced concepts,
            ensuring you&apos;re ready for any development challenge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 ${
                isBlackTheme 
                  ? 'border-white/10 bg-gray-900/25 hover:border-accent/50' 
                  : 'border-black/10 bg-white hover:border-accent/50'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className={`leading-relaxed transition-colors duration-600 ${
                isBlackTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function AboutSection({ isBlackTheme }: { isBlackTheme: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const highlights = [
    {
      title: 'Live Mentorship',
      description: 'Get direct guidance from experienced developers every week.',
    },
    {
      title: 'Project-Based Learning',
      description: 'Build portfolio-ready apps that match real industry workflows.',
    },
    {
      title: 'Placement Support',
      description: 'Resume reviews, interview prep, and career roadmap guidance.',
    },
    {
      title: 'Flexible Batches',
      description: 'Weekday and weekend options designed for students and working professionals.',
    },
  ];

  return (
    <motion.section 
      ref={ref}
      id="about"
      className={`py-20 transition-colors duration-600 ${
        isBlackTheme ? 'bg-gray-900/30' : 'bg-gray-50/30'
      }`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
          >
            <span className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              Why students pick us
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Why Choose <span className="text-gradient">Menteronics</span>?
            </h2>
            <p className={`text-lg mb-8 leading-relaxed transition-colors duration-600 ${
              isBlackTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Learn with a practical curriculum, expert mentors, and a supportive
              community focused on helping you become job-ready in web development.
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  className={`h-full rounded-xl border p-5 transition-all duration-300 ${
                    isBlackTheme
                      ? 'border-white/10 bg-gray-900/40 hover:border-accent/40'
                      : 'border-black/10 bg-gray-50/80 hover:border-accent/40'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <h3 className="text-base font-bold">{highlight.title}</h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      isBlackTheme ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/register"
              className="mt-8 mx-auto flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-accent-foreground shadow-[0_10px_25px_rgba(255,87,87,0.25)] transition hover:bg-accent/90"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              Register for the Next Batch
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function TestimonialsSection({ isBlackTheme }: { isBlackTheme: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const testimonials = [
    {
      name: 'Hrukesh',
      role: 'Frontend Developer',
      content: 'The instructors really know their stuff and explain complex concepts in a way that actually makes sense. I loved the hands-on projects - they felt like real work, not just exercises.',
      rating: 5
    },
    { 
      name: 'Dikshita',
      role: 'Full-Stack Developer',
      content: 'What I appreciated most was the supportive community. Whenever I got stuck, there was always someone willing to help. The curriculum is well-structured and builds up your skills progressively.',
      rating: 5
    },
    {
      name: 'Shrushti',
      role: 'Web Developer',
      content: 'The course content is incredibly up-to-date with current industry standards. I feel much more confident in my coding abilities now, and the portfolio projects really showcase what I learned.',
      rating: 5
    }
  ];

  return (
    <motion.section 
      ref={ref}
      id="testimonials"
      className="py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Success <span className="text-gradient">Stories</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto transition-colors duration-600 ${
            isBlackTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Don&apos;t just take our word for it. Hear from our graduates who are now 
            thriving at top tech companies worldwide.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 ${
                isBlackTheme 
                  ? 'bg-gray-900/30 border-white/10 hover:border-accent/50' 
                  : 'bg-white border-black/10 hover:border-accent/50'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className={`mb-6 leading-relaxed transition-colors duration-600 ${
                isBlackTheme ? 'text-gray-300' : 'text-gray-600'
              }`}>
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className={`text-sm transition-colors duration-600 ${
                  isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                }`}>{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function CTASection({ isBlackTheme }: { isBlackTheme: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section 
      ref={ref}
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 coral-gradient-bg opacity-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Ready to Transform Your <span className="text-gradient">Career</span>?
          </h2>
          <p className={`text-xl mb-12 leading-relaxed transition-colors duration-600 ${
            isBlackTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of developers who have already transformed their careers 
            with Menteronics. Your journey to becoming a world-class developer starts here.
          </p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.a
              href="/register"
              className="bg-accent text-accent-foreground px-12 py-4 rounded-full font-bold text-lg glow hover:shadow-lg transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll Now - Limited Spots
            </motion.a>
          </motion.div>
        </motion.div>
    </div>
    </motion.section>
  );
}

function ContactSection({ isBlackTheme }: { isBlackTheme: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSubmitMessage({
        type: 'success',
        text: 'Message sent successfully. We will get back to you shortly.',
      });
      form.reset();
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'Unable to send your message right now. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      ref={ref}
      id="contact"
      className={`py-20 transition-colors duration-600 ${
        isBlackTheme ? 'bg-gray-900/30' : 'bg-gray-50/30'
      }`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-600 ${
            isBlackTheme ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have questions about our courses? Ready to start your journey? 
            We&apos;d love to hear from you and help you take the next step.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <a 
                    href="mailto:hello@menteronics.com"
                    className={`transition-colors duration-600 hover:text-accent ${
                      isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    hello@menteronics.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Phone</div>
                  <div className="space-y-1">
                    <a 
                      href="tel:+918530217696"
                      className={`block transition-colors duration-600 hover:text-accent ${
                        isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      +91 8530217696
                    </a>
                    <a 
                      href="tel:+918669792979"
                      className={`block transition-colors duration-600 hover:text-accent ${
                        isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      +91 8669792979
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Response Time</div>
                  <div className={`transition-colors duration-600 ${
                    isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}>Within 24 hours</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold">Location</div>
                  <div
                    className={`transition-colors duration-600 ${
                      isBlackTheme ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Gokul Nagar, Pune
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={`rounded-2xl border p-6 md:p-8 ${
              isBlackTheme ? 'border-white/10 bg-gray-900/25' : 'border-black/10 bg-white'
            }`}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isBlackTheme 
                        ? 'bg-gray-800 border-white/10 text-white focus:border-accent' 
                        : 'bg-white border-black/10 text-black focus:border-accent'
                    } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    name="lastName"
                    type="text"
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isBlackTheme 
                        ? 'bg-gray-800 border-white/10 text-white focus:border-accent' 
                        : 'bg-white border-black/10 text-black focus:border-accent'
                    } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isBlackTheme 
                      ? 'bg-gray-800 border-white/10 text-white focus:border-accent' 
                      : 'bg-white border-black/10 text-black focus:border-accent'
                  } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  name="subject"
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isBlackTheme 
                      ? 'bg-gray-800 border-white/10 text-white focus:border-accent' 
                      : 'bg-white border-black/10 text-black focus:border-accent'
                  } focus:outline-none focus:ring-2 focus:ring-accent/20`}
                >
                  <option>General Inquiry</option>
                  <option>Course Information</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    isBlackTheme 
                      ? 'bg-gray-800 border-white/10 text-white focus:border-accent' 
                      : 'bg-white border-black/10 text-black focus:border-accent'
                  } focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none`}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent/90 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              {submitMessage ? (
                <p
                  className={`text-sm font-medium ${
                    submitMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {submitMessage.text}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Footer({ isBlackTheme }: { isBlackTheme: boolean }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-8 border-t transition-colors duration-600 ${
      isBlackTheme ? 'bg-gray-900/30 border-white/10' : 'bg-gray-50/30 border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <Image
                src="/logo-mark.png"
                alt="Menteronics logo"
                width={24}
                height={24}
                className="h-6 w-6 rounded-sm"
              />
              <div className="text-xl font-bold text-gradient">Menteronics</div>
            </div>
            <p className={`text-sm transition-colors duration-600 ${
              isBlackTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Transform your career with cutting-edge web development education.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <div className={`text-sm space-y-1 transition-colors duration-600 ${
              isBlackTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <a 
                href="mailto:hello@menteronics.com"
                className="block hover:text-accent transition-colors"
              >
                hello@menteronics.com
              </a>
              <a 
                href="tel:+918530217696"
                className="block hover:text-accent transition-colors"
              >
                +91 8530217696
              </a>
              <a 
                href="tel:+918669792979"
                className="block hover:text-accent transition-colors"
              >
                +91 8669792979
              </a>
              <div className="pt-2">© {currentYear} Menteronics. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
