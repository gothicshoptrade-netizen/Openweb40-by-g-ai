import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Play, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Александр Петров",
    location: "с. Тарутино, Жуковский р-н",
    rating: 5,
    date: "15 марта 2026",
    text: "Живём на даче круглый год. Раньше мобильного еле хватало на переписку, не то что на работу из дома. Openweb40.ru решили вопрос за один день — теперь стабильные 80 Мбит/с и видеозвонки без зависаний.",
    hasVideo: true,
    videoThumb: "bg-gradient-to-br from-primary/30 to-blue-500/20",
  },
  {
    name: "Елена Соколова",
    location: "д. Ивановка, Калужский р-н",
    rating: 5,
    date: "2 апреля 2026",
    text: "Долго не могла найти нормальных специалистов. Openweb40.ru приехали, всё измерили, предложили решение. Через два дня был интернет. Дети счастливы, муж работает из дома без проблем.",
    hasVideo: false,
    videoThumb: "",
  },
  {
    name: "Дмитрий Козлов",
    location: "г.п. Воротынск",
    rating: 5,
    date: "18 февраля 2026",
    text: "Взял пакет Максимум для коттеджа 300 кв. Покрытие отличное во всём доме и на участке. Скорость реальная, не как обещают. Поддержка отзывается быстро. Честная цена за такой сервис.",
    hasVideo: true,
    videoThumb: "bg-gradient-to-br from-accent/30 to-purple-500/20",
  },
  {
    name: "Ирина Новикова",
    location: "д. Красное, Малоярославецкий р-н",
    rating: 5,
    date: "5 января 2026",
    text: "Работаю дизайнером удалённо — качество интернета критично. Переехала загород и думала, придётся возвращаться в город. Openweb40.ru спасли ситуацию. Загрузка файлов, видеоконференции — всё идеально.",
    hasVideo: false,
    videoThumb: "",
  },
  {
    name: "Сергей Волков",
    location: "пос. Детчино, Малоярославецкий р-н",
    rating: 4,
    date: "20 декабря 2025",
    text: "Подключили месяц назад. Скорость хорошая, сигнал стабильный даже в сильный мороз. Установка аккуратная. Немного долго ждал выезда для замера скорости, но в целом очень доволен.",
    hasVideo: false,
    videoThumb: "",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-4 h-4 ${s <= rating ? "text-accent fill-accent" : "text-white/20"}`} />
      ))}
    </div>
  );
}

function VideoPreview({ thumb }: { thumb: string }) {
  return (
    <div className={`relative w-full aspect-video rounded-xl overflow-hidden mb-4 cursor-pointer group ${thumb}`}>
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-transform group-hover:scale-110"
        >
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </div>
      </div>
      <div className="absolute bottom-2 left-3 text-xs text-white/70">Видеоотзыв</div>
    </div>
  );
}

function MapVisualization() {
  // Yandex Map points format: lon,lat,style
  const points = [
    "36.249674,54.513845,pm2rdl", // Калуга
    "36.5953,55.1033,pm2rdl",    // Обнинск
    "36.4633,55.0114,pm2rdl",    // Малоярославец
    "36.7472,55.0031,pm2rdl",    // Жуков
    "37.1789,54.7289,pm2rdl",    // Таруса
    "35.9311,54.8056,pm2rdl",    // Кондрово
    "35.7833,54.0333,pm2rdl",    // Козельск
    "34.45,53.8667,pm2rdl",      // Людиново
    "34.3,54.0667,pm2rdl",       // Киров
    "35.8667,54.9667,pm2rdl",    // Медынь
    "36.4833,55.2167,pm2rdl"     // Боровск
  ].join("~");

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-white/10" style={{ height: "320px" }}>
      <iframe
        src={`https://yandex.ru/map-widget/v1/?l=map&pt=${points}&z=8`}
        title="Зона покрытия Openweb40.ru — Калужская область"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
      <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm text-xs text-muted-foreground border border-white/10">
        Зона покрытия — Калужская область
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i + 1) % testimonials.length);

  const visible3 = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section id="reviews" className="p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-badge mb-4">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-accent">Отзывы клиентов</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Что говорят наши клиенты
          </h2>
          <p className="text-muted-foreground text-sm">
            Более 300 семей уже подключены по всей Калужской области
          </p>
        </div>

        {/* 3D-Carousel */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-10">
          {visible3.map((t, idx) => (
            <div
              key={`${current}-${idx}`}
              className={`p-6 rounded-2xl bg-card border flex flex-col gap-4 transition-all duration-300 ${idx === 1 ? "border-primary/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[1.03]" : "border-white/10 opacity-75"}`}
              data-testid={`card-testimonial-${idx}`}
            >
              {t.hasVideo && <VideoPreview thumb={t.videoThumb} />}
              <div className="flex items-start justify-between">
                <div>
                  <StarRating rating={t.rating} />
                  <p className="text-xs text-muted-foreground mt-1">{t.date}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name[0]}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" /> {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-10">
          <div
            key={current}
            className="p-6 rounded-2xl bg-card border border-white/10 flex flex-col gap-4 transition-all duration-300"
          >
            {testimonials[current].hasVideo && <VideoPreview thumb={testimonials[current].videoThumb} />}
            <StarRating rating={testimonials[current].rating} />
            <p className="text-muted-foreground text-sm">"{testimonials[current].text}"</p>
            <div>
              <p className="font-semibold text-foreground text-sm">{testimonials[current].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[current].location}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <button onClick={prev} className="w-12 h-12 rounded-xl bg-card border border-white/10 hover:border-white/30 flex items-center justify-center text-foreground transition-all" data-testid="btn-testimonials-prev">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-white/20 w-2"}`}
                data-testid={`btn-testimonials-dot-${i}`}
              />
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 rounded-xl bg-card border border-white/10 hover:border-white/30 flex items-center justify-center text-foreground transition-all" data-testid="btn-testimonials-next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Map visualization */}
        <div>
          <p className="text-center text-muted-foreground text-sm mb-6 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Наши клиенты по всей Калужской области
          </p>
          <MapVisualization />
        </div>
      </div>
    </section>
  );
}
