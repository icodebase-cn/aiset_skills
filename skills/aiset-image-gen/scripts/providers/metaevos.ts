import nodeFetch from "node-fetch";
import * as fs from "fs";
import * as path from "path";

// 元绻平台图像生成接口（兼容 OpenAI 图像生成格式）
export async function generateImage(
  prompt: string,
  model: string,
  args: any
): Promise<Uint8Array> {
  const apiKey =
    process.env.OPENAI_API_KEY ||
    process.env.METAEVOS_API_KEY ||
    process.env.GEMINI_API_KEY ||
    "";

  if (!apiKey) {
    throw new Error(
      "API Key EMPTY: 请设置 OPENAI_API_KEY 或 METAEVOS_API_KEY 环境变量"
    );
  }

  const baseUrl =
    process.env.OPENAI_BASE_URL ||
    process.env.METAEVOS_BASE_URL ||
    "https://open.metaevos.ai/v1";

  const actualModel = model || "gemini-3.1-flash-image-preview";

  console.error(
    `[metaevos] Generating image: model=${actualModel}, prompt=${prompt.slice(0, 50)}...`
  );

  // 使用 chat/completions 内嵌图像生成接口
  const targetURL = baseUrl.replace(/\/+$/, "") + "/chat/completions";
  const reqBody = {
    model: actualModel,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    response_modalities: ["IMAGE", "TEXT"],
  };

  const resp = await (nodeFetch as any)(targetURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(reqBody),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`metaevos API 错误 ${resp.status}: ${errText}`);
  }

  // 流式读取响应体（metaevos 强制使用 SSE 流式传输）
  const rawBody = await new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    resp.body.on("data", (chunk: Buffer) => chunks.push(chunk));
    resp.body.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    resp.body.on("error", reject);
  });

  // SSE 格式：每行 "data: {...}" 或 "data: [DONE]"，提取最后一个完整 JSON
  let json: any = null;
  const lines = rawBody.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const jsonStr = trimmed.slice(5).trim();
    if (jsonStr === "[DONE]") break;
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed?.choices) json = parsed;
    } catch (_) {}
  }
  // 如果不是 SSE 格式，尝试直接解析整体
  if (!json) {
    try { json = JSON.parse(rawBody); } catch (_) {}
  }

  if (!json) {
    throw new Error(`metaevos API 响应解析失败. 响应前200字节: ${rawBody.slice(0, 200)}`);
  }

  // 提取 base64 图像数据
  let imageBase64 = "";
  const choices = json?.choices || [];
  for (const choice of choices) {
    const parts = choice?.message?.content || choice?.delta?.content;
    if (Array.isArray(parts)) {
      for (const part of parts) {
        if (part?.type === "image_url") {
          const dataUrl = part?.image_url?.url || "";
          if (dataUrl.startsWith("data:")) {
            imageBase64 = dataUrl.split(",")[1] || "";
          } else {
            const imgResp = await (nodeFetch as any)(dataUrl);
            if (!imgResp.ok) throw new Error(`下载图片失败 ${imgResp.status}`);
            const buffer = await imgResp.buffer();
            return new Uint8Array(buffer);
          }
          break;
        }
        if (part?.type === "inlineData" || part?.inline_data) {
          imageBase64 = part?.inlineData?.data || part?.inline_data?.data || "";
          break;
        }
      }
    } else if (typeof parts === "string") {
      const match = parts.match(/data:image\/[^;]+;base64,([^"'\s]+)/);
      if (match) imageBase64 = match[1];
    }
    if (imageBase64) break;
  }

  if (!imageBase64) {
    throw new Error(`metaevos API 返回异常：未找到图像数据. 响应: ${JSON.stringify(json).slice(0, 200)}`);
  }

  console.error(`[metaevos] 图片数据获取成功，开始写入文件...`);
  return Buffer.from(imageBase64, "base64") as unknown as Uint8Array;
}

export function getDefaultModel(): string {
  return "gemini-3.1-flash-image-preview";
}
