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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/3 border border-white/10"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
              {stat.value}{stat.suffix}
            </span>
            <span className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-medium">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
