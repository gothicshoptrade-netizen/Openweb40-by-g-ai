import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[clamp(600px,100svh,900px)] flex flex-col justify-center overflow-hidden pt-20">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="https://allwebs.ru/images/2026/04/10/e36cc730a48dba001574889717954cad.jpg"
          alt="Загородный дом с установленным интернетом в Калужской области"
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/seed/house/1920/1080";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-8 sm:pt-12 pb-10 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full neon-badge w-fit mb-4 sm:mb-8">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            <span className="text-sm font-medium text-white/90">
              Работаем по Калуге и области 24/7
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

          <p className="hero-desc text-base sm:text-xl text-white/70 leading-relaxed mb-4 max-w-lg">
            Стабильная связь в любой точке Калужской области.
            Забудьте о «мёртвых зонах» и медленных загрузках —
            мы решаем это за 1–2 дня.
          </p>

          <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 sm:mb-10 max-w-lg border-l-2 border-accent pl-4 italic">
            Индивидуальные решения для бесперебойного доступа к глобальной сети. Персональные VPN-каналы, защита от замедления трафика и настройка оборудования под ключ.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 sm:mb-12">
            <Button
              size="lg"
              className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold bg-accent hover:bg-accent/90 text-white border-0 shadow-[0_0_30px_rgba(139,92,246,0.55)] transition-all duration-300 hover:scale-105 rounded-xl btn-pulse"
              onClick={() => scrollTo("contact")}
            >
              Бесплатный замер скорости
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium glass-card border-white/15 text-white hover:border-accent/40 transition-all duration-300 hover:scale-105 rounded-xl btn-pulse-primary"
              onClick={() => scrollTo("calculator")}
            >
              Рассчитать стоимость
            </Button>
          </div>

          <div className="flex items-center gap-3 text-white/60 text-sm sm:text-base">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-accent" />
            </div>
            <p>Используем профессиональное измерительное оборудование</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
