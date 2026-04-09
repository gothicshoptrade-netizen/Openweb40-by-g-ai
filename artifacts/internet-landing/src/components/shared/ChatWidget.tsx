import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Send, Bot, User, Sparkles } from "lucide-react";

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
      text: "Привет! Я AI-помощник Openweb40.ru. Задайте любой вопрос об интернете для загородного дома — отвечу сразу.",
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
    const history = [...messages, userMsg].map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.text,
    }));

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
      abortRef.current = new AbortController();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("Ошибка сервера");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const json = JSON.parse(line.slice(6));
            if (json.content) {
              fullText += json.content;
              const snapshot = fullText;
              setMessages((prev) => {
                const next = [...prev];
                next[placeholderIndex] = { role: "assistant", text: snapshot, streaming: true };
                return next;
              });
              scrollToBottom();
            }
            if (json.done || json.error) {
              setMessages((prev) => {
                const next = [...prev];
                next[placeholderIndex] = {
                  role: "assistant",
                  text: json.error ?? fullText,
                  streaming: false,
                };
                return next;
              });
            }
          } catch {
            // skip malformed
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => {
        const next = [...prev];
        next[placeholderIndex] = {
          role: "assistant",
          text: "Не удалось получить ответ. Позвоните нам: +7 (910) 595-46-68",
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
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-110 transition-transform"
        aria-label="Открыть AI-помощник"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-white" />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-background animate-pulse" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl bg-card border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300"
          style={{ maxHeight: "540px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/20 to-accent/20 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">AI-помощник Openweb40</p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                {loading ? "Думает..." : "Онлайн · Работает на AI"}
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
