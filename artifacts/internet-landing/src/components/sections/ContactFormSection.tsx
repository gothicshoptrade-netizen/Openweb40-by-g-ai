import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Phone, MapPin, Clock, LocateFixed, Loader2 } from "lucide-react";

type Step = 1 | 2 | 3;

export default function ContactFormSection() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    time: "",
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = form.name.trim() && form.phone.trim();
  const canProceedStep2 = form.address.trim() && form.area.trim();
  const canProceedStep3 = form.time.trim();

  const handleSubmit = async () => {
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
      setSubmitted(true);
    }
  };

  const progressWidth = `${((step - 1) / 2) * 100}%`;

  const times = [
    "Утро (9:00 – 12:00)",
    "День (12:00 – 16:00)",
    "Вечер (16:00 – 20:00)",
    "В любое время",
  ];

  return (
    <section id="contact" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-badge mb-4">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Принимаем заявки</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Оставьте заявку
          </h2>
          <p className="text-muted-foreground text-sm">
            Бесплатный выезд для замера скорости — 24 часа, без обязательств
          </p>
          <p className="text-white/50 text-xs mt-2">
            Используем профессиональное измерительное оборудование
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { icon: Phone, title: "Телефон", value: "+7 (910) 595-46-68", href: "tel:+79105954668" },
                { icon: MapPin, title: "Зона обслуживания", value: "Калуга и вся область" },
                { icon: Clock, title: "Режим работы", value: "Пн-Вс: 9:00 – 21:00\nТехподдержка 24/7" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-white/10 hover:border-white/20 transition-colors group">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1 uppercase tracking-wider text-xs opacity-60">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-bold text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className={`text-base font-medium text-foreground ${item.title === "Телефон" ? "whitespace-nowrap" : "whitespace-pre-line"}`}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <LocateFixed className="w-12 h-12 text-accent" />
              </div>
              <p className="text-lg font-bold text-accent mb-2">Бесплатный замер скорости</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Специалист приедет с профессиональным оборудованием, найдет лучшую точку приема и даст точный расчет. Это ни к чему вас не обязывает.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-2xl">
            <div className="p-6 sm:p-8 rounded-[1.4rem] bg-background/40 backdrop-blur-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Заявка принята!</h3>
                    <p className="text-muted-foreground">
                      Наш менеджер свяжется с вами в ближайшие 15 минут для уточнения деталей
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 w-full">
                    <p className="text-sm text-muted-foreground">
                      Если хотите связаться прямо сейчас: <br />
                      <a href="tel:+79105954668" className="text-primary font-bold text-lg hover:underline">+7 (910) 595-46-68</a>
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Progress */}
                  <div className="mb-10">
                    <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                      {["Контакты", "Адрес", "Время"].map((label, i) => (
                        <span
                          key={i}
                          className={i + 1 <= step ? "text-primary" : "text-muted-foreground/40"}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        style={{ width: progressWidth }}
                      />
                    </div>
                  </div>

                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ваши контакты</h3>
                        <p className="text-sm text-muted-foreground">Представьтесь, чтобы мы знали, как к вам обращаться</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Имя</Label>
                          <Input
                            placeholder="Как вас зовут?"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-primary h-14 rounded-xl text-lg px-5"
                            data-testid="input-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Номер телефона</Label>
                          <Input
                            placeholder="+7 (___) ___-__-__"
                            value={form.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-primary h-14 rounded-xl text-lg px-5"
                            data-testid="input-phone"
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-xl mt-4 btn-pulse"
                        disabled={!canProceedStep1}
                        onClick={() => setStep(2)}
                        data-testid="btn-step1-next"
                      >
                        Далее <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Адрес объекта</h3>
                        <p className="text-sm text-muted-foreground">Укажите примерный адрес для планирования выезда</p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1">
                            <Label className="text-xs font-bold uppercase tracking-widest text-white/40">Адрес</Label>
                            <button
                              type="button"
                              onClick={() => {
                                if (!navigator.geolocation) return;
                                setLocating(true);
                                navigator.geolocation.getCurrentPosition(
                                  (pos) => {
                                    handleChange("address", `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)} (определено автоматически)`);
                                    setLocating(false);
                                  },
                                  () => setLocating(false),
                                  { timeout: 8000 }
                                );
                              }}
                              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors"
                              data-testid="btn-geolocate"
                            >
                              {locating
                                ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Определяем...</>
                                : <><LocateFixed className="w-3.5 h-3.5" /> Геолокация</>
                              }
                            </button>
                          </div>
                          <Input
                            placeholder="Деревня, посёлок, улица..."
                            value={form.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-primary h-14 rounded-xl text-lg px-5"
                            data-testid="input-address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Площадь дома (м²)</Label>
                          <Input
                            placeholder="Например: 150"
                            type="number"
                            value={form.area}
                            onChange={(e) => handleChange("area", e.target.value)}
                            className="bg-white/5 border-white/10 focus:border-primary h-14 rounded-xl text-lg px-5"
                            data-testid="input-area"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <Button
                          variant="outline"
                          className="flex-1 h-14 border-white/10 hover:bg-white/5 rounded-xl font-bold"
                          onClick={() => setStep(1)}
                          data-testid="btn-step2-back"
                        >
                          Назад
                        </Button>
                        <Button
                          className="flex-[2] h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.4)] rounded-xl btn-pulse"
                          disabled={!canProceedStep2}
                          onClick={() => setStep(3)}
                          data-testid="btn-step2-next"
                        >
                          Далее <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Время визита</h3>
                        <p className="text-sm text-muted-foreground">Когда вам будет удобно принять нашего специалиста?</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {times.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleChange("time", time)}
                            className={`py-4 px-4 rounded-xl border text-sm font-bold transition-all text-left flex items-center justify-between group ${
                              form.time === time
                                ? "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/25 hover:bg-white/10"
                            }`}
                            data-testid={`btn-time-${time.split(" ")[0]}`}
                          >
                            {time}
                            <div className={`w-2 h-2 rounded-full transition-all ${form.time === time ? "bg-primary scale-125" : "bg-white/10"}`} />
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 h-14 border-white/10 hover:bg-white/5 rounded-xl font-bold"
                          onClick={() => setStep(2)}
                          data-testid="btn-step3-back"
                        >
                          Назад
                        </Button>
                        <Button
                          className="flex-[2] h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-[0_0_35px_rgba(139,92,246,0.5)] rounded-xl btn-pulse"
                          disabled={!canProceedStep3 || isSubmitting}
                          onClick={handleSubmit}
                          data-testid="btn-submit-form"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="mr-2 w-5 h-5 animate-spin" /> Отправка...</>
                          ) : "Отправить заявку"}
                        </Button>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 text-center mt-4 uppercase tracking-widest leading-relaxed">
                        Нажимая «Отправить», вы соглашаетесь с <br />
                        <a href="/privacy" className="underline hover:text-primary transition-colors">политикой конфиденциальности</a>
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
