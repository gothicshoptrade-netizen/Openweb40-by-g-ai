import { PhoneCall, MapPin, Wrench, Wifi } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Заявка",
    description: "Оставьте заявку на сайте или позвоните. Менеджер перезвонит в течение 15 минут.",
    duration: "15 мин",
    durationLabel: "ответ менеджера",
    colorFrom: "#3B82F6",
    colorTo: "#60A5FA",
    bgClass: "bg-primary/15 border-primary/40",
    dotClass: "bg-primary shadow-[0_0_16px_rgba(59,130,246,0.7)]",
    textClass: "text-primary",
    badgeClass: "bg-primary/15 border-primary/30 text-primary",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Выезд замерщика",
    description: "Бесплатный выезд на объект. Специалист тестирует сигнал и подбирает оборудование.",
    duration: "24 часа",
    durationLabel: "до выезда",
    colorFrom: "#6366F1",
    colorTo: "#818CF8",
    bgClass: "bg-indigo-500/15 border-indigo-500/40",
    dotClass: "bg-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.7)]",
    textClass: "text-indigo-400",
    badgeClass: "bg-indigo-500/15 border-indigo-500/30 text-indigo-400",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Монтаж",
    description: "Профессиональная установка оборудования. Аккуратно, без мусора, в удобное время.",
    duration: "2–4 часа",
    durationLabel: "установка",
    colorFrom: "#8B5CF6",
    colorTo: "#A78BFA",
    bgClass: "bg-accent/15 border-accent/40",
    dotClass: "bg-accent shadow-[0_0_16px_rgba(139,92,246,0.7)]",
    textClass: "text-accent",
    badgeClass: "bg-accent/15 border-accent/30 text-accent",
  },
  {
    number: "04",
    icon: Wifi,
    title: "Интернет работает",
    description: "Настраиваем сеть, проверяем скорость, объясняем как всё устроено. Вы уже онлайн!",
    duration: "сразу",
    durationLabel: "интернет включён",
    colorFrom: "#06B6D4",
    colorTo: "#22D3EE",
    bgClass: "bg-cyan-500/15 border-cyan-500/40",
    dotClass: "bg-cyan-500 shadow-[0_0_16px_rgba(6,182,212,0.7)]",
    textClass: "text-cyan-400",
    badgeClass: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
  },
];

export default function HowWeWorkSection() {
  return (
    <section id="how-we-work" className="p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full neon-badge mb-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-accent">Простой процесс</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            Как мы работаем
          </h2>
          <p className="text-muted-foreground text-sm">
            От заявки до интернета — 4 шага и 1–2 дня
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-10">

          {/* Vertical line */}
          <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: "linear-gradient(to bottom, #3B82F6, #6366F1, #8B5CF6, #06B6D4)",
              }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative flex gap-4 items-start group"
                  data-testid={`step-${index + 1}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute -left-10 top-3 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 rounded-full ${step.dotClass} flex items-center justify-center ring-2 ring-background z-10 shrink-0`}
                    >
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`flex-1 rounded-xl border ${step.bgClass} p-4 transition-all duration-300 group-hover:brightness-110`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                      </div>
                      {/* Duration badge */}
                      <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${step.badgeClass}`}>
                        ⚡ {step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                    <p className={`text-[10px] mt-1.5 ${step.textClass} opacity-70`}>{step.durationLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer badge */}
        <div className="mt-8 p-3 rounded-xl bg-gradient-to-r from-accent/10 via-primary/5 to-cyan-500/10 border border-white/10 text-center">
          <p className="text-xs font-semibold text-foreground">
            Итого от заявки до интернета —{" "}
            <span className="text-accent">1–2 рабочих дня</span>
          </p>
        </div>

      </div>
    </section>
  );
}
