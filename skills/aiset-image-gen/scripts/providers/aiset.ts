import nodeFetch from "node-fetch";

// 豆包/ARK 图像生成接口
// main.ts 调用方式: generateImage(prompt, model, args)
export async function generateImage(
  prompt: string,
  model: string,
  args: any
): Promise<Uint8Array> {
  const apiKey =
    process.env.aiset_API_KEY ||
    process.env.ARK_API_KEY ||
    process.env.OPENAI_API_KEY ||
    "";

  if (!apiKey) {
    throw new Error(
      "API Key EMPTY: 请设置 aiset_API_KEY 或 ARK_API_KEY 环境变量"
    );
  }

  const baseUrl =
    process.env.aiset_BASE_URL ||
    process.env.DOUBAO_BASE_URL ||
    "https://ark.cn-beijing.volces.com/api/v3";

  // 解析宽高比，转为 size
  // doubao-seedream-5-0-260128 要求像素数 >= 3686400（约 1920x1920）
  function parseSize(arStr: string): string {
    if (!arStr) return "2048x2048";
    const [w, h] = arStr.split(":").map(Number);
    if (!w || !h) return "2048x2048";
    const ratio = w / h;
    if (ratio >= 1.7) return "3840x2160";  // 16:9 横版
    if (ratio >= 1.3) return "2560x1920";  // 4:3 横版
    if (ratio >= 0.9) return "2048x2048";  // 1:1 方形
    if (ratio >= 0.65) return "1920x2560"; // 3:4 竖版
    return "1440x2880";                    // 1:2 竖版
  }

  const ar = args?.ar || args?.aspect || "1:1";
  const size = parseSize(ar);
  const actualModel = model || "doubao-seedream-5-0-260128";

  console.error(
    `[aiset] Generating image: model=${actualModel}, size=${size}, prompt=${prompt.slice(0, 50)}...`
  );

  // 调用开放平台图像生成 API
  const resp = await (nodeFetch as any)(
    `${baseUrl}/images/generations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: actualModel,
        prompt,
        n: 1,
        size,
        response_format: "url",
        watermark: false,
      }),
    }
  );

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`ARK API 错误 ${resp.status}: ${errText}`);
  }

  const json: any = await resp.json();
  const imageUrl = json?.data?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`ARK API 返回异常: ${JSON.stringify(json)}`);
  }

  console.error(`[aiset] 图片 URL 获取成功，开始下载...`);

  // 下载图片并返回二进制
  const imgResp = await (nodeFetch as any)(imageUrl);
  if (!imgResp.ok) {
    throw new Error(`下载图片失败 ${imgResp.status}`);
  }
  const buffer = await imgResp.buffer();
  return new Uint8Array(buffer);
}

export function getDefaultModel(): string {
  return "doubao-seedream-5-0-260128";
}
