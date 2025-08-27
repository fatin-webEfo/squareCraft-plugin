let __sc_ai_pipe = null,
  __sc_tf_ready = false,
  __sc_ui = null;
async function __sc_load_tf() {
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
  if (!window.__sc_ai_console_enabled) {
    window.__sc_ai_console_enabled = 1;
    const ask0 = __sc_ai_ask,
      apply0 = __sc_apply_json;
    window.__sc_ai_runs = [];
    window.__sc_ai_ask = async function (p, el) {
      const ctx = __sc_ctx(el || document.body);
      const t0 = performance.now();
      const out = await ask0(p, el);
      const t1 = performance.now();
      const run = {
        ts: new Date().toISOString(),
        ms: +(t1 - t0).toFixed(1),
        prompt: p,
        target: ctx.selectedId,
        viewportProgress: ctx.viewportProgress,
        cssVars: ctx.cssVars,
        bullets: ctx.bullets,
        output: out,
      };
      window.__sc_ai_runs.push(run);
      console.groupCollapsed("SC AI " + run.ts + " " + run.ms + "ms");
      console.log("prompt:", p);
      console.log("target:", ctx.selectedId);
      console.log("ctx:", ctx);
      console.log("output:", out);
      console.groupEnd();
      window.dispatchEvent(new CustomEvent("sc:ai:test", { detail: run }));
      return out;
    };
    window.__sc_apply_json = function (txt, el) {
      const res = apply0(txt, el);
      console.groupCollapsed("SC AI Patch");
      console.log("applied:", res.applied);
      console.log("setVars:", res.setVars || {});
      console.log("raw:", txt);
      console.groupEnd();
      window.dispatchEvent(new CustomEvent("sc:ai:patch", { detail: res }));
      return res;
    };
  }
  return __sc_ai_pipe;
}
function __sc_rules(prompt) {
  const out = { setVars: {}, notes: "fallback" };
  const m1 = prompt.match(/blur\s*:\s*(\d+)\s*%/i);
  if (m1) {
    const v = Math.max(0, Math.min(100, parseInt(m1[1], 10)));
    out.setVars["--sc-blur-scroll-center"] = v + "%";
  }
  const m2 = prompt.match(/opacity\s*:\s*(\d+)\s*%/i);
  if (m2) {
    const v = Math.max(0, Math.min(100, parseInt(m2[1], 10)));
    out.setVars["--sc-opacity-scroll-center"] = v + "%";
  }
  if (/reset\s+entry/i.test(prompt)) {
    out.setVars["--sc-blur-scroll-entry"] = "0%";
    out.setVars["--sc-opacity-scroll-entry"] = "100%";
  }
  if (/reset\s+center/i.test(prompt)) {
    out.setVars["--sc-blur-scroll-center"] = "0%";
    out.setVars["--sc-opacity-scroll-center"] = "100%";
  }
  if (/reset\s+exit/i.test(prompt)) {
    out.setVars["--sc-blur-scroll-exit"] = "0%";
    out.setVars["--sc-opacity-scroll-exit"] = "100%";
  }
  return JSON.stringify(out, null, 2);
}
function __sc_ctx(el) {
  const target = el || document.body;
  const s = window.getComputedStyle(target);
  const names = [
    "--sc-blur-scroll-entry",
    "--sc-blur-scroll-center",
    "--sc-blur-scroll-exit",
    "--sc-opacity-scroll-entry",
    "--sc-opacity-scroll-center",
    "--sc-opacity-scroll-exit",
    "--sc-scale-scroll-entry",
    "--sc-scale-scroll-center",
    "--sc-scale-scroll-exit",
    "--sc-rotate-scroll-entry",
    "--sc-rotate-scroll-center",
    "--sc-rotate-scroll-exit",
    "--sc-horizontal-scroll-entry",
    "--sc-horizontal-scroll-center",
    "--sc-horizontal-scroll-exit",
    "--sc-vertical-scroll-entry",
    "--sc-vertical-scroll-center",
    "--sc-vertical-scroll-exit",
    "--sc-blur-scroll-start",
    "--sc-blur-scroll-end",
    "--sc-opacity-scroll-start",
    "--sc-opacity-scroll-end",
  ];
  const cssVars = {};
  names.forEach((n) => {
    cssVars[n] = s.getPropertyValue(n) || "";
  });
  const arrow = document.getElementById("blur-custom-timeline-arrow");
  const bullets = {
    entry:
      document.getElementById("blur-timeline-entry-bullet")?.style.left || "",
    center:
      document.getElementById("blur-timeline-center-bullet")?.style.left || "",
    exit:
      document.getElementById("blur-timeline-exit-bullet")?.style.left || "",
  };
  const r = target.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const toolbar = document.querySelector(
    '[data-routing="editor-toolbar"], .sqs-editor-controls, .sqs-navheader'
  );
  const th = toolbar ? toolbar.getBoundingClientRect().height : 0;
  const visibleTop = th;
  const visibleHeight = Math.max(1, vh - th);
  const center = r.top + r.height / 2;
  let t = (center - visibleTop) / visibleHeight;
  if (Number.isNaN(t)) t = 0.5;
  const viewportProgress = Math.max(0, Math.min(1, t));
  return {
    selectedId: target.id || "(none)",
    viewportProgress,
    cssVars,
    bullets,
    arrowLeft: arrow?.style.left || "",
  };
}
async function __sc_ai_ask(prompt, el) {
  await __sc_ai_init();
  if (__sc_ai_pipe.__local) return __sc_ai_pipe.generate(prompt).generated_text;
  const res = await __sc_ai_pipe(prompt, {
    max_new_tokens: 96,
    temperature: 0.2,
    top_p: 0.95,
  });
  const text = Array.isArray(res)
    ? res[0]?.generated_text
    : res.generated_text || String(res);
  return text;
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
function __btn(txt, onclick) {
  const b = document.createElement("button");
  b.textContent = txt;
  b.style.cssText =
    "padding:.5rem .75rem;border:0;border-radius:.5rem;background:#111;color:#fff;cursor:pointer;font:600 12px/1.1 system-ui;margin-right:.5rem";
  b.onclick = onclick;
  return b;
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
    "Ask for a change. Example: reset entry, center, exit and set blur: 20%";
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
    const sel =
      document.querySelector('[id^="block-"].sc-font-modified') ||
      document.querySelector('[id^="block-"]') ||
      document.body;
    const res = await window.__sc_ai_ask(text, sel);
    out.textContent = String(res || "");
  });
  const btnApply = __btn("Analyze+Apply", async () => {
    const text = ta.value.trim();
    if (!text) return;
    const sel =
      document.querySelector('[id^="block-"].sc-font-modified') ||
      document.querySelector('[id^="block-"]') ||
      document.body;
    const res = await window.__sc_ai_ask(text, sel);
    out.textContent = String(res || "");
    window.__sc_apply_json(res, sel);
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
}
export { __sc_ai_init, __sc_ai_ui, __sc_ai_ask, __sc_apply_json, __sc_ctx };
