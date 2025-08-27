let __sc_ai_pipe = null,
  __sc_tf_ready = false,
  __sc_ui = null;

async function __sc_load_tf() {
  if (__sc_tf_ready) return;
  await new Promise((r, j) => {
    const s = document.createElement("script");
    s.src =
      "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/transformers.min.js";
    s.onload = r;
    s.onerror = j;
    document.head.appendChild(s);
  });
  const t = window.transformers;
  t.env.allowRemoteModels = true;
  t.env.backends.onnx.wasm.wasmPaths =
    "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1/dist/";
  __sc_tf_ready = true;
}

function __kb() {
  return [
    {
      k: /\b(how|getting started|install|setup|use|tutorial)\b/i,
      a: "Open the editor, click any block, then click the SquareCraft icon. Use Typography, Buttons, or Images tabs to tweak styles. The Timeline controls (Entry/Center/Exit + Start/End) sync to scroll. Hover tabs hold hover-only styles. Presets apply starter looks. Save in Squarespace as usual.",
    },
    {
      k: /\b(price|pricing|purchase|buy|license|plan|subscription)\b/i,
      a: "SquareCraft is offered with free basic tools and a paid plan for advanced presets and scroll effects. Payments are handled via the Webefo checkout link your admin provides. If your site has a token in the embed code, you are on the paid tier.",
    },
    {
      k: /\b(feature|what can it do|capability|abilities)\b/i,
      a: "Typography system with live presets, button designer (icons, borders, radius, shadows), image masks and hover, advanced scroll effects (vertical, horizontal, opacity, scale, rotate, blur) with draggable Entry/Center/Exit bullets, structure spacing controls, and an AI tester that can apply changes from plain text.",
    },
    {
      k: /\b(trouble|not work|bug|issue|arrow|bullet|drag|save)\b/i,
      a: "Make sure the widget is open, GSAP scripts loaded, and you clicked a block. If bullets do not stay, ensure the track is visible and CSS vars are being set on the selected block. Use Analyze to inspect values and Analyze+Apply to rewrite them.",
    },
  ];
}

function __match_kb(p) {
  for (const it of __kb()) {
    if (it.k.test(p)) return it.a;
  }
  return null;
}

function __num(x, fb = 0) {
  const n = parseFloat(String(x).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : fb;
}

function __col(s) {
  return String(s).trim();
}

function __want(p, word) {
  return new RegExp("\\b" + word + "\\b", "i").test(p);
}

function __pickTargetKind(p) {
  if (/\bbutton(s)?\b/i.test(p)) return "button";
  if (/\bimage(s)?|img\b/i.test(p)) return "image";
  if (/\btext|heading|paragraph|title\b/i.test(p)) return "text";
  return "auto";
}

function __parseBorder(p) {
  const m =
    p.match(
      /border(?:[^:]*?:)?\s*([.\d]+)\s*px(?:\s+(\w+))?(?:\s+([#\w(),.\s-]+))?/i
    ) ||
    p.match(
      /\bset\b.*\bborder\b.*?([.\d]+)\s*px(?:\s+(\w+))?(?:\s+([#\w(),.\s-]+))?/i
    );
  if (!m) return null;
  return {
    width: __num(m[1], 1) + "px",
    style: (m[2] || "solid").toLowerCase(),
    color: m[3] ? __col(m[3]) : "currentColor",
  };
}

function __parseRadius(p) {
  const m =
    p.match(/radius\s*[: ]\s*([.\d]+)\s*px/i) ||
    p.match(/\b(border-?)?radius\b.*?([.\d]+)\s*px/i);
  if (!m) return null;
  return __num(m[1] || m[2], 0) + "px";
}

function __parseColor(p) {
  const m = p.match(
    /\b(color|font color|text color|background|bg)\s*[: ]\s*([#\w(),.\s-]+)/i
  );
  if (!m) return null;
  return {
    key: /bg|background/i.test(m[1]) ? "backgroundColor" : "color",
    val: __col(m[2]),
  };
}

function __parseOpacity(p) {
  const m = p.match(/\bopacity\s*[: ]\s*([.\d]+)%?/i);
  if (!m) return null;
  let v = __num(m[1], 100);
  if (v > 1 && v <= 100) v /= 100;
  v = Math.max(0, Math.min(1, v));
  return String(v);
}

function __parseTimelineTriple(p, prefix) {
  const re = new RegExp(prefix + "\\s*[: ]\\s*([\\d.]+)%?", "i");
  const re2 = new RegExp("(entry|center|exit)\\s*[: ]\\s*([\\d.]+)%", "ig");
  let out = {};
  let m = p.match(re);
  if (m) {
    out.center = Math.max(0, Math.min(100, __num(m[1])));
  }
  let k;
  while ((k = re2.exec(p))) {
    out[k[1]] = Math.max(0, Math.min(100, __num(k[2])));
  }
  return Object.keys(out).length ? out : null;
}

function __parseStartEnd(p, prefix) {
  const s = p.match(
    new RegExp(prefix + "\\s*start\\s*[: ]\\s*([\\d.]+)%", "i")
  );
  const e = p.match(new RegExp(prefix + "\\s*end\\s*[: ]\\s*([\\d.]+)%", "i"));
  const o = {};
  if (s) o.start = Math.max(0, Math.min(100, __num(s[1])));
  if (e) o.end = Math.max(0, Math.min(100, __num(e[1])));
  return Object.keys(o).length ? o : null;
}

function __route(prompt) {
  const p = prompt.trim();
  const faq = __match_kb(p);
  if (faq) return { type: "faq", text: faq };

  const targetKind = __pickTargetKind(p);
  const styles = {};
  const setVars = {};

  const b = __parseBorder(p);
  if (b) {
    styles.borderWidth = b.width;
    styles.borderStyle = b.style;
    styles.borderColor = b.color;
  }

  const r = __parseRadius(p);
  if (r) styles.borderRadius = r;

  const c = __parseColor(p);
  if (c) styles[c.key] = c.val;

  const o = __parseOpacity(p);
  if (o) styles.opacity = o;

  const bl = __parseTimelineTriple(p, "blur");
  if (bl) {
    if (bl.entry != null) setVars["--sc-blur-scroll-entry"] = bl.entry + "%";
    if (bl.center != null) setVars["--sc-blur-scroll-center"] = bl.center + "%";
    if (bl.exit != null) setVars["--sc-blur-scroll-exit"] = bl.exit + "%";
  }

  const op = __parseTimelineTriple(p, "opacity");
  if (op) {
    if (op.entry != null) setVars["--sc-opacity-scroll-entry"] = op.entry + "%";
    if (op.center != null)
      setVars["--sc-opacity-scroll-center"] = op.center + "%";
    if (op.exit != null) setVars["--sc-opacity-scroll-exit"] = op.exit + "%";
  }

  const sc = __parseTimelineTriple(p, "scale");
  if (sc) {
    if (sc.entry != null) setVars["--sc-scale-scroll-entry"] = sc.entry + "%";
    if (sc.center != null)
      setVars["--sc-scale-scroll-center"] = sc.center + "%";
    if (sc.exit != null) setVars["--sc-scale-scroll-exit"] = sc.exit + "%";
  }

  const ro = __parseTimelineTriple(p, "rotate");
  if (ro) {
    if (ro.entry != null) setVars["--sc-rotate-scroll-entry"] = ro.entry + "%";
    if (ro.center != null)
      setVars["--sc-rotate-scroll-center"] = ro.center + "%";
    if (ro.exit != null) setVars["--sc-rotate-scroll-exit"] = ro.exit + "%";
  }

  const hs = __parseStartEnd(p, "horizontal|x|horiz");
  if (hs) {
    if (hs.start != null)
      setVars["--sc-horizontal-scroll-start"] = hs.start + "%";
    if (hs.end != null) setVars["--sc-horizontal-scroll-end"] = hs.end + "%";
  }

  const vs = __parseStartEnd(p, "vertical|y|vert");
  if (vs) {
    if (vs.start != null)
      setVars["--sc-vertical-scroll-start"] = vs.start + "%";
    if (vs.end != null) setVars["--sc-vertical-scroll-end"] = vs.end + "%";
  }

  const wantsStyle =
    Object.keys(styles).length ||
    Object.keys(setVars).length ||
    __want(p, "border") ||
    __want(p, "radius") ||
    __want(p, "color") ||
    __want(p, "opacity") ||
    __want(p, "blur") ||
    __want(p, "scale") ||
    __want(p, "rotate");

  if (wantsStyle)
    return {
      type: "style",
      json: JSON.stringify({ setVars, targets: targetKind, styles }, null, 2),
    };

  return {
    type: "faq",
    text: "I can explain features, pricing, and apply styles from plain text. Try: set button border 2px solid #EF7C2F; or blur: entry 10%, center 20%, exit 0%.",
  };
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
  names.forEach((n) => (cssVars[n] = s.getPropertyValue(n) || ""));
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

function __select_targets(base, kind) {
  if (!base) base = document;
  const btnSel =
    "a.sqs-button-element--primary, a.sqs-button-element--secondary, a.sqs-button-element--tertiary, a.sqs-block-button-element, button.sqs-button-element--primary, button.sqs-button-element--secondary, button.sqs-button-element--tertiary";
  const txtSel = "h1,h2,h3,h4,h5,h6,p,li,blockquote,span";
  const imgSel = "img,picture img,.image-block img";
  if (kind === "button") return Array.from(base.querySelectorAll(btnSel));
  if (kind === "text") return Array.from(base.querySelectorAll(txtSel));
  if (kind === "image") return Array.from(base.querySelectorAll(imgSel));
  return Array.from(
    base.querySelectorAll(btnSel + "," + txtSel + "," + imgSel)
  );
}

function __apply_styles(base, kind, styles) {
  const nodes = __select_targets(base, kind);
  nodes.forEach((n) => {
    Object.entries(styles).forEach(([k, v]) =>
      n.style.setProperty(k, String(v), "important")
    );
  });
  return nodes.map((n) => n.tagName.toLowerCase());
}

async function __sc_ai_init() {
  if (__sc_ai_pipe) return __sc_ai_pipe;
  try {
    await __sc_load_tf();
    const t = window.transformers;
    const models = [
      "Xenova/TinyLlama-1.1B-Chat-v1.0",
      "Xenova/Qwen2.5-0.5B-Instruct",
    ];
    let last = null;
    for (const m of models) {
      try {
        __sc_ai_pipe = await t.pipeline("text-generation", m);
        break;
      } catch (e) {
        last = e;
      }
    }
    if (!__sc_ai_pipe) throw last || new Error("no-model");
  } catch (_) {
    __sc_ai_pipe = {
      __local: true,
      generate: async (txt) => {
        const r = __route(txt);
        return r.type === "style"
          ? { generated_text: r.json }
          : { generated_text: r.text };
      },
    };
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
          ctx,
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
        console.log("targets:", res.targets || []);
        console.log("raw:", txt);
        console.groupEnd();
        window.dispatchEvent(new CustomEvent("sc:ai:patch", { detail: res }));
        return res;
      };
    }
    return __sc_ai_pipe;
  }
}

async function __sc_ai_ask(prompt, el) {
  await __sc_ai_init();
  const routed = __route(prompt);
  if (__sc_ai_pipe.__local) {
    return routed.type === "style" ? routed.json : routed.text;
  }
  if (routed.type === "style") return routed.json;
  const res = await __sc_ai_pipe(prompt, {
    max_new_tokens: 120,
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
    setVars = {},
    targets = [];
  if (json && json.setVars && typeof json.setVars === "object") {
    Object.entries(json.setVars).forEach(([k, v]) => {
      target.style.setProperty(k, String(v), "important");
      applied.push(k);
      setVars[k] = String(v);
    });
  }
  if (json && json.styles && Object.keys(json.styles).length) {
    const kind = typeof json.targets === "string" ? json.targets : "auto";
    const tags = __apply_styles(target, kind, json.styles);
    tags.forEach((t) => targets.push(t));
  }
  return { applied, setVars, targets, target };
}
