import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";

// Map pins visualization for Kaluga region
const mapPins = [
  { top: "48%", left: "40%", label: "Офис — Калуга" },
  { top: "32%", left: "58%", label: "Обнинск" },
  { top: "62%", left: "30%", label: "Таруса" },
  { top: "27%", left: "74%", label: "Малоярославец" },
];

export default function ContactsPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (field: keyof typeof form, val: string) => setForm((p) => ({ ...p, [field]: val }));
  const handleSubmit = async () => {
    if (form.name && form.phone) {
      setIsSubmitting(true);
      try {
        await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsSubmitting(false);
        setFormSubmitted(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-muted-foreground text-xl">
              Ответим на любой вопрос в течение 15 минут. Работаем без выходных.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Телефон", lines: ["+7 (910) 595-46-68", "+7 (910) 000-00-00 (WhatsApp)"], color: "text-primary", bg: "bg-primary/15" },
                { icon: Mail, title: "Email", lines: ["info@openweb40.ru", "support@openweb40.ru"], color: "text-accent", bg: "bg-accent/15" },
                { icon: MapPin, title: "Офис", lines: ["г. Калуга, ул. Кирова, д. 1, офис 101", "Обслуживаем всю Калужскую область"], color: "text-primary", bg: "bg-primary/15" },
                { icon: Clock, title: "Режим работы", lines: ["Пн – Вс: 9:00 – 21:00", "Техподдержка: 24/7"], color: "text-accent", bg: "bg-accent/15" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-white/10 hover:border-white/20 transition-colors"
                    data-testid={`contact-info-${i}`}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">{item.title}</p>
                      {item.lines.map((line, li) => (
                        <p key={li} className="text-muted-foreground text-sm">{line}</p>
                      ))}
                    </div>
                  </motion.div>
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
                    { label: "Messenger Max", href: "#" },
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
                      disabled={!form.name || !form.phone || isSubmitting}
                      onClick={handleSubmit}
                      data-testid="btn-contact-submit"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Отправка..." : "Отправить сообщение"}
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
            <div className="relative h-96 rounded-2xl bg-card border border-white/10 overflow-hidden">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A32514101e13589b1b6890f91e92d80f836936c53e8705021e1022f186c7d7102&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                title="Карта зоны обслуживания Калужской области"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
