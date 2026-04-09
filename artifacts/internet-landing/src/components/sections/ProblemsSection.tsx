import { WifiOff, MapPin, DollarSign, Cable, Zap, Radio } from "lucide-react";

const problems = [
  {
    icon: WifiOff,
    title: "Слабый сигнал",
    description: "Интернет ловит только в одной точке дома, и то нестабильно",
  },
  {
    icon: MapPin,
    title: "Мертвые зоны",
    description: "Целые комнаты и участок остаются без покрытия",
  },
  {
    icon: DollarSign,
    title: "Дорогой мобильный",
    description: "Тратите тысячи на мобильный интернет, который всё равно подводит",
  },
  {
    icon: Cable,
    title: "Нет проводного",
    description: "Провайдеры отказывают в подключении из-за удалённости",
  },
  {
    icon: Zap,
    title: "Низкая скорость",
    description: "Видеозвонки зависают, стриминг буферизируется",
  },
  {
    icon: Radio,
    title: "Нестабильная связь",
    description: "Интернет постоянно пропадает, особенно в плохую погоду",
  },
];

function ProblemCard({ icon: Icon, title, description, index }: {
  icon: typeof WifiOff;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group relative p-6 rounded-2xl glass-card hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      data-testid={`card-problem-${index}`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-300 border border-accent/20">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProblemsSection() {
  return (
    <section id="problems" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full neon-badge mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium text-accent">Знакомые проблемы?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Вы не одиноки в борьбе с интернетом
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg">
            Тысячи жителей Калужской области сталкиваются с теми же трудностями каждый день
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
