import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const SYSTEM_PROMPT = `Ты — AI-помощник компании Openweb40.ru, интернет-провайдера для загородных домов, дач и коттеджей в Калужской области, Россия.

Твоя задача — помогать потенциальным клиентам: отвечать на вопросы об услугах, тарифах, подключении и зоне покрытия. Говори по-русски, дружелюбно и кратко.

Ключевые факты о компании:
- Телефон: +7 (910) 595-46-68 (Пн–Вс 9:00–21:00, техподдержка 24/7)
- Email: info@openweb40.ru
- Telegram: @krisdev13

Тарифы:
- Стандарт: до 30 Мбит/с, 2 990 ₽/мес, гарантия 1 год
- Оптимальный: до 100 Мбит/с, 4 990 ₽/мес, гарантия 2 года, VPN включён
- Максимум: до 300 Мбит/с, 7 990 ₽/мес, гарантия 3 года, VPN + персональный менеджер 24/7

Услуги: 4G/5G агрегация, спутниковый интернет (Starlink), Mesh Wi-Fi, VPN, резервирование канала, техобслуживание.

Зона покрытия: вся Калужская область (Калуга, Обнинск, Малоярославец, Жуков, Таруса, Козельск, Кондрово и все деревни).

Установка: бесплатный выезд замерщика в течение 24 ч, монтаж 2–4 ч, итого 1–2 рабочих дня. Оборудование: Mikrotik, Ubiquiti, TP-Link, HUAWEI, работает от -40°C до +70°C.

Если клиент хочет подключиться или нужна точная информация по адресу — предложи позвонить на +7 (910) 595-46-68 или написать в Telegram @krisdev13. Отвечай кратко — не более 3–4 предложений.`;

function createClient() {
  const customKey = process.env["OPENROUTER_API_KEY"];

  if (customKey) {
    return new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: customKey,
      defaultHeaders: {
        "HTTP-Referer": "https://openweb40.ru",
        "X-Title": "Openweb40.ru AI Assistant",
      },
    });
  }

  const baseURL = process.env["AI_INTEGRATIONS_OPENROUTER_BASE_URL"];
  const apiKey = process.env["AI_INTEGRATIONS_OPENROUTER_API_KEY"];

  if (!baseURL || !apiKey) return null;

  return new OpenAI({ baseURL, apiKey });
}

const MODELS = [
  "google/gemini-2.0-flash-exp:free",
  "google/gemini-flash-1.5-8b",
  "google/gemini-flash-1.5",
  "meta-llama/llama-3.1-8b-instruct:free",
];

router.post("/chat", async (req, res) => {
  try {
    const client = createClient();

    if (!client) {
      res.status(503).json({ error: "AI service not configured" });
      return;
    }

    const { messages, model: requestedModel } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
      model?: string;
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages array is required" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const modelsToTry = requestedModel ? [requestedModel, ...MODELS] : MODELS;

    let stream;
    let lastError: unknown;

    for (const model of modelsToTry) {
      try {
        stream = await client.chat.completions.create({
          model,
          max_tokens: 512,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        });
        break;
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 429 || status === 404) {
          lastError = err;
          continue;
        }
        throw err;
      }
    }

    if (!stream) {
      res.write(`data: ${JSON.stringify({ error: "Все модели временно недоступны. Позвоните нам: +7 (910) 595-46-68" })}\n\n`);
      res.end();
      console.error("All models unavailable:", lastError);
      return;
    }

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("Chat error:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Ошибка соединения. Попробуйте снова." })}\n\n`);
      res.end();
    }
  }
});

export default router;
