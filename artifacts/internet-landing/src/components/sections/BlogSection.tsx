import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";

const articles = [
  {
    id: 1,
    slug: "4g-internet-dacha",
    title: "4G интернет на даче: как выбрать оборудование в 2026 году",
    excerpt:
      "Разбираем ключевые параметры: усиление антенны, диапазоны частот, внешние и внутренние модемы. Что реально работает в Калужской области.",
    date: "1 апреля 2026",
    readTime: "7 мин",
    tags: ["4G", "оборудование", "антенны"],
    image: "https://picsum.photos/seed/antenna/800/600",
  },
  {
    id: 2,
    slug: "wifi-pokrytie-bolshoy-dom",
    title: "Как обеспечить Wi-Fi покрытие в доме площадью 300+ м²",
    excerpt:
      "Mesh-системы, точки доступа, powerline-адаптеры — сравниваем решения и даём конкретные рекомендации для загородных домов.",
    date: "25 марта 2026",
    readTime: "5 мин",
    tags: ["Wi-Fi", "mesh", "покрытие"],
    image: "https://picsum.photos/seed/wifi/800/600",
  },
  {
    id: 3,
    slug: "sputnikoviy-internet-vs-4g",
    title: "Спутниковый интернет vs 4G агрегация: что выбрать для деревни?",
    excerpt:
      "Сравниваем Starlink, OneWeb и операторов сотовой связи. Реальные данные скоростей в отдалённых районах Калужской области.",
    date: "18 марта 2026",
    readTime: "9 мин",
    tags: ["спутник", "4G", "сравнение"],
    image: "https://picsum.photos/seed/satellite/800/600",
  },
];

export default function BlogSection() {
  return (
    <section id="blog" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="text-sm font-medium text-muted-foreground">Полезные статьи</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Блог и советы
            </h2>
            <p className="text-muted-foreground text-lg mt-3">
              Экспертные материалы об интернете для загородной жизни
            </p>
          </motion.div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-foreground font-medium transition-all shrink-0"
            data-testid="link-all-articles"
          >
            Все статьи
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl bg-card border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              data-testid={`card-article-${index}`}
            >
              {/* Image header */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
                  data-testid={`link-article-${index}`}
                >
                  Читать статью
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
