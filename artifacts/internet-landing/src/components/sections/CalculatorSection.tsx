import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "motion/react";

export default function CalculatorSection() {
  const [area, setArea] = useState(150);
  const [devices, setDevices] = useState(5);
  const [needVpn, setNeedVpn] = useState(false);
  const [distance, setDistance] = useState(30);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const basePrice = 1500;
  const areaPrice = Math.round((area / 50) * 500);
  const devicePrice = Math.round(devices * 80);
  const vpnPrice = needVpn ? 500 : 0;
  const distancePrice = Math.round((distance / 10) * 200);
  const totalPrice = Math.min(15000, Math.max(1500, basePrice + areaPrice + devicePrice + vpnPrice + distancePrice));

  const getPackageName = () => {
    if (totalPrice <= 3500) return "Стандарт";
    if (totalPrice <= 6000) return "Оптимальный";
    return "Максимум";
  };

  return (
    <section id="calculator" className="p-4 sm:p-6 md:p-8 relative">
      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full neon-badge mb-4">
            <span className="text-sm font-medium text-accent">Калькулятор</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Рассчитайте стоимость
          </h2>
          <p className="text-muted-foreground text-sm">
            Укажите параметры — получите расчёт за секунды
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Controls */}
          <div className="space-y-6 p-6 rounded-2xl bg-white/3 border border-white/10">
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Площадь дома</label>
                <span className="text-lg font-bold text-primary" data-testid="calc-area-value">{area} м²</span>
              </div>
              <Slider
                min={50}
                max={500}
                step={10}
                value={[area]}
                onValueChange={(v) => setArea(v[0])}
                className="w-full"
                data-testid="calc-area-slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>50 м²</span>
                <span>500 м²</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Количество устройств</label>
                <span className="text-lg font-bold text-primary" data-testid="calc-devices-value">{devices}</span>
              </div>
              <Slider
                min={1}
                max={20}
                step={1}
                value={[devices]}
                onValueChange={(v) => setDevices(v[0])}
                className="w-full"
                data-testid="calc-devices-slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1 устройство</span>
                <span>20 устройств</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-semibold text-foreground">Удалённость от города</label>
                <span className="text-lg font-bold text-primary" data-testid="calc-distance-value">{distance} км</span>
              </div>
              <Slider
                min={5}
                max={100}
                step={5}
                value={[distance]}
                onValueChange={(v) => setDistance(v[0])}
                className="w-full"
                data-testid="calc-distance-slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5 км</span>
                <span>100 км</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground mb-4 block">Нужен ли VPN?</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setNeedVpn(true)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    needVpn
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                  }`}
                  data-testid="calc-vpn-yes"
                >
                  Да, нужен
                </button>
                <button
                  onClick={() => setNeedVpn(false)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    !needVpn
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                  }`}
                  data-testid="calc-vpn-no"
                >
                  Не нужен
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-accent/15 to-primary/10 border border-accent/25 flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Рекомендуемый пакет</p>
              <h3 className="text-2xl font-bold text-foreground mb-8">{getPackageName()}</h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground text-sm">Базовое подключение</span>
                  <span className="text-foreground font-medium whitespace-nowrap">{basePrice.toLocaleString("ru-RU")}&nbsp;₽</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground text-sm">За площадь ({area} м²)</span>
                  <span className="text-foreground font-medium whitespace-nowrap">+{areaPrice.toLocaleString("ru-RU")}&nbsp;₽</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground text-sm">За устройства ({devices} шт)</span>
                  <span className="text-foreground font-medium whitespace-nowrap">+{devicePrice.toLocaleString("ru-RU")}&nbsp;₽</span>
                </div>
                {needVpn && (
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-muted-foreground text-sm">VPN сервис</span>
                    <span className="text-foreground font-medium whitespace-nowrap">+{vpnPrice.toLocaleString("ru-RU")}&nbsp;₽</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-muted-foreground text-sm">Удалённость ({distance} км)</span>
                  <span className="text-foreground font-medium whitespace-nowrap">+{distancePrice.toLocaleString("ru-RU")}&nbsp;₽</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={totalPrice}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/10 mb-8"
                >
                  <p className="text-sm text-muted-foreground mb-1">Итого в месяц</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-foreground whitespace-nowrap" data-testid="calc-total-price">
                      {totalPrice.toLocaleString("ru-RU")}
                    </span>
                    <span className="text-2xl text-primary font-bold mb-1">₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Точная стоимость — после выезда замерщика скорости</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              size="lg"
              className="w-full h-auto min-h-14 py-4 px-5 text-base font-semibold bg-accent hover:bg-accent/90 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] rounded-xl leading-snug whitespace-normal text-center"
              onClick={() => scrollTo("contact")}
              data-testid="btn-calculator-cta"
            >
              Оставить заявку с этим расчётом
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
