"use client"

import { useEffect, useRef, useState } from "react"
import { introDelayMs, prefersReducedMotion } from "@/components/fx/env"
import { clamp01 } from "@/lib/utils"

// 地平線を走る一本の光の線。上空にオーロラ、足元に奥へ流れる方眼の床を描く
const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHorizon;
uniform float uReveal;
uniform float uFade;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = m * p;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  float xn = uv.x - 0.5;
  float t = uTime;
  vec2 m = uMouse;

  float horizon = uHorizon + 0.004 * sin(uv.x * 5.0 + t * 0.4);
  float d = uv.y - horizon;
  float dpx = d * uRes.y;

  vec3 base = vec3(0.0196, 0.0275, 0.0471);
  vec3 azure = vec3(0.0, 0.71, 1.0);
  vec3 sky = vec3(0.49, 0.85, 1.0);
  vec3 blue = vec3(0.0, 0.34, 0.85);
  vec3 indigo = vec3(0.39, 0.40, 1.0);
  vec3 col = base;

  // 光の線は中央から左右へ伸びていく
  float extent = 0.78 * uReveal;
  float profile = smoothstep(extent, extent * 0.3, abs(xn));
  float flare = exp(-pow((uv.x - m.x) * 4.5, 2.0));

  // 線の上を走るペン先の光
  float cx = fract(t * 0.065) * 1.8 - 0.4;
  float dx = cx - uv.x;
  float comet = dx > 0.0 ? exp(-dx * 4.0) : exp(dx * 70.0);

  if (d > 0.0) {
    // オーロラのカーテン
    vec2 q = vec2(xn * aspect + (m.x - 0.5) * 0.1, d);
    float warp = fbm(vec2(q.x * 1.2 + t * 0.022, q.y * 1.5 - t * 0.035));
    float rays = fbm(vec2(q.x * 4.2 + warp * 2.4, t * 0.05 + q.y * 0.4));
    rays = pow(rays, 2.3) * 2.6;
    float falloff = exp(-d * 2.6) * smoothstep(0.0, 0.03, d);
    vec3 aur = mix(azure, indigo, smoothstep(0.0, 0.5, d + (warp - 0.5) * 0.25));
    col += aur * rays * falloff * 0.5 * (0.35 + 0.65 * profile);

    // 地平線の上に広がる光のドーム
    float dome = exp(-length(vec2(xn * 1.15, d * 1.9)) * 3.4);
    col += mix(blue, azure, 0.35) * dome * 0.4 * uReveal;

    // またたく星
    vec2 sc = uv * vec2(aspect, 1.0) * 85.0;
    vec2 cell = floor(sc);
    float r = hash(cell);
    if (r > 0.991) {
      vec2 sp = fract(sc) - 0.5;
      float tw = 0.5 + 0.5 * sin(t * (0.8 + r * 3.0) + r * 50.0);
      col += sky * smoothstep(0.09, 0.0, length(sp)) * tw * 0.55 * smoothstep(0.04, 0.35, d);
    }
  } else {
    // 手前へ流れてくる方眼の床
    float depth = -d;
    float z = 0.08 / (depth + 0.0015);
    vec2 g = vec2(xn * aspect * z * 2.2, z * 1.5 + t * 0.4);
    vec2 f = abs(fract(g + 0.5) - 0.5);
#ifdef HAS_DERIV
    vec2 w = fwidth(g) * 1.3;
#else
    vec2 w = vec2(0.03) * max(z, 1.0);
#endif
    vec2 l = 1.0 - smoothstep(vec2(0.0), w + 0.004, f);
    float density = clamp(1.0 - max(w.x, w.y) * 1.6, 0.0, 1.0);
    float grid = max(l.x, l.y) * density;
    float fade = smoothstep(0.0, 0.045, depth) * smoothstep(0.7, 0.04, depth) * smoothstep(0.66, 0.12, abs(xn));
    col += mix(blue, azure, exp(-depth * 9.0)) * grid * fade * 0.42 * uReveal;

    // 床に映り込む光
    col += azure * exp(-depth * 15.0) * profile * 0.32;
    col += sky * flare * exp(-depth * 6.0) * 0.16 * profile;
  }

  // 光の線そのもの
  float core = exp(-abs(dpx) / 1.15);
  float glow = exp(-abs(d) * 28.0);
  float haze = exp(-abs(d) * 6.5);
  float intensity = profile * (0.7 + 0.65 * flare);
  col += mix(azure, vec3(1.0), 0.7) * core * intensity * 1.3;
  col += azure * glow * intensity * 0.62;
  col += blue * haze * intensity * 0.22;
  col += vec3(0.85, 0.96, 1.0) * comet * (core * 1.5 + glow * 0.7) * profile;

  // 周辺減光・トーンマップ・ディザ
  float vig = smoothstep(1.3, 0.25, length(vec2(xn * 1.05, (uv.y - 0.55) * 1.2)));
  vec3 lit = (col - base) * vig * uFade;
  lit = 1.0 - exp(-lit * 1.25);
  col = base + lit;
  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}
`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

/** 要素の上端から、祖先 stop までの距離(transform の影響を受けない) */
function offsetWithin(element: HTMLElement, stop: HTMLElement) {
  let y = 0
  let node: HTMLElement | null = element
  while (node && node !== stop) {
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return y
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)

/** ヒーロー背景の WebGL。光の線は section 内の [data-hero-horizon] の高さを通る */
export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  // WebGL のコンテキストが復帰したら、描画の準備を最初からやり直す
  const [generation, setGeneration] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false })
    if (!gl) return
    // 演出の時間軸はマウント時点から数える(シェーダーのコンパイル待ちで遅れないように)
    const start = performance.now()

    const hasDeriv = !!gl.getExtension("OES_standard_derivatives")
    const fragmentSource = (hasDeriv ? "#extension GL_OES_standard_derivatives : enable\n#define HAS_DERIV\n" : "") + FRAGMENT_SHADER
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource)
    const program = gl.createProgram()
    if (!vs || !fs || !program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    let disposed = false
    let pollFrame = 0
    let teardown = () => {}

    const setup = () => {
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
      gl.useProgram(program)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const aPos = gl.getAttribLocation(program, "aPos")
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      const uRes = gl.getUniformLocation(program, "uRes")
      const uTime = gl.getUniformLocation(program, "uTime")
      const uMouse = gl.getUniformLocation(program, "uMouse")
      const uHorizon = gl.getUniformLocation(program, "uHorizon")
      const uReveal = gl.getUniformLocation(program, "uReveal")
      const uFade = gl.getUniformLocation(program, "uFade")

      const reduced = prefersReducedMotion()
      const section = canvas.closest("section") as HTMLElement | null
      const marker = section?.querySelector<HTMLElement>("[data-hero-horizon]") ?? null
      const introDelay = introDelayMs() / 1000

      let horizon = 0.34
      const measure = () => {
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        if (!width || !height) return
        // レイアウトを読むのは描画バッファを書き換える前にまとめて行う
        if (marker && section) horizon = 1 - (offsetWithin(marker, section) + marker.offsetHeight / 2) / height
        // 描画ピクセル数に上限を設け、大画面や非力な端末でも滑らかに保つ
        let dpr = Math.min(window.devicePixelRatio || 1, width < 768 ? 1.25 : 1.5)
        const budget = 2_400_000
        if (width * height * dpr * dpr > budget) dpr = Math.sqrt(budget / (width * height))
        const pixelWidth = Math.round(width * dpr)
        const pixelHeight = Math.round(height * dpr)
        if (canvas.width === pixelWidth && canvas.height === pixelHeight) return
        canvas.width = pixelWidth
        canvas.height = pixelHeight
        gl.viewport(0, 0, pixelWidth, pixelHeight)
      }
      measure()

      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
      const handlePointer = (event: PointerEvent) => {
        mouse.tx = event.clientX / window.innerWidth
        mouse.ty = 1 - event.clientY / window.innerHeight
      }
      window.addEventListener("pointermove", handlePointer, { passive: true })

      let frame = 0
      let running = false
      let visible = true
      let lost = false

      const draw = (time: number) => {
        mouse.x += (mouse.tx - mouse.x) * 0.05
        mouse.y += (mouse.ty - mouse.y) * 0.05
        const reveal = reduced ? 1 : easeOutCubic(clamp01((time - introDelay + 0.15) / 1.8))
        const fade = reduced ? 1 : clamp01((time - introDelay + 0.35) / 1.2)
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, time)
        gl.uniform2f(uMouse, mouse.x, mouse.y)
        gl.uniform1f(uHorizon, horizon)
        gl.uniform1f(uReveal, reveal)
        gl.uniform1f(uFade, fade)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        if (!canvas.dataset.ready) canvas.dataset.ready = "true"
      }

      const loop = () => {
        if (!running) return
        draw((performance.now() - start) / 1000)
        frame = requestAnimationFrame(loop)
      }

      const play = () => {
        if (running || reduced || lost) return
        running = true
        frame = requestAnimationFrame(loop)
      }

      const pause = () => {
        running = false
        cancelAnimationFrame(frame)
      }

      const sync = () => {
        if (visible && document.visibilityState === "visible") play()
        else pause()
      }

      const resizeObserver = new ResizeObserver(() => {
        measure()
        if (reduced) draw(8)
      })
      resizeObserver.observe(canvas)

      const intersection = new IntersectionObserver((entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        sync()
      })
      intersection.observe(canvas)
      document.addEventListener("visibilitychange", sync)

      const handleLost = (event: Event) => {
        event.preventDefault()
        lost = true
        pause()
        // 描けない間は背後の CSS のにじみ(代替表示)を見せる
        delete canvas.dataset.ready
      }
      const handleRestored = () => setGeneration((value) => value + 1)
      canvas.addEventListener("webglcontextlost", handleLost)
      canvas.addEventListener("webglcontextrestored", handleRestored)

      if (reduced) draw(8)
      else play()

      teardown = () => {
        pause()
        resizeObserver.disconnect()
        intersection.disconnect()
        document.removeEventListener("visibilitychange", sync)
        window.removeEventListener("pointermove", handlePointer)
        canvas.removeEventListener("webglcontextlost", handleLost)
        canvas.removeEventListener("webglcontextrestored", handleRestored)
        gl.deleteBuffer(buffer)
      }
    }

    // 対応環境ではシェーダーのコンパイルを裏で進め、終わってから描画を始める(メインスレッドを止めない)
    const parallel = gl.getExtension("KHR_parallel_shader_compile")
    const waitForCompile = () => {
      if (disposed) return
      if (gl.getProgramParameter(program, parallel!.COMPLETION_STATUS_KHR)) setup()
      else pollFrame = requestAnimationFrame(waitForCompile)
    }
    if (parallel) waitForCompile()
    else setup()

    return () => {
      disposed = true
      cancelAnimationFrame(pollFrame)
      teardown()
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [generation])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000 data-[ready=true]:opacity-100"
    />
  )
}
