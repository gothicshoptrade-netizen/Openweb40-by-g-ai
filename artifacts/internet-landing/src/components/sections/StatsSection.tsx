import { motion } from "motion/react";

const stats = [
  { value: "1000", suffix: "+", label: "решённых проблем" },
  { value: "300", suffix: "+", label: "довольных клиентов" },
  { value: "10", suffix: "лет", label: "опыта работы" },
  { value: "15", suffix: "+", label: "районов области" },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl md:text-6xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </span>
                  <span className={`font-bold ${stat.suffix === "лет" ? "text-lg md:text-2xl text-primary/80 lowercase" : "text-3xl md:text-5xl text-primary"}`}>
                    {stat.suffix}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-bold max-w-[120px] leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
