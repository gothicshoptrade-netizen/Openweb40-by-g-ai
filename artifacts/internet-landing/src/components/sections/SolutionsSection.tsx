import { useState } from "react";
import { CheckCircle2, XCircle, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

type ViewMode = "cards" | "compare";

const features = [
  "Скорость",
  "Покрытие площади",
  "Устройств",
  "Срок установки",
  "Гарантия",
  "VPN",
  "Персональный менеджер",
  "Роутер",
  "Антенна",
  "Модем",
  "Сим карта",
];

const packages = [
  {
    name: "Стандарт",
    price: "2 990",
    description: "Для небольших дачных домов и сезонного использования",
    color: "border-white/10",
    glowColor: "rgba(59,130,246,0.12)",
    popular: false,
    featureValues: [
      "до 30 Мбит/с",
      "до 100 м²",
      "до 5",
      "1–2 дня",
      "1 год",
      false,
      false,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "Оптимальный",
    price: "4 990",
    description: "Идеальный выбор для постоянного проживания",
    color: "border-primary/50",
    glowColor: "rgba(59,130,246,0.25)",
    popular: true,
    featureValues: [
      "до 100 Мбит/с",
      "до 300 м²",
      "до 15",
      "1 день",
      "2 года",
      true,
      false,
      true,
      true,
      true,
      true,
    ],
  },
  {
    name: "Максимум",
    price: "7 990",
    description: "Профессиональное решение для больших домов и бизнеса",
    color: "border-accent/40",
    glowColor: "rgba(139,92,246,0.2)",
    popular: false,
    featureValues: [
      "до 300 Мбит/с",
      "без ограничений",
      "не ограничено",
      "в день обращения",
      "3 года",
      true,
      true,
      true,
      true,
      true,
      true,
    ],
  },
];

export default function SolutionsSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="solutions" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-badge mb-4">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Наши пакеты услуг</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Тариф под ваши задачи
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Все тарифы включают профессиональный монтаж и настройку
          </p>
        </div>

        {/* View switcher */}
        <div className="flex justify-center mb-6 sm:mb-12">
          <div className="flex p-1 rounded-xl bg-card border border-white/10">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "cards"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="btn-view-cards"
            >
              Тарифы
            </button>
            <button
              onClick={() => setViewMode("compare")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                viewMode === "compare"
                  ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="btn-view-compare"
            >
              Сравнение
            </button>
          </div>
        </div>

        {/* Cards view */}
        <AnimatePresence mode="wait">
          {viewMode === "cards" ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 items-start"
            >
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl glass-card border transition-shadow duration-300 p-4 sm:p-8 ${
                    pkg.popular ? "mt-6 md:-mt-6 md:mb-6 border-accent/40" : "border-white/10"
                  } hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]`}
                >
                  <div data-testid={`card-package-${index}`}>
                    {pkg.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-max">
                        <div className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-accent text-white text-sm font-bold shadow-[0_0_25px_rgba(139,92,246,0.6)] whitespace-nowrap">
                          <Star className="w-3.5 h-3.5 fill-white shrink-0" />
                          Популярный выбор
                        </div>
                      </div>
                    )}

                    <div className="mb-6 mt-4 md:mt-2">
                      <h3 className="text-xl font-bold text-foreground mb-2">{pkg.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{pkg.description}</p>
                      <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl sm:text-5xl font-extrabold text-foreground whitespace-nowrap">{pkg.price}&nbsp;₽</span>
                      </div>
                      <div className="text-sm text-primary font-semibold">{pkg.featureValues[0] as string}</div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.featureValues.slice(1).map((val, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-sm">
                          {typeof val === "boolean" ? (
                            val ? (
                              <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                            )
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          )}
                          <span className={typeof val === "boolean" && !val ? "text-white/25" : "text-muted-foreground"}>
                            {features[fi + 1]}{typeof val === "string" ? `: ${val}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full h-12 font-semibold rounded-xl btn-pulse ${
                        pkg.popular
                          ? "bg-accent hover:bg-accent/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                          : "bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
                      }`}
                      onClick={() => scrollTo("contact")}
                      data-testid={`btn-package-select-${index}`}
                    >
                      Выбрать тариф
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto rounded-2xl border border-white/10"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-5 text-muted-foreground font-medium w-48">Характеристика</th>
                    {packages.map((pkg, i) => (
                      <th key={i} className={`p-5 text-center ${pkg.popular ? "bg-primary/10" : ""}`}>
                        <div className="font-bold text-foreground text-lg">{pkg.name}</div>
                        <div className="text-primary font-semibold mt-1">{pkg.price}&nbsp;₽</div>
                        {pkg.popular && (
                          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            <Star className="w-3 h-3 fill-primary" />
                            Топ
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, fi) => (
                    <tr key={fi} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                      <td className="p-5 text-muted-foreground font-medium">{feature}</td>
                      {packages.map((pkg, pi) => {
                        const val = pkg.featureValues[fi];
                        return (
                          <td key={pi} className={`p-5 text-center ${pkg.popular ? "bg-primary/5" : ""}`}>
                            {typeof val === "boolean" ? (
                              val ? (
                                <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
                              ) : (
                                <XCircle className="w-5 h-5 text-white/20 mx-auto" />
                              )
                            ) : (
                              <span className="text-foreground font-medium">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-5" />
                    {packages.map((pkg, i) => (
                      <td key={i} className={`p-5 ${pkg.popular ? "bg-primary/5" : ""}`}>
                        <Button
                          className={`w-full h-10 font-semibold btn-pulse-primary ${
                            pkg.popular
                              ? "bg-primary hover:bg-primary/90 text-white"
                              : "bg-white/5 hover:bg-white/10 border border-white/10 text-foreground"
                          }`}
                          onClick={() => scrollTo("contact")}
                          data-testid={`btn-compare-select-${i}`}
                        >
                          Выбрать
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-muted-foreground mt-12 text-sm">
          Не уверены какой тариф выбрать?{" "}
          <button
            onClick={() => scrollTo("calculator")}
            className="text-primary underline underline-offset-4 hover:text-primary/80"
            data-testid="link-go-calculator"
          >
            Воспользуйтесь калькулятором
          </button>
        </p>
      </div>
    </section>
  );
}
