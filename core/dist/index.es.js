import { jsxs as o, jsx as e, Fragment as z } from "react/jsx-runtime";
import { useRef as F, useState as x, useEffect as V, useCallback as I } from "react";
const B = ["B", "KB", "MB", "GB", "TB"], D = (r) => {
  if (r <= 0 || !Number.isFinite(r)) return "0 B";
  const l = 1024, n = Math.floor(Math.log(r) / Math.log(l));
  return `${parseFloat((r / Math.pow(l, n)).toFixed(2))} ${B[n]}`;
}, H = (r, l) => {
  if (!l) return !0;
  const n = l.split(",");
  for (const u of n) {
    const s = u.trim();
    if (s === r) return !0;
    if (s.endsWith("/*")) {
      const d = s.slice(0, -2);
      if (r.startsWith(d + "/")) return !0;
    }
  }
  return !1;
}, L = () => /* @__PURE__ */ o("svg", { width: "22", height: "22", viewBox: "0 0 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ e("path", { d: "M11.9167 1.83325H5.50008C5.01385 1.83325 4.54754 2.02641 4.20372 2.37022C3.8599 2.71404 3.66675 3.18036 3.66675 3.66659V18.3333C3.66675 18.8195 3.8599 19.2858 4.20372 19.6296C4.54754 19.9734 5.01385 20.1666 5.50008 20.1666H16.5001C16.9863 20.1666 17.4526 19.9734 17.7964 19.6296C18.1403 19.2858 18.3334 18.8195 18.3334 18.3333V8.24992L11.9167 1.83325Z", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M11.9167 1.83325V8.24992H18.3334", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })
] }), R = ({ onClick: r }) => /* @__PURE__ */ o("svg", { width: "23", height: "22", viewBox: "0 0 23 22", fill: "none", xmlns: "http://www.w3.org/2000/svg", onClick: r, children: [
  /* @__PURE__ */ e("path", { d: "M3.25 5.5H5.08333H19.75", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M7.8335 5.50001V3.66668C7.8335 3.18045 8.02665 2.71413 8.37047 2.37031C8.71428 2.0265 9.1806 1.83334 9.66683 1.83334H13.3335C13.8197 1.83334 14.286 2.0265 14.6299 2.37031C14.9737 2.71413 15.1668 3.18045 15.1668 3.66668V5.50001M17.9168 5.50001V18.3333C17.9168 18.8196 17.7237 19.2859 17.3799 19.6297C17.036 19.9735 16.5697 20.1667 16.0835 20.1667H6.91683C6.4306 20.1667 5.96428 19.9735 5.62047 19.6297C5.27665 19.2859 5.0835 18.8196 5.0835 18.3333V5.50001H17.9168Z", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M9.6665 10.0833V15.5833", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M13.3335 10.0833V15.5833", stroke: "#000000", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" })
] }), E = ({ file: r, uploadFunc: l, uploadingAllowed: n, setProcessedFiles: u, deleteFunc: s }) => {
  const d = F(null), [i, m] = x(0), C = () => {
    d.current && d.current.abort();
  }, [c, g] = x("idle");
  return V(() => (n && l(r, g, m, d)?.finally(() => {
    u((h) => h.map((p) => p.file === r ? { ...p, uploaded: !0 } : p));
  }), () => {
    d.current?.abort();
  }), [n]), /* @__PURE__ */ o("div", { className: "relative w-full p-2 border border-grey-200 rounded-md mb-1", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center relative", children: [
      /* @__PURE__ */ e(L, {}),
      /* @__PURE__ */ o("div", { className: "ml-4", children: [
        /* @__PURE__ */ e("p", { className: "font-bold text-lg", children: r.name }),
        /* @__PURE__ */ o("div", { className: "text-md flex items-center", children: [
          /* @__PURE__ */ e("p", { className: "text-grey-200", children: D(r.size) }),
          c !== "idle" && c !== "uploading" && /* @__PURE__ */ o("div", { className: "flex items-center ml-1 text-grey-200", children: [
            /* @__PURE__ */ e("p", { children: "•" }),
            /* @__PURE__ */ e("p", { className: "ml-1 text-grey-200 capitalize", children: c })
          ] }),
          i > 0 && c === "uploading" && /* @__PURE__ */ o("p", { className: "absolute right-0 text-grey-200", children: [
            i,
            "%"
          ] })
        ] })
      ] }),
      c === "uploading" && /* @__PURE__ */ o("div", { className: "flex items-center absolute right-2 top-0 cursor-pointer", onClick: C, children: [
        /* @__PURE__ */ e("span", { className: "w-0.5 h-4 block rotate-45 bg-black" }),
        /* @__PURE__ */ e("span", { className: "w-0.5 -ml-0.5 h-4 block -rotate-45 bg-black" })
      ] }),
      c !== "idle" && c !== "uploading" && /* @__PURE__ */ e("div", { className: "absolute right-2 top-0 flex items-center h-full cursor-pointer", children: /* @__PURE__ */ e(R, { onClick: s }) })
    ] }),
    /* @__PURE__ */ e("div", { children: i > 0 && c === "uploading" && /* @__PURE__ */ e("div", { className: "w-full bg-gray-300 rounded-full h-2 mt-2", children: /* @__PURE__ */ e("div", { className: "bg-green-800 h-2 rounded-full", style: { width: `${i}%` } }) }) })
  ] });
};
function _(r) {
  const [l, n] = x([]), [u, s] = x([]), [d, i] = x([]), m = (g, h) => {
    n((p) => {
      const k = p.length, v = [];
      for (const f of g) {
        if (!(h ? H(f.type, h) : !0)) {
          i((a) => [...a, "invalid_file_type"]), s((a) => [...a, f.name]);
          continue;
        }
        if (k + v.length >= r.maxFiles) {
          i((a) => [...a, "max_files_count"]);
          break;
        }
        if (f.size > r.maxFileSize) {
          i((a) => [...a, "big_file_size"]), s((a) => [...a, f.name]);
          continue;
        }
        v.push({
          id: crypto.randomUUID(),
          uploaded: !1,
          file: f
        });
      }
      return [...p, ...v];
    });
  }, C = I((g) => {
    n((h) => h.filter((p) => p.id !== g));
  }, []);
  return {
    processFiles: m,
    processedFiles: l,
    setProcessedFiles: n,
    rejectedFiles: u,
    errors: d,
    removeFile: C,
    clearFiles: () => n([])
  };
}
const $ = () => /* @__PURE__ */ o("svg", { width: "60", height: "60", viewBox: "0 0 60 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ e("path", { d: "M39.9995 40L29.9995 30L19.9995 40", stroke: "#006a4d", "stroke-width": "3.26672", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M30 30V52.5", stroke: "#006a4d", "stroke-width": "3.26672", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M50.9756 45.9747C53.414 44.6454 55.3402 42.5419 56.4503 39.9963C57.5604 37.4506 57.7912 34.6078 57.1061 31.9164C56.4211 29.2251 54.8594 26.8385 52.6673 25.1333C50.4753 23.4282 47.7778 22.5015 45.0006 22.4997H41.8506C41.0939 19.5728 39.6835 16.8556 37.7255 14.5522C35.7675 12.2488 33.3127 10.4193 30.5459 9.20123C27.779 7.98313 24.772 7.40811 21.7509 7.51942C18.7298 7.63073 15.7733 8.42547 13.1036 9.84388C10.4338 11.2623 8.12041 13.2675 6.33719 15.7087C4.55396 18.1499 3.34736 20.9636 2.80808 23.9382C2.26881 26.9128 2.4109 29.971 3.22367 32.8829C4.03644 35.7947 5.49874 38.4844 7.50063 40.7497", stroke: "#006a4d", "stroke-width": "3.26672", "stroke-linecap": "round", "stroke-linejoin": "round" }),
  /* @__PURE__ */ e("path", { d: "M39.9995 40L29.9995 30L19.9995 40", stroke: "#006a4d", "stroke-width": "3.26672", "stroke-linecap": "round", "stroke-linejoin": "round" })
] }), U = ({ accept: r, maxFiles: l, disabled: n, maxFileSize: u, textContent: s, upload: d }) => {
  const {
    processFiles: i,
    processedFiles: m,
    setProcessedFiles: C,
    rejectedFiles: c,
    errors: g,
    removeFile: h,
    clearFiles: p
  } = _({
    maxFiles: l,
    maxFileSize: u
  }), k = F(null), v = () => {
    n || k.current?.click();
  }, f = (t) => {
    if (n) return;
    t.preventDefault();
    const w = t.target;
    if (w) {
      const b = Array.from(w.files || []);
      b.length > 0 && i(b, r);
    }
  }, N = (t) => {
    if (n) return;
    t.preventDefault();
    const w = t.dataTransfer;
    if (w) {
      const b = Array.from(w.files || []);
      b.length > 0 && i(b, r);
    }
  }, [a, y] = x(!1), M = (t) => {
    n || (t.preventDefault(), y(!0));
  }, j = () => {
    k.current && (k.current.value = "");
  };
  return /* @__PURE__ */ e(z, { children: /* @__PURE__ */ o("div", { className: "mt-6", "aria-label": "Dropzone element", "aria-describedby": "dropzone-title", "aria-disabled": n, children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ e(
        "input",
        {
          type: "file",
          ref: k,
          name: "file-select[]",
          id: "file-select",
          multiple: l > 1,
          accept: r || "*/*",
          className: "hidden",
          onChange: (t) => {
            f(t), j();
          }
        }
      ),
      /* @__PURE__ */ o(
        "div",
        {
          role: "button",
          tabIndex: 0,
          "aria-label": "File upload dropzone. Drag and drop files here or press Enter to select.",
          onKeyDown: (t) => {
            (t.key === "Enter" || t.key === " ") && v();
          },
          onClick: v,
          onDragOver: M,
          onDragLeave: () => y(!1),
          onDragEnter: (t) => t.preventDefault(),
          onDrop: (t) => {
            y(!1), N(t);
          },
          className: `
                            select-none rounded-xl flex flex-col justify-center items-center
                            bg-gray-100 h-64 relative w-full
                            border-2 border-dashed border-gray-300
                            ${n ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-green-50 active:bg-green-200"}
                            ${a && !n ? "bg-green-50" : ""}
                        `,
          children: [
            /* @__PURE__ */ e($, {}),
            /* @__PURE__ */ e("p", { className: "text-xl text-center font-medium text-green-800", id: "dropzone-title", children: s?.title || "Drag and drop files here or click to select" }),
            /* @__PURE__ */ e("p", { className: "text-xs", id: "dropzone-description", children: s?.description || `Max file size: ${D(u)}` })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ e("div", { className: "mt-4 relative w-full", children: /* @__PURE__ */ e("div", { className: "mt-2 px-1.5 py-2 box-border relative", children: m.length > 0 ? m.map((t, w) => /* @__PURE__ */ e(
      E,
      {
        file: t.file,
        uploadingAllowed: !t.uploaded,
        setProcessedFiles: C,
        uploadFunc: d,
        deleteFunc: () => h(t.id)
      },
      t.id
    )) : "" }) })
  ] }) });
};
export {
  U as Dropzone,
  D as formatSize,
  _ as useDropzone
};
