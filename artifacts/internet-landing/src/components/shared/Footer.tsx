import { Link } from "wouter";
import { Wifi, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

const pages = [
  { href: "/services", label: "Услуги" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/blog", label: "Блог" },
  { href: "/contacts", label: "Контакты" },
];

const anchors = [
  { id: "solutions", label: "Тарифы" },
  { id: "calculator", label: "Калькулятор" },
  { id: "reviews", label: "Отзывы клиентов" },
  { id: "faq", label: "Вопросы и ответы" },
];

export default function Footer() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-background/80 backdrop-blur-xl border-t border-accent/15 pt-16 pb-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-0 group shrink-0 mb-5">
              <span className="font-mono font-black tracking-tight leading-none select-none">
                <span className="text-xl sm:text-2xl text-white/95 group-hover:text-white transition-colors">OPEN</span>
                <span className="text-xl sm:text-2xl logo-animated-gradient">WEB40</span>
                <span className="text-sm sm:text-lg text-white/35 group-hover:text-white/50 transition-colors">.ru</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Надёжный и быстрый интернет для вашего загородного дома. Решаем проблемы со связью там, где другие сдаются.
            </p>
            <a href="tel:+79105954668" className="inline-flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors" data-testid="link-footer-phone">
              <Phone className="w-4 h-4 text-primary" />
              +7 (910) 595-46-68
            </a>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+79105954668" className="hover:text-white transition-colors">+7 (910) 595-46-68</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@openweb40.ru" className="hover:text-white transition-colors">info@openweb40.ru</a>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>г. Калуга, ул. Кирова, д. 1, офис 101</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Пн–Вс: 9:00–21:00 / Техподдержка 24/7</span>
              </li>
            </ul>

            {/* Messengers */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Мессенджеры и каналы:</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Telegram", href: "https://t.me/krisdev13" },
                  { label: "WhatsApp", href: "https://wa.me/79105954668" },
                  { label: "Messenger Max", href: "#" },
                  { label: "Канал Openweb40", href: "https://t.me/openweb40ru" },
                  { label: "Полезные боты", href: "https://t.me/usefulbots2026_bot" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/25 text-xs text-muted-foreground hover:text-foreground transition-all"
                    data-testid={`footer-social-${s.label}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">Меню</h3>
            <ul className="space-y-3">
              {[...pages, ...anchors.map(a => ({ href: `/#${a.id}`, label: a.label }))].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm group"
                    data-testid={`footer-link-${item.href.replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Openweb40.ru. Все права защищены.
            </p>
            <p className="text-muted-foreground text-sm">
              Разработка и техподдержка: <a href="https://premiumwebsite.ru" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">premiumwebsite.ru</a>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted-foreground items-center">
            <a href="/privacy" className="hover:text-white transition-colors text-center">Политика конфиденциальности</a>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <a href="/data-processing" className="hover:text-white transition-colors text-center">Политика обработки данных</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
