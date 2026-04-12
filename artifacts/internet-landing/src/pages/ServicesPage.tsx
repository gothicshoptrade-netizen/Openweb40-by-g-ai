import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { CheckCircle2, Wifi, Radio, Satellite, Router, Shield, Zap, Video, GraduationCap, Settings, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "motion/react";

const services = [
  {
    icon: Shield,
    title: "Отказоустойчивые сети для дома и бизнеса",
    description:
      "Наша специализация — не просто прокладка кабеля, а создание умной маршрутизации трафика. Мы используем современные протоколы маскировки и индивидуальные настройки прокси/VPN, которые не подвержены массовым блокировкам и замедлениям. Вы получаете чистый, быстрый и безопасный интернет.",
    features: [
      "Умная маршрутизация трафика",
      "Протоколы маскировки",
      "Защита от блокировок",
      "Индивидуальные настройки VPN",
      "Безопасный доступ к ресурсам",
    ],
    price: "от 5 000 ₽",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  {
    icon: Radio,
    title: "4G/5G агрегация",
    description:
      "Объединение нескольких операторов в единый канал для максимальной скорости и стабильности. Работает даже при слабом сигнале одного оператора.",
    features: [
      "Скорость до 300 Мбит/с",
      "Несколько SIM-карт одновременно",
      "Автопереключение при потере сигнала",
      "Внешние направленные антенны",
      "Работа в морозы до -40°C",
    ],
    price: "от 2 990 ₽",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: Video,
    title: "Видеонаблюдение",
    description:
      "Профессиональный подбор оборудования и качественный монтаж систем видеонаблюдения для частных домов и участков.",
    features: [
      "Подбор IP и аналоговых камер",
      "Удалённый доступ со смартфона",
      "Запись в облако или на диск",
      "Детекция движения и уведомления",
      "Ночная съёмка высокой чёткости",
    ],
    price: "от 12 000 ₽",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  {
    icon: Satellite,
    title: "Спутниковый интернет",
    description:
      "Подключение к современным спутниковым операторам. Идеально для мест, где мобильный сигнал полностью отсутствует.",
    features: [
      "Покрытие 100% территории области",
      "Скорость до 100 Мбит/с",
      "Работает в любом месте",
      "Монтаж тарелки и оборудования",
      "Настройка и гарантия",
    ],
    price: "от 4 990 ₽",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: Router,
    title: "Mesh Wi-Fi покрытие",
    description:
      "Профессиональное создание бесшовного Wi-Fi по всему дому и участку. Больше никаких мёртвых зон.",
    features: [
      "Покрытие до 1000+ м²",
      "Бесшовный роуминг",
      "Управление из приложения",
      "Гостевая сеть",
      "Родительский контроль",
    ],
    price: "от 15 000 ₽",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  {
    icon: Shield,
    title: "VPN и защита",
    description:
      "Настройка корпоративных VPN-туннелей, межсетевых экранов и систем защиты от внешних угроз.",
    features: [
      "Корпоративный VPN",
      "Межсетевой экран",
      "Защита от DDoS",
      "Шифрование трафика",
      "Мониторинг сети 24/7",
    ],
    price: "от 500 ₽",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: Zap,
    title: "Резервирование канала",
    description:
      "Автоматическое переключение на резервный канал при сбое основного. Максимальная доступность интернета.",
    features: [
      "Failover за секунды",
      "2+ независимых канала",
      "Балансировка нагрузки",
      "Мониторинг и оповещения",
      "Ноль простоев",
    ],
    price: "от 1 500 ₽",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  {
    icon: GraduationCap,
    title: "Бесплатное обучение",
    description:
      "Обучаем самостоятельной настройке вашего оборудования. Wi-Fi, VPN, прокси — делимся знаниями бесплатно.",
    features: [
      "Настройка роутера и Wi-Fi",
      "VPN своими руками",
      "Конфигурация прокси",
      "Оптимизация каналов",
      "Безопасность сети",
    ],
    price: "Бесплатно",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Наши{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                профессиональные услуги
              </span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Подбираем и монтируем оборудование под ваши условия. Гарантируем результат.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-2xl bg-card border ${service.border} hover:shadow-lg transition-all duration-300`}
                  data-testid={`card-service-${i}`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${service.color}`} />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className={`text-lg font-bold ${service.color}`}>{service.price}</span>
                    <a href="tel:+79105954668">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 15px rgba(59, 130, 246, 0.4)",
                            "0 0 0px rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs px-4">
                          Заказать
                        </Button>
                      </motion.div>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 mb-20">
            <h2 className="text-2xl font-bold text-foreground mb-3">Не знаете что выбрать?</h2>
            <p className="text-muted-foreground text-base mb-6 max-w-2xl mx-auto">
              Наш специалист бесплатно выедет на объект, оценит условия и предложит оптимальное решение именно для вашего случая.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]" data-testid="btn-services-cta">
                  Бесплатный выезд
                </Button>
              </Link>
              <a href="tel:+79105954668">
                <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 bg-white/5 hover:bg-white/10 text-white whitespace-nowrap" data-testid="btn-services-phone">
                  +7 (910) 595-46-68
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
