import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "Сколько времени занимает установка?",
    answer: "В среднем монтаж занимает 2–4 часа на объекте. Для большого дома или сложного рельефа — до одного рабочего дня. Выезд специалиста для замера скорости профессиональным оборудованием происходит в течение 24 часов. Итого: от заявки до интернета — 1–2 дня.",
  },
  {
    question: "Какое оборудование вы используете?",
    answer: "Работаем с оборудованием Mikrotik, Ubiquiti, TP-Link, HUAWEI. Для каждого объекта подбираем оптимальное решение: 4G/5G агрегация, спутник или направленная радиосвязь. Всё сертифицировано и с официальной гарантией.",
  },
  {
    question: "Работает ли интернет зимой?",
    answer: "Да, оборудование работает при температуре от -40°C до +70°C. За 5 лет работы не было ни одного выхода из строя из-за морозов. Специально выбираем оборудование с промышленными характеристиками для уличного применения.",
  },
  {
    question: "Какая гарантия предоставляется?",
    answer: "Гарантия зависит от пакета: Стандарт — 1 год, Оптимальный — 2 года, Максимум — 3 года. Бесплатно устраняем неисправности оборудования и перенастраиваем сеть в течение гарантийного срока.",
  },
  {
    question: "Какие способы оплаты доступны?",
    answer: "Наличные, карта (Visa, Mastercard, МИР), СБП, безналичный перевод для юрлиц. Ежемесячная абонентская плата — автоматически или вручную.",
  },
  {
    question: "В каких районах вы работаете?",
    answer: "Вся Калужская область: Калуга, Обнинск, Малоярославец, Жуков, Кондрово, Таруса, Козельск и все прилегающие районы. Выезжаем в отдалённые деревни и посёлки.",
  },
  {
    question: "Какую скорость можно ожидать?",
    answer: "Стандарт — 20–30 Мбит/с, Оптимальный — 50–100 Мбит/с, Максимум — 150–300 Мбит/с. Замерщик тестирует сигнал на месте и гарантирует минимальную скорость перед подписанием договора.",
  },
  {
    question: "Есть ли техническая поддержка?",
    answer: "Техподдержка 24/7 для всех тарифов. Стандарт — телефон и email. Оптимальный — приоритетная поддержка, ответ за 30 мин. Максимум — выделенная линия поддержки и удалённый мониторинг вашей сети в реальном времени.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-badge mb-4">
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Частые вопросы</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Вопросы и ответы
          </h2>
          <p className="text-muted-foreground text-sm">
            Не нашли свой вопрос — спросите в чате справа внизу!
          </p>
        </div>

        <div className="w-full">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-white/10 rounded-xl px-6 py-2 hover:border-white/20 transition-colors data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center p-8 rounded-2xl bg-primary/10 border border-primary/20">
            <p className="text-foreground font-semibold mb-2">Не нашли ответ?</p>
            <p className="text-muted-foreground mb-6">
              Используйте AI-чат справа внизу или позвоните нам прямо сейчас
            </p>
            <a
              href="tel:+79105954668"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              data-testid="link-faq-phone"
            >
              +7 (910) 595-46-68
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
