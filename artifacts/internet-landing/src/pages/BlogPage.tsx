import { useState } from "react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";

const allTags = ["Все", "4G", "Wi-Fi", "спутник", "оборудование", "советы", "сравнение", "безопасность"];

const articles = [
  {
    id: 1, slug: "4g-internet-dacha",
    title: "4G интернет на даче: как выбрать оборудование в 2026 году",
    excerpt: "Разбираем ключевые параметры: усиление антенны, диапазоны частот, внешние и внутренние модемы. Что реально работает в Калужской области.",
    date: "1 апреля 2026", readTime: "7 мин",
    tags: ["4G", "оборудование"],
    image: "https://allwebs.ru/images/2026/04/12/765f42ac7983b23fc6f99aa3b625671d.jpg", featured: true,
  },
  {
    id: 2, slug: "wifi-pokrytie-bolshoy-dom",
    title: "Как обеспечить Wi-Fi покрытие в доме 300+ м²",
    excerpt: "Mesh-системы, точки доступа, powerline-адаптеры — сравниваем решения и даём конкретные рекомендации для загородных домов.",
    date: "25 марта 2026", readTime: "5 мин",
    tags: ["Wi-Fi", "советы"],
    image: "https://allwebs.ru/images/2026/04/12/2abbb8b6ff61709d78e4ca132b99b2c4.jpg", featured: false,
  },
  {
    id: 3, slug: "sputnikoviy-internet-vs-4g",
    title: "Спутниковый интернет vs 4G агрегация: что выбрать для деревни?",
    excerpt: "Сравниваем Starlink, OneWeb и операторов сотовой связи. Реальные данные скоростей в отдалённых районах Калужской области.",
    date: "18 марта 2026", readTime: "9 мин",
    tags: ["спутник", "4G", "сравнение"],
    image: "https://allwebs.ru/images/2026/04/12/a70baa6a128e295bcbabc4d811429695.jpg", featured: false,
  },
  {
    id: 4, slug: "vpn-zagorodnyj-dom",
    title: "Зачем нужен VPN в загородном доме: полный разбор",
    excerpt: "VPN для безопасности, обхода блокировок, удалённой работы и умного дома. Когда стоит подключать, а когда нет.",
    date: "10 марта 2026", readTime: "6 мин",
    tags: ["безопасность", "советы"],
    image: "https://allwebs.ru/images/2026/04/12/c27e866d5b18212a509ecb46ed983f73.jpg", featured: false,
  },
  {
    id: 5, slug: "routery-dlya-dachy",
    title: "Лучшие роутеры для дачи 2026: рейтинг и сравнение",
    excerpt: "TP-Link, Keenetic, Mikrotik — какой выбрать? Составили честный рейтинг с реальными тестами в условиях загородного дома.",
    date: "3 марта 2026", readTime: "8 мин",
    tags: ["оборудование", "Wi-Fi", "сравнение"],
    image: "https://allwebs.ru/images/2026/04/12/f7f0a5303811be2e9cb323e6b3498d53.jpg", featured: false,
  },
  {
    id: 6, slug: "umnyj-dom-internet",
    title: "Умный дом без стабильного интернета — невозможно",
    excerpt: "Как правильно организовать сеть для устройств умного дома: IoT-сегментация, резервирование, скорость. Практические советы.",
    date: "24 февраля 2026", readTime: "7 мин",
    tags: ["советы", "безопасность"],
    image: "https://allwebs.ru/images/2026/04/12/c6c809e4963f4a7926f62e5b306b86c2.jpg", featured: false,
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("Все");

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = activeTag === "Все" || a.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Статьи и советы об интернете{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">для загородной жизни</span>
            </h1>
            <p className="text-muted-foreground text-xl">
              Экспертные материалы от специалистов с 5-летним опытом работы в Калужской области
            </p>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по статьям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-white/10 focus:border-primary h-11"
                data-testid="input-blog-search"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {allTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTag === tag ? "bg-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "bg-card border border-white/10 text-muted-foreground hover:border-white/25"
                }`}
                data-testid={`btn-tag-${tag}`}>
                {tag !== "Все" && <Tag className="w-3.5 h-3.5" />}
                {tag}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 rounded-2xl bg-card border border-white/10 overflow-hidden hover:border-primary/30 transition-colors group"
              data-testid="card-featured-article"
            >
              <div className="h-64 relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 relative z-10">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold mr-2">Главная</span>
                  {featured.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-xs font-medium mr-2 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                <Link href={`/blog/${featured.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all" data-testid="link-featured-article">
                  Читать статью <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Rest */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {rest.map((article, i) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-2xl bg-card border border-white/10 overflow-hidden hover:border-white/25 group transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                  data-testid={`card-article-${i}`}
                >
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 flex gap-2">
                      {article.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-[10px] border border-white/10">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">{article.excerpt}</p>
                    <Link href={`/blog/${article.slug}`} className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all" data-testid={`link-article-${i}`}>
                      Читать <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-xl mb-2">По вашему запросу ничего не найдено</p>
              <button onClick={() => { setSearch(""); setActiveTag("Все"); }} className="text-primary underline">Сбросить фильтры</button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
