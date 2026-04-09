import { Router, Request, Response } from "express";
import { logger } from "../lib/logger";

const router = Router();

router.post("/submit-form", async (req: Request, res: Response) => {
  try {
    const { name, phone, message, address, area, time } = req.body;

    const text = `
Новая заявка с сайта Openweb40.ru!
Имя: ${name || "Не указано"}
Телефон: ${phone || "Не указано"}
${message ? `Сообщение: ${message}` : ""}
${address ? `Адрес: ${address}` : ""}
${area ? `Площадь: ${area} м²` : ""}
${time ? `Удобное время: ${time}` : ""}
    `.trim();

    logger.info({ formData: req.body }, "New form submission");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (!response.ok) {
        logger.error({ status: response.status }, "Failed to send message to Telegram");
      }
    } else {
      logger.warn("Telegram bot token or chat ID is not set. Form data was not forwarded to Telegram.");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    logger.error({ error }, "Error submitting form");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
