import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavLinks = [
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

const landingAnchors = [
  { id: "solutions", label: "Тарифы" },
  { id: "calculator", label: "Калькулятор" },
  { id: "reviews", label: "Отзывы" },
  { id: "faq", label: "Вопросы" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-xl border-b border-accent/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 group shrink-0"
          data-testid="link-logo"
        >
          <span className="font-mono font-black tracking-tight leading-none select-none">
            <span className="text-xl sm:text-2xl text-white/95 group-hover:text-white transition-colors">OPEN</span>
            <span className="text-xl sm:text-2xl logo-animated-gradient">WEB40</span>
            <span className="text-sm sm:text-lg text-white/35 group-hover:text-white/50 transition-colors">.ru</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {isHome &&
            landingAnchors.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-lg hover:bg-white/5"
                data-testid={`nav-anchor-${item.id}`}
              >
                {item.label}
              </button>
            ))}

          <div className={`w-px h-5 bg-white/10 mx-2 ${isHome ? "" : "hidden"}`} />

          {mainNavLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5 ${
                location === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-white"
              }`}
              data-testid={`nav-link-${item.href.slice(1)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isHome && (
            <Button
              onClick={() => scrollTo("contact")}
              className="h-9 px-3 sm:h-10 sm:px-4 text-xs sm:text-sm bg-accent hover:bg-accent/90 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)] border-0 rounded-xl"
              data-testid="btn-header-cta"
            >
              Заявка
            </Button>
          )}

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            data-testid="btn-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 border-t border-white/10 overflow-hidden transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-0">
            {isHome &&
              landingAnchors.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  data-testid={`mobile-nav-anchor-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            {isHome && <div className="h-px bg-white/10 my-2" />}
            {mainNavLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 text-sm font-semibold uppercase tracking-wider transition-colors rounded-xl hover:bg-white/5 ${
                  location === item.href ? "text-primary" : "text-white/90 hover:text-white"
                }`}
                data-testid={`mobile-nav-link-${item.href.slice(1)}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
