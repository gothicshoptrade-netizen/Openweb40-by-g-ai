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
            Бесплатный выезд замерщика — 24 часа, без обязательств
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: Phone, title: "Телефон", value: "+7 (910) 595-46-68" },
              { icon: MapPin, title: "Зона обслуживания", value: "Калуга и вся область" },
              { icon: Clock, title: "Режим работы", value: "Пн-Вс: 9:00 – 21:00\nТехподдержка 24/7" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-card border border-white/10">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              );
            })}

            <div className="p-5 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm font-semibold text-accent mb-2">Бесплатный выезд замерщика</p>
              <p className="text-sm text-muted-foreground">
                Мы приедем, оценим ситуацию, подберём оборудование и дадим точный расчёт. Без предоплаты.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 rounded-2xl bg-white/3 border border-white/10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
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
                    Если хотите связаться прямо сейчас: <span className="text-primary font-semibold">+7 (910) 595-46-68</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm font-medium mb-3">
                    {["Контакты", "Адрес", "Время"].map((label, i) => (
                      <span
                        key={i}
                        className={i + 1 <= step ? "text-primary" : "text-muted-foreground"}
                      >
                        {i + 1}. {label}
                      </span>
                    ))}
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: progressWidth }}
                    />
                  </div>
                </div>

                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold text-foreground mb-6">Ваши контакты</h3>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Имя</Label>
                      <Input
                        placeholder="Как вас зовут?"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Номер телефона</Label>
                      <Input
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                        data-testid="input-phone"
                      />
                    </div>
                    <Button
                      className="w-full h-12 bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] rounded-xl mt-4"
                      disabled={!canProceedStep1}
                      onClick={() => setStep(2)}
                      data-testid="btn-step1-next"
                    >
                      Далее <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold text-foreground mb-6">Адрес объекта</h3>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm text-muted-foreground">Адрес</Label>
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
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                          data-testid="btn-geolocate"
                        >
                          {locating
                            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Определяем...</>
                            : <><LocateFixed className="w-3.5 h-3.5" /> Определить автоматически</>
                          }
                        </button>
                      </div>
                      <Input
                        placeholder="Деревня, посёлок, улица..."
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                        data-testid="input-address"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Площадь дома (м²)</Label>
                      <Input
                        placeholder="Например: 150"
                        type="number"
                        value={form.area}
                        onChange={(e) => handleChange("area", e.target.value)}
                        className="bg-white/5 border-white/10 focus:border-primary h-12"
                        data-testid="input-area"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 border-white/10 hover:bg-white/5"
                        onClick={() => setStep(1)}
                        data-testid="btn-step2-back"
                      >
                        Назад
                      </Button>
                      <Button
                        className="flex-1 h-12 bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] rounded-xl"
                        disabled={!canProceedStep2}
                        onClick={() => setStep(3)}
                        data-testid="btn-step2-next"
                      >
                        Далее <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="text-xl font-bold text-foreground mb-6">Удобное время визита</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleChange("time", time)}
                          className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                            form.time === time
                              ? "bg-primary/20 border-primary text-primary"
                              : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                          }`}
                          data-testid={`btn-time-${time.split(" ")[0]}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        className="flex-1 h-12 border-white/10 hover:bg-white/5"
                        onClick={() => setStep(2)}
                        data-testid="btn-step3-back"
                      >
                        Назад
                      </Button>
                      <Button
                        className="flex-1 h-12 bg-accent hover:bg-accent/90 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-xl"
                        disabled={!canProceedStep3 || isSubmitting}
                        onClick={handleSubmit}
                        data-testid="btn-submit-form"
                      >
                        {isSubmitting ? "Отправка..." : "Отправить заявку"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Нажимая «Отправить», вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
