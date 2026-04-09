import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { CheckCircle2, Wifi, Radio, Satellite, Router, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const services = [
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
    price: "от 2 990 ₽/мес",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
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
    price: "от 4 990 ₽/мес",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
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
    price: "от 15 000 ₽ (монтаж)",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
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
    price: "от 500 ₽/мес",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
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
    price: "от 1 500 ₽/мес",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    icon: Wifi,
    title: "Техобслуживание",
    description:
      "Регулярное обслуживание, мониторинг и быстрое устранение неисправностей. Ваш интернет всегда работает.",
    features: [
      "Мониторинг 24/7",
      "Выезд в течение 4 часов",
      "Удалённая диагностика",
      "Обновление прошивок",
      "Плановые ТО",
    ],
    price: "включено в тариф",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    border: "border-pink-400/30",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="pt-28 pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-sm font-medium text-primary">Услуги Openweb40.ru</span>
            </div>
            <h1 className="text-5xl font-extrabold text-foreground mb-6">
              Полный спектр услуг{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                для загородного интернета
              </span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Подбираем и монтируем оборудование под ваши условия. Гарантируем результат.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
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
                  <div className="pt-4 border-t border-white/10">
                    <span className={`text-lg font-bold ${service.color}`}>{service.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center p-12 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20">
            <h2 className="text-3xl font-bold text-foreground mb-4">Не знаете что выбрать?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Наш специалист бесплатно выедет на объект, оценит условия и предложит оптимальное решение именно для вашего случая.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-white shadow-[0_0_25px_rgba(59,130,246,0.5)]" data-testid="btn-services-cta">
                  Бесплатный выезд
                </Button>
              </Link>
              <a href="tel:+79105954668">
                <Button size="lg" variant="outline" className="h-14 px-10 border-white/20 bg-white/5 hover:bg-white/10 text-white" data-testid="btn-services-phone">
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
