import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

const SYSTEM_PROMPT = `Ты — AI-помощник компании Openweb40.ru, интернет-провайдера для загородных домов, дач и коттеджей в Калужской области, Россия.

Твоя задача — помогать потенциальным клиентам: отвечать на вопросы об услугах, тарифах, подключении и зоне покрытия. Говори по-русски, дружелюбно и профессионально.

Ключевые факты о компании:
- Телефон: +7 (910) 595-46-68 (Пн–Вс 9:00–21:00, техподдержка 24/7)
- Email: info@openweb40.ru
- Telegram: @krisdev13

Тарифы:
- Стандарт: до 30 Мбит/с, 2 990 ₽/мес, гарантия 1 год
- Оптимальный: до 100 Мбит/с, 4 990 ₽/мес, гарантия 2 года, VPN включён
- Максимум: до 300 Мбит/с, 7 990 ₽/мес, гарантия 3 года, VPN + персональный менеджер 24/7

Услуги: 4G/5G агрегация, спутниковый интернет (Starlink), Mesh Wi-Fi, VPN, резервирование канала, техобслуживание.

Зона покрытия: вся Калужская область (Калуга, Обнинск, Малоярославец, Жуков, Таруса, Козельск, Кондрово, Перемышль, Ферзиково, Бабынино и все остальные населенные пункты области).

Установка: бесплатный выезд замерщика в течение 24 ч, монтаж 2–4 ч, итого 1–2 рабочих дня. Оборудование: Mikrotik, Ubiquiti, TP-Link, HUAWEI, работает от -40°C до +70°C.

Если клиент хочет подключиться или нужна точная информация по адресу — предложи позвонить на +7 (910) 595-46-68 или написать в Telegram @krisdev13. 
Отвечай по существу, старайся быть полезным даже в нестандартных вопросах, связанных с интернетом и связью в области.`;

type ChatMsg = { role: "user" | "assistant"; text: string; streaming?: boolean };

const quickQuestions = [
  "Сколько стоит подключение?",
  "Как долго ждать установки?",
  "Работаете ли в моём районе?",
  "Что нужно для подключения?",
  "Есть ли VPN?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      text: "Привет! Я ваш интеллектуальный консультант Openweb40.ru. Задайте любой вопрос об интернете для загородного дома — отвечу сразу.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMsg: ChatMsg = { role: "user", text: userText };
    const history = [...messages, userMsg];

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    const placeholderIndex = messages.length + 1;
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: "", streaming: true },
    ]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API key not configured. Please set VITE_GEMINI_API_KEY.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      // Convert history to Gemini format (excluding the current user message which is sent via sendMessageStream)
      // Actually, we can just use the chat object to manage history if we wanted, 
      // but here we'll just send the current message and include previous context if needed.
      // For simplicity, we'll send the whole history as a single prompt or use the chat.sendMessageStream
      
      const historyForGemini = history.slice(0, -1).map(m => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.text }]
      }));

      const streamResponse = await chat.sendMessageStream({
        message: userText,
        // history: historyForGemini // sendMessageStream doesn't take history directly, it's managed by the chat object
      });

      let fullText = "";
      for await (const chunk of streamResponse) {
        const content = chunk.text;
        if (content) {
          fullText += content;
          setMessages((prev) => {
            const next = [...prev];
            next[placeholderIndex] = { role: "assistant", text: fullText, streaming: true };
            return next;
          });
          scrollToBottom();
        }
      }

      setMessages((prev) => {
        const next = [...prev];
        next[placeholderIndex] = {
          role: "assistant",
          text: fullText,
          streaming: false,
        };
        return next;
      });

    } catch (err: unknown) {
      console.error("Chat error:", err);
      setMessages((prev) => {
        const next = [...prev];
        next[placeholderIndex] = {
          role: "assistant",
          text: "Извините, произошла ошибка при подключении к AI. Пожалуйста, позвоните нам: +7 (910) 595-46-68",
          streaming: false,
        };
        return next;
      });
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  }, [messages, loading]);

  const handleSend = () => sendMessage(input);
  const handleQuick = (q: string) => sendMessage(q);

  return (
    <>
      {/* Backdrop blur overlay when open */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-500"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)] hover:scale-110 active:scale-95 transition-all duration-500 group"
        aria-label="Открыть AI-помощник"
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping group-hover:animate-none" />
        {open ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <Sparkles className="w-6 h-6 text-white relative z-10" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse z-20" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 rounded-2xl bg-background/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(139,92,246,0.2)] overflow-hidden flex flex-col transition-all duration-500 ring-1 ring-white/10"
          style={{ maxHeight: "600px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center ring-1 ring-white/20 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground text-sm tracking-tight">Оператор Openweb40</p>
              <p className="text-[10px] text-green-400 flex items-center gap-1 font-medium uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                {loading ? "Печатает..." : "В сети · AI Online"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === "assistant" ? "bg-gradient-to-br from-primary/30 to-accent/30 ring-1 ring-white/10" : "bg-white/10"}`}>
                  {msg.role === "assistant"
                    ? <Bot className="w-4 h-4 text-primary" />
                    : <User className="w-4 h-4 text-foreground" />
                  }
                </div>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white/5 text-foreground" : "bg-primary/80 text-white"}`}>
                  {msg.text || (msg.streaming && (
                    <span className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  ))}
                  {msg.streaming && msg.text && (
                    <span className="inline-block w-0.5 h-4 bg-primary/80 animate-pulse ml-0.5 align-middle" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-col gap-1.5">
              <p className="text-xs text-muted-foreground mb-1">Быстрые вопросы:</p>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuick(q)}
                  disabled={loading}
                  className="text-left text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <Input
              placeholder={loading ? "AI отвечает..." : "Напишите вопрос..."}
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
              className="bg-white/5 border-white/10 focus:border-primary text-sm h-10 disabled:opacity-60"
            />
            <Button
              size="sm"
              className="h-10 px-3 bg-primary hover:bg-primary/90 disabled:opacity-50"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
