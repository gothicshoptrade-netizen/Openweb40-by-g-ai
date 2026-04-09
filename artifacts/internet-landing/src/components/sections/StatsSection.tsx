import { motion } from "motion/react";

const stats = [
  { value: "1000", suffix: "+", label: "решённых проблем" },
  { value: "300", suffix: "+", label: "довольных клиентов" },
  { value: "10", suffix: " лет", label: "опыта работы" },
  { value: "15", suffix: "+", label: "районов области" },
];

export default function StatsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="bento-card p-8 flex flex-col items-center text-center group hover:border-primary/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3 relative z-10 group-hover:scale-110 transition-transform duration-500">
                {stat.value}<span className="text-primary">{stat.suffix}</span>
              </span>
              <span className="text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] font-bold relative z-10 group-hover:text-white/60 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
