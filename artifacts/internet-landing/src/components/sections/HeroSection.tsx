import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[clamp(600px,100svh,900px)] flex flex-col justify-center overflow-hidden pt-20">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 pb-10 sm:pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full neon-badge w-fit mb-4 sm:mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            <span className="text-sm font-medium text-white/90">
              Работаем по Калуге и области — 24/7
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4 sm:mb-6 uppercase">
            Свободный
            <br />
            интернет
            <br />
            <span className="gradient-text-purple">для загородной</span>
            <br />
            <span className="gradient-text">жизни.</span>
          </h1>

          <p className="hero-desc text-base sm:text-xl text-white/70 leading-relaxed mb-6 sm:mb-10 max-w-lg">
            Стабильная связь в любой точке Калужской области.
            Забудьте о «мёртвых зонах» и медленных загрузках —
            мы решаем это за 1–2 дня.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-14">
            <Button
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-accent hover:bg-accent/90 text-white border-0 shadow-[0_0_30px_rgba(139,92,246,0.55)] transition-all duration-300 hover:scale-105 rounded-xl"
              onClick={() => scrollTo("contact")}
            >
              Бесплатный замер
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium glass-card border-white/15 text-white hover:border-accent/40 transition-all duration-300 hover:scale-105 rounded-xl"
              onClick={() => scrollTo("calculator")}
            >
              Рассчитать стоимость
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-5 sm:gap-8">
            {[
              { value: "1000", suffix: "+", label: "решённых проблем" },
              { value: "300", suffix: "+", label: "довольных клиентов" },
              { value: "10", suffix: " лет", label: "опыта работы" },
              { value: "15", suffix: "+", label: "районов области" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
