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
          <div>
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/20 text-accent">
                <Wifi className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Open<span className="text-primary">web40</span>.ru
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
                <span>Пн–Пт: 9:00–20:00 / Сб–Вс: 10:00–18:00 / Техподдержка 24/7</span>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">Страницы</h3>
            <ul className="space-y-3">
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm group"
                    data-testid={`footer-link-${page.href.slice(1)}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Anchors */}
          <div>
            <h3 className="text-base font-semibold text-white mb-6">На главной</h3>
            <ul className="space-y-3">
              {anchors.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm group text-left"
                    data-testid={`footer-anchor-${item.id}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Messengers */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-3">Мессенджеры:</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { label: "Telegram", href: "https://t.me/krisdev13" },
                  { label: "WhatsApp", href: "https://wa.me/79105954668" },
                  { label: "VK", href: "#" },
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
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Openweb40.ru. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
