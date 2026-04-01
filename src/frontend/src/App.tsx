import {
  Activity,
  Ambulance,
  BadgeDollarSign,
  Clock,
  Cross,
  FlaskConical,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Pill,
  Scan,
  Scissors,
  Stethoscope,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Services Data ────────────────────────────────────────────────────────────
const services = [
  {
    icon: Ambulance,
    name: "24/7 Emergency Care",
    desc: "Round-the-clock emergency services with rapid response and expert care.",
  },
  {
    icon: Scan,
    name: "X-Ray",
    desc: "Advanced digital X-ray imaging for accurate diagnosis.",
  },
  {
    icon: Pill,
    name: "Medicine / Pharmacy",
    desc: "In-house pharmacy stocked with all essential and specialty medicines.",
  },
  {
    icon: FlaskConical,
    name: "Laboratory",
    desc: "Comprehensive pathology lab with quick turnaround on test results.",
  },
  {
    icon: HeartPulse,
    name: "ECG",
    desc: "Electrocardiogram services for detailed heart health monitoring.",
  },
  {
    icon: Scissors,
    name: "Operation Theatre (OT)",
    desc: "Fully equipped modern OT for safe and precise surgical procedures.",
  },
  {
    icon: Activity,
    name: "ICU",
    desc: "Intensive Care Unit with 24/7 monitoring for critical patients.",
  },
];

const whyUs = [
  {
    icon: Clock,
    title: "24/7 Availability",
    desc: "Always open, always ready",
  },
  {
    icon: UserCheck,
    title: "Experienced Doctors",
    desc: "Skilled, trusted team",
  },
  {
    icon: Stethoscope,
    title: "Modern Equipment",
    desc: "Latest medical technology",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Treatment",
    desc: "Quality care at low cost",
  },
  { icon: Zap, title: "Quick Response", desc: "Rapid emergency handling" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const aboutRef = useReveal();
  const servicesRef = useReveal();
  const whyRef = useReveal();
  const contactRef = useReveal();

  return (
    <div className="min-h-screen font-sans">
      {/* ── Sticky Header ──────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 select-none"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Cross className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div className="leading-tight">
              <p className="font-bold text-sm tracking-widest text-primary uppercase">
                SAROHA
              </p>
              <p className="font-semibold text-[10px] tracking-wider text-muted-foreground uppercase">
                Hospital
              </p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
            <a
              href="tel:+917027063337"
              className="ml-2 flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              data-ocid="nav.primary_button"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/assets/saroha-019d48a6-b3a6-7689-aaf8-e7db5b672f4b.jpg')`,
          }}
        />
        {/* Dark blue overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,60,90,0.65)" }}
        />
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open 24/7
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            SAROHA Hospital
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light">
            24/7 Trusted Healthcare Services
          </p>
          <p className="text-white/75 mb-10 text-base sm:text-lg">
            Harshana Station Road, Jagdishpur, Sonipat, Haryana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+917027063337"
              className="flex items-center justify-center gap-2 bg-white text-navy font-bold px-7 py-3.5 rounded-full text-base hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              data-ocid="hero.primary_button"
            >
              <Phone className="w-4 h-4" />
              CALL NOW
            </a>
            <a
              href="https://wa.me/917027063337"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-navy text-white font-bold px-7 py-3.5 rounded-full text-base hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl border border-white/20"
              data-ocid="hero.secondary_button"
            >
              <MessageCircle className="w-4 h-4" />
              WHATSAPP NOW
            </a>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-white/70 animate-[fade_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      {/* ── About Us ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={aboutRef}
            className="reveal grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Image */}
            <div className="rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/saroha-019d48a6-b3a6-7689-aaf8-e7db5b672f4b.jpg"
                alt="SAROHA Hospital building"
                className="w-full h-80 md:h-[420px] object-cover"
              />
            </div>
            {/* Right: Content */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-snug">
                Your Trusted Healthcare Partner
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-5">
                SAROHA Hospital is a trusted healthcare center providing 24/7
                medical services with modern facilities and an experienced team
                of doctors and nurses. We are dedicated to delivering
                compassionate, high-quality care to every patient who walks
                through our doors.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                Our state-of-the-art infrastructure, combined with our
                commitment to patient safety and affordability, ensures that
                everyone in Jagdishpur and the surrounding areas of Sonipat can
                access world-class medical treatment without financial burden.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "24/7 Open",
                  "Affordable Care",
                  "Experienced Staff",
                  "Modern Facilities",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Our Services
            </h2>
          </div>
          <div
            ref={servicesRef}
            className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((svc, i) => (
              <div
                key={svc.name}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center group"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                  <svc.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">
                  {svc.name}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section id="why-us" className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-2">
              Our Strengths
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Choose Us
            </h2>
          </div>
          <div
            ref={whyRef}
            className="reveal grid sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 text-center shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                data-ocid={`why.item.${i + 1}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Contact Us
            </h2>
          </div>
          <div
            ref={contactRef}
            className="reveal grid md:grid-cols-2 gap-10 items-start"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-card-hover h-80 md:h-96">
              <iframe
                title="SAROHA Hospital Location"
                src="https://maps.google.com/maps?q=Jagdishpur+Sonipat+Haryana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-secondary rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-5 text-lg">
                  Visit Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">
                        Address
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Harshana Station Road, Near Bhure Kha Pir,
                        <br />
                        Jagdishpur, Sonipat, Haryana – 131001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">
                        Phone
                      </p>
                      <a
                        href="tel:+917027063337"
                        className="text-primary font-semibold hover:underline"
                        data-ocid="contact.link"
                      >
                        +91 7027063337
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">
                        WhatsApp
                      </p>
                      <a
                        href="https://wa.me/917027063337"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:underline"
                        data-ocid="contact.link"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">
                        Working Hours
                      </p>
                      <p className="text-green-600 font-bold text-sm">
                        Open 24 Hours / 7 Days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/917027063337"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-colors text-base"
                data-ocid="contact.primary_button"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.22 0.07 232) 0%, oklch(0.17 0.06 238) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
            {/* Col 1: Hospital Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <Cross className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold tracking-widest text-sm uppercase">
                    SAROHA HOSPITAL
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Trusted healthcare services at Jagdishpur, Sonipat. Modern
                facilities with experienced professionals.
              </p>
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open 24/7
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/90">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Home", href: "#home" },
                  { label: "About Us", href: "#about" },
                  { label: "Our Services", href: "#services" },
                  { label: "Why Choose Us", href: "#why-us" },
                  { label: "Contact Us", href: "#contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href)}
                      className="text-white/70 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                      data-ocid="footer.link"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-white transition-colors" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Connect */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/90">
                Connect With Us
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-white/70 text-sm leading-relaxed">
                    Harshana Station Road, Near Bhure Kha Pir, Jagdishpur,
                    Sonipat, Haryana – 131001
                  </p>
                </div>
                <a
                  href="tel:+917027063337"
                  className="flex items-center gap-3 hover:text-white group"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    +91 7027063337
                  </span>
                </a>
                <a
                  href="https://wa.me/917027063337"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white group"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                    WhatsApp: 7027063337
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 pt-6 flex items-center justify-center">
            <p className="text-white/50 text-xs text-center">
              © {new Date().getFullYear()} SAROHA Hospital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp Button ───────────────────────────────────────── */}
      <a
        href="https://wa.me/917027063337"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-5 z-50 w-14 h-14 rounded-full bg-whatsapp flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.button"
      >
        {/* WhatsApp SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          role="img"
          aria-label="WhatsApp"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── Mobile sticky call bar ─────────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary">
        <a
          href="tel:+917027063337"
          className="flex items-center justify-center gap-2 text-white font-bold py-3.5 text-sm w-full"
          data-ocid="mobile.primary_button"
        >
          <Phone className="w-4 h-4" />
          Call Us: 7027063337
        </a>
      </div>
    </div>
  );
}
