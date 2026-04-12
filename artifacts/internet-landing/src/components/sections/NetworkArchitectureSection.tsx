import { motion } from "motion/react";
import { Globe, Lock, Cpu, Zap } from "lucide-react";

export default function NetworkArchitectureSection() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 sm:p-8 md:p-16 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-accent/10 to-background border border-accent/30 shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden group"
      >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full neon-badge mb-6">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-[10px] sm:text-sm font-medium text-accent uppercase tracking-wider">Связь без ограничений</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight mb-6 uppercase">
                Интернет без границ <br className="hidden sm:block" />
                <span className="gradient-text">и зависаний.</span>
              </h2>
              
              <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 text-left">
                Настраиваем связь, которая работает. Проводим интернет и создаем персональную архитектуру вашей домашней сети. 
                Благодаря тонкой настройке (на уровне роутера) приватных протоколов связи, вы получаете стабильный доступ к любым ресурсам. 
                Забудьте о постоянно отваливающихся приложениях — один раз настроил, и всё работает на всех ваших устройствах без потери скорости.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 border border-accent/30">
                    <Lock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Приватные протоколы</h4>
                    <p className="text-sm text-white/60">Безопасный доступ к любым ресурсам без ограничений</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Тонкая настройка</h4>
                    <p className="text-sm text-white/60">Оптимизация на уровне ядра роутера для всех устройств</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group-hover:border-accent/30 transition-colors duration-500">
                <img 
                  src="https://i.postimg.cc/wBTtJ3TY/IMG-20260412-154019-836.jpg" 
                  alt="Network Architecture"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Floating UI elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 p-4 rounded-2xl glass-card border-accent/30 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-bold">Status</p>
                      <p className="text-xs text-white font-bold">Stable Connection</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-8 right-8 p-4 rounded-2xl glass-card border-primary/30 backdrop-blur-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase font-bold">Protocol</p>
                      <p className="text-xs text-white font-bold">Optimized Routing</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
    </section>
  );
}
