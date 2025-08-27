let __sc_ai_pipe = null;
let __sc_tf_ready = false;
let __sc_ui = null;

export async function __sc_load_tf() {
  if (__sc_tf_ready) return;
  await new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src =
      "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/transformers.min.js";
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
  const t = window.transformers;
  t.env.allowRemoteModels = true;
  t.env.backends.onnx.wasm.wasmPaths =
    "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/";
  __sc_tf_ready = true;
}

async function __sc_ai_init() {
  if (__sc_ai_pipe) return __sc_ai_pipe;
  try {
    await __sc_load_tf();
    const t = window.transformers;
    const candidates = [
      "Xenova/TinyLlama-1.1B-Chat-v1.0",
      "Xenova/Qwen2.5-0.5B-Instruct",
    ];
    let lastErr = null;
    for (const m of candidates) {
      try {
        __sc_ai_pipe = await t.pipeline("text-generation", m);
        break;
      } catch (e) {
        lastErr = e;
      }
    }
    if (!__sc_ai_pipe) throw lastErr || new Error("no-model");
  } catch (_) {
    __sc_ai_pipe = {
      __local: true,
      generate: async (text) => ({ generated_text: __sc_rules(text) }),
    };
  }

  return __sc_ai_pipe;
}

function __sc_rules(prompt) {
  const out = { setVars: {}, notes: "fallback" };

  // Styling queries, e.g., "set border to 10px solid red"
  const border = prompt.match(/border\s*:\s*(\d+px)\s*(\w+)/i);
  if (border) {
    const width = border[1];
    const style = border[2];
    out.setVars["--sc-button-border"] = `${width} ${style}`;
  }

  // General Queries, like "How to use the plugin?"
  const usage = prompt.match(/how\s*to\s*use\s*squarecraft/i);
  if (usage) {
    out.setVars["--sc-description"] =
      "SquareCraft helps customize Squarespace buttons, typography, and more with advanced scroll effects.";
  }

  // Reset Commands
  if (/reset\s+button\s*styles/i.test(prompt)) {
    out.setVars["--sc-button-border"] = "0px solid transparent";
  }

  return JSON.stringify(out, null, 2);
}

async function __sc_ai_ask(prompt, el) {
  await __sc_ai_init();
  if (__sc_ai_pipe.__local) return __sc_ai_pipe.generate(prompt).generated_text;
  const res = await __sc_ai_pipe(prompt, {
    max_new_tokens: 96,
    temperature: 0.2,
    top_p: 0.95,
  });
  return Array.isArray(res)
    ? res[0]?.generated_text
    : res.generated_text || String(res);
}

function __sc_apply_json(text, el) {
  let json = null;
  try {
    const m = text.match(/\{[\s\S]*\}$/);
    json = m ? JSON.parse(m[0]) : JSON.parse(text);
  } catch (_) {}
  const target =
    el ||
    document.querySelector('[id^="block-"].sc-font-modified') ||
    document.body;
  const applied = [],
    setVars = {};
  if (json && json.setVars && typeof json.setVars === "object") {
    Object.entries(json.setVars).forEach(([k, v]) => {
      target.style.setProperty(k, String(v), "important");
      applied.push(k);
      setVars[k] = String(v);
    });
  }
  return { applied, setVars, target };
}

function __sc_ai_ui() {
  if (__sc_ui) return __sc_ui;

  const box = document.createElement("div");
  box.id = "sc-ai-tester";
  box.style.cssText =
    "position:fixed;right:16px;bottom:16px;width:min(520px,92vw);background:#0b0b0c;color:#eaeaea;border:1px solid #2a2a2d;border-radius:12px;box-shadow:0 12px 40px rgba(0,0,0,.4);z-index:999999;display:flex;flex-direction:column;overflow:hidden";

  const head = document.createElement("div");
  head.style.cssText =
    "display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #1f1f22";
  const h = document.createElement("div");
  h.textContent = "SquareCraft AI";
  h.style.cssText = "font:600 13px/1.2 system-ui";
  const close = document.createElement("button");
  close.textContent = "×";
  close.style.cssText =
    "background:transparent;border:0;color:#aaa;font:700 16px/1 system-ui;cursor:pointer";
  close.onclick = () => {
    box.style.display = "none";
  };
  head.append(h, close);

  const ta = document.createElement("textarea");
  ta.placeholder =
    "Ask for a change. Example: reset button, set border: 10px solid red, change opacity: 50%";
  ta.style.cssText =
    "min-height:100px;resize:vertical;background:#0f0f12;color:#e6e6e8;border:0;outline:none;padding:12px 12px 0 12px;font:500 12px/1.45 ui-monospace,Menlo,Consolas,monospace";

  const out = document.createElement("pre");
  out.style.cssText =
    "margin:0;padding:12px;max-height:180px;overflow:auto;background:#0f0f12;border-top:1px solid #1f1f22;color:#a7f3d0;font:500 12px/1.45 ui-monospace,Menlo,Consolas,monospace";

  const bar = document.createElement("div");
  bar.style.cssText =
    "display:flex;align-items:center;justify-content:flex-start;padding:10px 12px;border-top:1px solid #1f1f22;background:#0f0f12";

  const btnAnalyze = __btn("Analyze", async () => {
    const text = ta.value.trim();
    if (!text) return;
    const res = await __sc_ai_ask(text);
    out.textContent = String(res || "");
  });

  const btnApply = __btn("Analyze+Apply", async () => {
    const text = ta.value.trim();
    if (!text) return;
    const res = await __sc_ai_ask(text);
    out.textContent = String(res || "");
    __sc_apply_json(res);
  });

  bar.append(btnAnalyze, btnApply);
  box.append(head, ta, bar, out);
  document.body.appendChild(box);

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "a") {
      box.style.display = box.style.display === "none" ? "flex" : "none";
      if (box.style.display !== "none") ta.focus();
    }
  });

  __sc_ui = box;
  return box;

  function __btn(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.onclick = onClick;
    return button;
  }

}

export { __sc_ai_init, __sc_ai_ui, __sc_ai_ask, __sc_apply_json };

// index.js
