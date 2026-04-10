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
      className="group relative p-4 rounded-xl glass-card hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
      data-testid={`card-problem-${index}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center group-hover:bg-accent/25 transition-colors duration-300 border border-accent/20">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function ProblemsSection() {
  return (
    <section id="problems" className="py-8 sm:py-12 relative">
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full neon-badge mb-3">
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Знакомые проблемы?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-foreground mb-3 tracking-tight">
            Вы не одиноки в борьбе с интернетом
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            Тысячи жителей Калужской области сталкиваются с теми же трудностями каждый день. Мы знаем, как это исправить.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
