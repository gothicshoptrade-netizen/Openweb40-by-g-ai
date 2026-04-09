import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { MapPin, Zap, Home, Building2, TreePine } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type FilterType = "all" | "dacha" | "cottage" | "village";

const filters: { key: FilterType; label: string; icon: typeof Home }[] = [
  { key: "all", label: "Все проекты", icon: Building2 },
  { key: "dacha", label: "Дача", icon: TreePine },
  { key: "cottage", label: "Коттедж", icon: Home },
  { key: "village", label: "Деревня", icon: MapPin },
];

const projects = [
  {
    type: "cottage" as FilterType,
    title: "Коттедж 350 м², Тарутино",
    description: "4G агрегация + Mesh Wi-Fi на весь дом и участок 20 соток",
    speed: "120 Мбит/с",
    devices: 18,
    area: 350,
    tags: ["4G агрегация", "Mesh Wi-Fi", "Резерв"],
    gradient: "from-primary/30 to-blue-600/20",
    difficulty: "Сложный",
  },
  {
    type: "dacha" as FilterType,
    title: "Дача 80 м², Малоярославецкий р-н",
    description: "Спутниковый интернет для сезонного использования",
    speed: "50 Мбит/с",
    devices: 4,
    area: 80,
    tags: ["Спутник", "Сезонный"],
    gradient: "from-accent/30 to-purple-600/20",
    difficulty: "Стандартный",
  },
  {
    type: "village" as FilterType,
    title: "Дом в деревне Красное",
    description: "Решение под ключ для постоянного проживания в 60 км от Калуги",
    speed: "80 Мбит/с",
    devices: 10,
    area: 150,
    tags: ["4G", "VPN", "Удалённость"],
    gradient: "from-primary/25 to-blue-600/15",
    difficulty: "Сложный",
  },
  {
    type: "cottage" as FilterType,
    title: "Коттеджный посёлок, Жуков",
    description: "Подключение 8 домов к единой инфраструктуре с общим каналом",
    speed: "300 Мбит/с",
    devices: 45,
    area: 1200,
    tags: ["Групповое", "Оптика", "Резерв"],
    gradient: "from-accent/20 to-purple-400/15",
    difficulty: "Проект",
  },
  {
    type: "dacha" as FilterType,
    title: "СНТ «Берёзка», Боровск",
    description: "Базовая станция для всего садового товарищества (32 участка)",
    speed: "100 Мбит/с",
    devices: 60,
    area: 0,
    tags: ["Базовая станция", "СНТ"],
    gradient: "from-pink-400/20 to-rose-400/15",
    difficulty: "Проект",
  },
  {
    type: "village" as FilterType,
    title: "Ферма, Думиничский р-н",
    description: "Стабильное подключение для мониторинга оборудования фермы",
    speed: "60 Мбит/с",
    devices: 12,
    area: 500,
    tags: ["IoT", "Мониторинг", "Бизнес"],
    gradient: "from-cyan-400/20 to-blue-400/15",
    difficulty: "Стандартный",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Портфолио проектов
            </h1>
            <p className="text-muted-foreground text-xl">
              Реальные объекты — реальные результаты. Более 1000 подключений по Калужской области
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {filters.map((f) => {
              const Icon = f.icon;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    filter === f.key
                      ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                      : "bg-card border border-white/10 text-muted-foreground hover:border-white/25 hover:text-foreground"
                  }`}
                  data-testid={`btn-filter-${f.key}`}
                >
                  <Icon className="w-4 h-4" />
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Projects grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-card border border-white/10 hover:border-white/25 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                  data-testid={`card-project-${i}`}
                >
                {/* Gradient image */}
                <div className={`h-44 bg-gradient-to-br ${project.gradient} relative flex items-end p-5`}>
                  <div className="absolute inset-0 bg-grid-white opacity-10" />
                  <div className="flex gap-2 flex-wrap relative z-10">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/90 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      project.difficulty === "Проект" ? "bg-accent/30 text-accent" :
                      project.difficulty === "Сложный" ? "bg-red-500/20 text-red-400" :
                      "bg-accent/20 text-accent"
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-primary font-bold">
                        <Zap className="w-4 h-4" />
                        {project.speed}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">скорость</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-foreground">{project.devices}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">устройств</div>
                    </div>
                    {project.area > 0 && (
                      <div className="text-center">
                        <div className="font-bold text-foreground">{project.area} м²</div>
                        <div className="text-xs text-muted-foreground mt-0.5">покрытие</div>
                      </div>
                    )}
                  </div>
                </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-16 p-10 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-2xl font-bold text-foreground mb-3">Ваш объект может стать следующим</p>
            <p className="text-muted-foreground mb-8">Оставьте заявку — разберёмся с любой сложностью</p>
            <a href="tel:+79105954668" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors shadow-[0_0_25px_rgba(59,130,246,0.5)]" data-testid="btn-portfolio-cta">
              Позвонить: +7 (910) 595-46-68
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
