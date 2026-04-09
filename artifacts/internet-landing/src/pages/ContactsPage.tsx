import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Map pins visualization for Kaluga region
const mapPins = [
  { top: "48%", left: "40%", label: "Офис — Калуга" },
  { top: "32%", left: "58%", label: "Обнинск" },
  { top: "62%", left: "30%", label: "Таруса" },
  { top: "27%", left: "74%", label: "Малоярославец" },
];

export default function ContactsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (field: keyof typeof form, val: string) => setForm((p) => ({ ...p, [field]: val }));
  const handleSubmit = () => { if (form.name && form.phone) setFormSubmitted(true); };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Контакты Openweb40.ru</span>
            </div>
            <h1 className="text-5xl font-extrabold text-foreground mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-muted-foreground text-xl">
              Ответим на любой вопрос в течение 15 минут. Работаем без выходных.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Телефон", lines: ["+7 (910) 595-46-68", "+7 (910) 000-00-00 (WhatsApp)"], color: "text-primary", bg: "bg-primary/15" },
                { icon: Mail, title: "Email", lines: ["info@openweb40.ru", "support@openweb40.ru"], color: "text-accent", bg: "bg-accent/15" },
                { icon: MapPin, title: "Офис", lines: ["г. Калуга, ул. Кирова, д. 1, офис 101", "Обслуживаем всю Калужскую область"], color: "text-primary", bg: "bg-primary/15" },
                { icon: Clock, title: "Режим работы", lines: ["Пн – Пт: 9:00 – 20:00", "Сб – Вс: 10:00 – 18:00", "Техподдержка: 24/7"], color: "text-accent", bg: "bg-accent/15" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-white/10 hover:border-white/20 transition-colors" data-testid={`contact-info-${i}`}>
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">{item.title}</p>
                      {item.lines.map((line, li) => (
                        <p key={li} className="text-muted-foreground text-sm">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Social */}
              <div className="p-6 rounded-2xl bg-card border border-white/10">
                <p className="font-bold text-foreground mb-4">Мессенджеры и соцсети</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: "Telegram", href: "https://t.me/krisdev13" },
                    { label: "WhatsApp", href: "https://wa.me/79105954668" },
                    { label: "VKontakte", href: "#" },
                    { label: "Одноклассники", href: "#" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 text-sm text-muted-foreground hover:text-foreground transition-all"
                      data-testid={`btn-social-${s.label}`}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 rounded-2xl bg-card border border-white/10">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Сообщение отправлено!</h3>
                    <p className="text-muted-foreground">Ответим в течение 15 минут в рабочее время</p>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-8">Написать нам</h2>
                  <div className="space-y-5">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Ваше имя</Label>
                      <Input placeholder="Как вас зовут?" value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12" data-testid="input-contact-name" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Телефон</Label>
                      <Input placeholder="+7 (___) ___-__-__" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12" data-testid="input-contact-phone" />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Сообщение</Label>
                      <textarea
                        placeholder="Ваш вопрос или задача..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={4}
                        className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-primary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        data-testid="input-contact-message"
                      />
                    </div>
                    <Button
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] font-semibold"
                      disabled={!form.name || !form.phone}
                      onClick={handleSubmit}
                      data-testid="btn-contact-submit"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Отправить сообщение
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Interactive map visualization */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Зона обслуживания</h2>
            <div className="relative h-80 rounded-2xl bg-card border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-grid-white opacity-[0.07]" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 320" fill="none">
                <path
                  d="M120,80 C180,50 300,40 420,65 C500,80 560,130 540,200 C520,260 440,290 300,280 C160,270 80,230 70,160 C60,110 80,90 120,80Z"
                  fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5"
                />
                <text x="280" y="175" fill="rgba(255,255,255,0.3)" fontSize="14" textAnchor="middle">
                  Калужская область
                </text>
              </svg>
              {mapPins.map((pin, i) => (
                <div key={i} className="absolute flex flex-col items-center"
                  style={{ top: pin.top, left: pin.left, transform: "translate(-50%,-50%)" }}>
                  <div className="relative">
                    <div className="w-5 h-5 rounded-full bg-primary border-2 border-white/60 shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                    <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                  </div>
                  <div className="mt-1.5 px-2 py-0.5 rounded bg-background/90 text-xs text-white/80 whitespace-nowrap font-medium">
                    {pin.label}
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                Выезжаем в любой населённый пункт Калужской области
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
