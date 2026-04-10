import { useRoute } from "wouter";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "motion/react";

const articles = [
  {
    id: 1, slug: "4g-internet-dacha",
    title: "4G интернет на даче: как выбрать оборудование в 2026 году",
    content: `
      <p>Выбор оборудования для интернета на даче — задача не из простых. В 2026 году технологии шагнули далеко вперед, но базовые принципы остались прежними. Вам нужна мощная антенна, качественный модем и роутер, способный раздать сигнал на весь участок.</p>
      <h3>1. Антенна — сердце системы</h3>
      <p>Для Калужской области мы рекомендуем использовать MIMO-антенны с усилением не менее 15-20 дБ. Это позволяет поймать стабильный сигнал даже там, где телефон показывает "нет сети".</p>
      <h3>2. Агрегация частот</h3>
      <p>Современные модемы поддерживают агрегацию нескольких частотных диапазонов (Cat.6 и выше). Это позволяет суммировать скорость от разных вышек и получать до 100-150 Мбит/с в чистом поле.</p>
      <h3>3. Выбор оператора</h3>
      <p>Не ограничивайтесь одним оператором. Мы всегда проводим замеры всех доступных сетей (МТС, Мегафон, Билайн, Теле2) и выбираем тот, который дает лучший результат в конкретной точке.</p>
    `,
    date: "1 апреля 2026", readTime: "7 мин", author: "Алексей Иванов",
    image: "https://pollinations.ai/p/4G%20internet%20antenna%20on%20a%20country%20house%20roof%20modern%20tech?width=1200&height=600&seed=1&model=flux",
  },
  {
    id: 2, slug: "wifi-pokrytie-bolshoy-dom",
    title: "Как обеспечить Wi-Fi покрытие в доме 300+ м²",
    content: `
      <p>Большая площадь дома — это всегда вызов для Wi-Fi сигнала. Стены, перекрытия и мебель поглощают радиоволны, создавая "мертвые зоны".</p>
      <h3>Mesh-системы — современный стандарт</h3>
      <p>Вместо одного мощного роутера мы рекомендуем использовать Mesh-систему из 3-4 узлов. Они создают единую бесшовную сеть: вы можете ходить по дому, и ваше устройство будет автоматически переключаться на ближайшую точку без разрыва связи.</p>
      <h3>Проводная магистраль (Ethernet Backhaul)</h3>
      <p>Для максимальной стабильности мы соединяем узлы Mesh-системы кабелем. Это гарантирует, что скорость на втором этаже будет такой же высокой, как и на первом.</p>
    `,
    date: "25 марта 2026", readTime: "5 мин", author: "Дмитрий Петров",
    image: "https://pollinations.ai/p/mesh%20wifi%20system%20in%20a%20large%20modern%20luxury%20house%20interior?width=1200&height=600&seed=2&model=flux",
  },
  {
    id: 3, slug: "sputnikoviy-internet-vs-4g",
    title: "Спутниковый интернет vs 4G агрегация: что выбрать для деревни?",
    content: `
      <p>Часто клиенты спрашивают: "А может лучше поставить тарелку?". Давайте разберемся.</p>
      <h3>Спутниковый интернет</h3>
      <p>Плюсы: работает везде, где видно небо. Минусы: высокая задержка (пинг), дорогая абонентская плата, зависимость от погоды. Подходит только для самых глухих мест, где нет даже слабого 4G.</p>
      <h3>4G Агрегация</h3>
      <p>Плюсы: низкий пинг, высокая скорость (до 300 Мбит/с), доступная цена. Минусы: требует наличия хотя бы одной вышки в радиусе 15-20 км. В 95% случаев в Калужской области 4G агрегация выигрывает у спутника.</p>
    `,
    date: "18 марта 2026", readTime: "9 мин", author: "Сергей Волков",
    image: "https://pollinations.ai/p/satellite%20dish%20and%204G%20antenna%20comparison%20on%20a%20rural%20house?width=1200&height=600&seed=3&model=flux",
  }
];

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  
  // In a real app, we'd fetch the article by slug. Here we'll find it in our mock data.
  const article = articles.find(a => a.slug === slug) || articles[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Назад к блогу
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-10 rounded-3xl overflow-hidden border border-white/10 aspect-video relative">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readTime}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-foreground mb-8 leading-tight">
              {article.title}
            </h1>

            <div 
              className="prose prose-invert prose-primary max-w-none text-muted-foreground leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold">Поделиться:</p>
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <button key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary/20 hover:border-primary/40 transition-all">
                      <Share2 className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
