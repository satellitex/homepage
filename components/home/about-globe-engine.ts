/**
 * 会社概要の装飾用「光の地球儀」。
 * 点描の地球が東京を中心にゆっくり揺れ、東京から世界へ光の弧が走る。軌道には衛星が周回する。
 * 純粋な装飾(aria-hidden)で、テキストは一切描かない。Canvas 2D のみ・React の再レンダリングは発生しない。
 */

const TAU = Math.PI * 2
const DEG = Math.PI / 180

const SKY = "125,216,255"
const AZURE = "0,181,255"
const INDIGO = "99,102,255"

const TOKYO = { lat: 35.68, lon: 139.69 }

// 東京から光の弧を伸ばす先
const CITIES = [
  { lat: 37.77, lon: -122.42 },
  { lat: 51.5, lon: -0.12 },
  { lat: 1.35, lon: 103.82 },
  { lat: 25.2, lon: 55.27 },
  { lat: 40.71, lon: -74.0 },
  { lat: -33.87, lon: 151.21 },
]

// 大陸のおおまかな楕円: [緯度, 経度, 緯度方向の半径, 経度方向の半径]
const LAND: ReadonlyArray<readonly [number, number, number, number]> = [
  [50, -103, 22, 40],
  [20, -100, 10, 15],
  [-14, -60, 27, 16],
  [72, -42, 9, 17],
  [53, 12, 11, 26],
  [6, 20, 31, 25],
  [29, 47, 9, 14],
  [55, 90, 22, 60],
  [21, 79, 10, 8],
  [13, 105, 10, 9],
  [-3, 115, 4, 15],
  [37, 138, 7, 4.5],
  [-25, 134, 12, 21],
  [54, -3, 4, 3],
  [-42, 172, 4, 4],
]

type Vec = readonly [number, number, number]

type Cam = { cy: number; sy: number; cp: number; sp: number; cr: number; sr: number }

function unit(lat: number, lon: number): Vec {
  const phi = lat * DEG
  const lam = lon * DEG
  return [Math.cos(phi) * Math.sin(lam), Math.sin(phi), Math.cos(phi) * Math.cos(lam)]
}

function isLand(lat: number, lon: number) {
  const noise = Math.sin(lat * 0.7 + lon * 0.31) * 0.5 + Math.sin(lat * 0.31 - lon * 0.53 + 1) * 0.5
  for (const [clat, clon, rlat, rlon] of LAND) {
    let dlon = Math.abs(lon - clon)
    if (dlon > 180) dlon = 360 - dlon
    const d = ((lat - clat) / rlat) ** 2 + (dlon / rlon) ** 2
    if (d + 0.24 * noise < 1) return true
  }
  return false
}

function proj(cam: Cam, x: number, y: number, z: number, out: number[]) {
  const x1 = x * cam.cy + z * cam.sy
  const z1 = -x * cam.sy + z * cam.cy
  const y2 = y * cam.cp - z1 * cam.sp
  const z2 = y * cam.sp + z1 * cam.cp
  out[0] = x1 * cam.cr - y2 * cam.sr
  out[1] = x1 * cam.sr + y2 * cam.cr
  out[2] = z2
}

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const omega = Math.acos(dot)
  if (omega < 1e-4) return a
  const s = Math.sin(omega)
  const w1 = Math.sin((1 - t) * omega) / s
  const w2 = Math.sin(t * omega) / s
  return [a[0] * w1 + b[0] * w2, a[1] * w1 + b[1] * w2, a[2] * w1 + b[2] * w2]
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const DOT_COUNT = 1700
const ARC_STEPS = 44
const ARC_PERIOD = 7.2
const BUCKETS = 8

// 点描の球(フィボナッチ格子)
function buildDots() {
  const base = new Float32Array(DOT_COUNT * 3)
  const land = new Uint8Array(DOT_COUNT)
  for (let i = 0; i < DOT_COUNT; i++) {
    const y = 1 - ((i + 0.5) * 2) / DOT_COUNT
    const r = Math.sqrt(1 - y * y)
    const a = i * 2.399963229728653
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    base[i * 3] = x
    base[i * 3 + 1] = y
    base[i * 3 + 2] = z
    const lat = Math.asin(y) / DEG
    const lon = Math.atan2(x, z) / DEG
    land[i] = isLand(lat, lon) ? 1 : 0
  }
  return { base, land }
}

// 経緯線
function buildGraticule() {
  const lines: Vec[][] = []
  for (let lat = -60; lat <= 60; lat += 30) {
    const line: Vec[] = []
    for (let k = 0; k <= 72; k++) line.push(unit(lat, (k / 72) * 360 - 180))
    lines.push(line)
  }
  for (let lon = 0; lon < 360; lon += 30) {
    const line: Vec[] = []
    for (let k = 0; k <= 48; k++) line.push(unit(-84 + (k / 48) * 168, lon))
    lines.push(line)
  }
  return lines
}

// 東京から各都市への大円の弧(地表より少し持ち上げる)
function buildArcs() {
  const from = unit(TOKYO.lat, TOKYO.lon)
  return CITIES.map((city) => {
    const to = unit(city.lat, city.lon)
    const dot = from[0] * to[0] + from[1] * to[1] + from[2] * to[2]
    const height = 0.07 + 0.2 * (Math.acos(Math.min(1, Math.max(-1, dot))) / Math.PI)
    const pts = new Float32Array((ARC_STEPS + 1) * 3)
    for (let k = 0; k <= ARC_STEPS; k++) {
      const s = k / ARC_STEPS
      const p = slerp(from, to, s)
      const lift = 1 + height * Math.sin(Math.PI * s)
      pts[k * 3] = p[0] * lift
      pts[k * 3 + 1] = p[1] * lift
      pts[k * 3 + 2] = p[2] * lift
    }
    return { pts, to }
  })
}

// 衛星が周回する軌道(傾きの sin/cos と周回方向は定数なので先に求めておく)
const ORBITS = [
  { radius: 1.3, incl: 24 * DEG, node: 18 * DEG, speed: 0.42, phase: 0.6 },
  { radius: 1.44, incl: 56 * DEG, node: -42 * DEG, speed: -0.27, phase: 3.4 },
].map((orbit) => ({
  ...orbit,
  sinI: Math.sin(orbit.incl),
  cosI: Math.cos(orbit.incl),
  dir: Math.sign(orbit.speed),
}))

// 軌道の線を折れ線で描くときの角度ごとの cos/sin
const ORBIT_SEGMENTS = 120
const SEGMENT_COS = new Float64Array(ORBIT_SEGMENTS + 1)
const SEGMENT_SIN = new Float64Array(ORBIT_SEGMENTS + 1)
for (let k = 0; k <= ORBIT_SEGMENTS; k++) {
  const theta = (k / ORBIT_SEGMENTS) * TAU
  SEGMENT_COS[k] = Math.cos(theta)
  SEGMENT_SIN[k] = Math.sin(theta)
}

// 光の弧が最初に走り出す時刻(秒)
const ARC_START = 2.1

export type GlobeOptions = {
  /** 動きを減らす設定: 静止画として一度だけ描く */
  reduced: boolean
  /** マウスなどの精密ポインターがあるとき、視差で地球儀を傾ける */
  pointer: boolean
}

export function createGlobe(canvas: HTMLCanvasElement, options: GlobeOptions) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return null

  const { reduced } = options
  const { base, land } = buildDots()
  const graticule = buildGraticule()
  const arcs = buildArcs()
  const tokyo = unit(TOKYO.lat, TOKYO.lon)
  const tmp = [0, 0, 0]
  const tmp2 = [0, 0, 0]

  let size = 0
  let dpr = 1
  let R = 0
  let cx = 0
  let cy = 0
  // 球体の面・大気・縁のグラデーションは cx, cy, R だけで決まるので、サイズが変わったときだけ作り直す
  let sphere: { atmos: CanvasGradient; body: CanvasGradient; rim: CanvasGradient } | null = null
  // キャンバス中心のビューポート座標(リサイズ時とスクロール追従のたびに更新。pointermove はこれを使い回す)
  let centerX = 0
  let centerY = 0
  // 動きを減らす設定では time を 6 秒で止める(導入・出現の演出は 3.6 秒以内に終わる)
  let time = reduced ? 6 : 0
  let running = false
  let raf = 0
  let last = 0
  let pointerX = 0
  let pointerY = 0
  let smoothX = 0
  let smoothY = 0
  let scrollYaw = 0
  let smoothScroll = 0

  function measure() {
    const rect = canvas.getBoundingClientRect()
    centerX = rect.left + rect.width / 2
    centerY = rect.top + rect.height / 2
    return rect
  }

  function buildSphere() {
    const c = ctx!
    const atmos = c.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.26)
    atmos.addColorStop(0, `rgba(${AZURE},0.24)`)
    atmos.addColorStop(0.4, "rgba(0,110,255,0.08)")
    atmos.addColorStop(1, "rgba(0,60,255,0)")

    const body = c.createRadialGradient(cx - R * 0.38, cy - R * 0.42, R * 0.08, cx, cy, R)
    body.addColorStop(0, "rgba(40,130,255,0.22)")
    body.addColorStop(0.6, "rgba(0,70,200,0.08)")
    body.addColorStop(1, "rgba(0,25,90,0.02)")

    const rim = c.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
    rim.addColorStop(0, `rgba(${SKY},0.6)`)
    rim.addColorStop(0.55, `rgba(${AZURE},0.2)`)
    rim.addColorStop(1, `rgba(${INDIGO},0.28)`)
    return { atmos, body, rim }
  }

  function resize() {
    const rect = measure()
    const nextDpr = Math.min(window.devicePixelRatio || 1, 2)
    const nextSize = Math.max(1, Math.round(rect.width * nextDpr))
    // ResizeObserver は監視開始時にも一度呼ばれる。ピクセル寸法が同じなら確保し直さない
    if (nextSize === size && nextDpr === dpr) return
    dpr = nextDpr
    size = nextSize
    canvas.width = size
    canvas.height = size
    R = size * 0.33
    cx = size / 2
    cy = size / 2
    sphere = buildSphere()
    // 動いている間は次の tick が描く。静止中(動きを減らす設定・画面外)だけここで描き直す
    if (!running) draw()
  }

  function updateScroll() {
    measure()
    const vh = window.innerHeight || 1
    scrollYaw = Math.max(-0.6, Math.min(0.6, (0.5 - centerY / vh) * 0.75))
  }

  function draw() {
    if (!sphere) return
    const c = ctx!
    c.clearRect(0, 0, size, size)

    // 導入の回転: 高速に回りながら東京へ減速して収まる
    const intro = clamp01(time / 3.6)
    const eased = 1 - (1 - intro) ** 4
    const sway = reduced ? 0 : Math.sin(time * 0.16) * 0.5
    const yaw = TOKYO.lon * DEG + sway + smoothScroll + smoothX * 0.2 + (1 - eased) * 4.4
    const pitch = 0.42 + (1 - eased) * 0.55 + smoothY * 0.1
    const roll = -0.22
    const cam: Cam = {
      cy: Math.cos(-yaw),
      sy: Math.sin(-yaw),
      cp: Math.cos(pitch),
      sp: Math.sin(pitch),
      cr: Math.cos(roll),
      sr: Math.sin(roll),
    }

    // 大気の光と球体の面
    c.globalCompositeOperation = "source-over"
    c.fillStyle = sphere.atmos
    c.beginPath()
    c.arc(cx, cy, R * 1.26, 0, TAU)
    c.fill()

    c.fillStyle = sphere.body
    c.beginPath()
    c.arc(cx, cy, R, 0, TAU)
    c.fill()

    c.strokeStyle = sphere.rim
    c.lineWidth = 1.2 * dpr
    c.beginPath()
    c.arc(cx, cy, R, 0, TAU)
    c.stroke()

    c.globalCompositeOperation = "lighter"

    // 奥側の軌道
    drawOrbits(c, false)

    // 経緯線(手前側のみ)
    c.strokeStyle = `rgba(${SKY},0.075)`
    c.lineWidth = 0.8 * dpr
    c.beginPath()
    for (const line of graticule) {
      let drawing = false
      for (const p of line) {
        proj(cam, p[0], p[1], p[2], tmp)
        if (tmp[2] > 0) {
          const px = cx + tmp[0] * R
          const py = cy - tmp[1] * R
          if (drawing) c.lineTo(px, py)
          else c.moveTo(px, py)
          drawing = true
        } else {
          drawing = false
        }
      }
    }
    c.stroke()

    // 点描の球
    // 面を斜めに走る光の帯
    const sweep = reduced ? -1 : ((time * 0.24) % 2.2) - 0.5
    const landPaths: Path2D[] = []
    const seaPaths: Path2D[] = []
    for (let b = 0; b < BUCKETS; b++) {
      landPaths.push(new Path2D())
      seaPaths.push(new Path2D())
    }
    for (let i = 0; i < DOT_COUNT; i++) {
      proj(cam, base[i * 3], base[i * 3 + 1], base[i * 3 + 2], tmp)
      const z = tmp[2]
      const isLandDot = land[i] === 1
      let alpha: number
      let radius: number
      if (z > 0) {
        alpha = (isLandDot ? 0.95 : 0.26) * (0.28 + 0.72 * z)
        radius = (isLandDot ? 1.45 : 0.9) * dpr * (0.55 + 0.45 * z)
      } else {
        alpha = isLandDot ? 0.11 : 0
        radius = 0.9 * dpr
      }
      if (z > 0 && sweep > -0.9) {
        const u = (tmp[0] * 0.8 + tmp[1] * 0.6 + 1) / 2
        const band = Math.exp(-(((u - sweep) / 0.08) ** 2))
        alpha = Math.min(1, alpha * (1 + 1.8 * band))
        radius *= 1 + 0.35 * band
      }
      if (alpha <= 0.02) continue
      const bucket = Math.min(BUCKETS - 1, Math.floor(alpha * BUCKETS))
      const path = (isLandDot ? landPaths : seaPaths)[bucket]
      const px = cx + tmp[0] * R
      const py = cy - tmp[1] * R
      path.moveTo(px + radius, py)
      path.arc(px, py, radius, 0, TAU)
    }
    for (let b = 0; b < BUCKETS; b++) {
      const a = (b + 0.5) / BUCKETS
      c.fillStyle = `rgba(${SKY},${a.toFixed(3)})`
      c.fill(landPaths[b])
      c.fillStyle = `rgba(${AZURE},${(a * 0.9).toFixed(3)})`
      c.fill(seaPaths[b])
    }

    // 東京から世界へ走る光の弧
    for (let j = 0; j < arcs.length; j++) {
      const arc = arcs[j]
      let head = 1
      let tail = 0
      let fade = 0.55
      let ping = 0
      if (!reduced) {
        const t = time - ARC_START - j * 1.15
        if (t < 0) continue
        const u = (t % ARC_PERIOD) / ARC_PERIOD
        if (u < 0.34) {
          head = easeInOut(u / 0.34)
        } else if (u < 0.66) {
          tail = easeInOut((u - 0.34) / 0.32)
        } else {
          head = 0
        }
        if (u >= 0.34 && u < 0.6) ping = (u - 0.34) / 0.26
        fade = 1
        if (head <= 0.001 || tail >= 0.999) continue
      }
      drawArc(c, cam, arc.pts, head, tail, fade)
      // 到着点の光
      proj(cam, arc.to[0], arc.to[1], arc.to[2], tmp)
      if (tmp[2] > 0.02) {
        const px = cx + tmp[0] * R
        const py = cy - tmp[1] * R
        c.fillStyle = `rgba(${SKY},${reduced ? 0.7 : 0.35 + 0.5 * (head >= 1 ? 1 - tail : 0)})`
        c.beginPath()
        c.arc(px, py, 2.1 * dpr, 0, TAU)
        c.fill()
        if (ping > 0) {
          c.strokeStyle = `rgba(${SKY},${((1 - ping) * 0.7).toFixed(3)})`
          c.lineWidth = 1.2 * dpr
          c.beginPath()
          c.arc(px, py, (3 + ping * 16) * dpr, 0, TAU)
          c.stroke()
        }
      }
    }

    drawTokyo(c, cam)

    // 手前側の軌道と衛星
    drawOrbits(c, true)

    c.globalCompositeOperation = "source-over"
  }

  function drawArc(c: CanvasRenderingContext2D, cam: Cam, pts: Float32Array, head: number, tail: number, fade: number) {
    const from = Math.floor(tail * ARC_STEPS)
    const to = Math.min(ARC_STEPS, Math.ceil(head * ARC_STEPS))
    let prevX = 0
    let prevY = 0
    let prevVisible = false
    let headX = 0
    let headY = 0
    let headVisible = false
    c.lineCap = "round"
    for (let k = from; k <= to; k++) {
      proj(cam, pts[k * 3], pts[k * 3 + 1], pts[k * 3 + 2], tmp2)
      const visible = tmp2[2] > 0 || tmp2[0] * tmp2[0] + tmp2[1] * tmp2[1] > 1
      const px = cx + tmp2[0] * R
      const py = cy - tmp2[1] * R
      if (k > from && visible && prevVisible) {
        const s = k / ARC_STEPS
        const span = Math.max(0.0001, head - tail)
        const w = clamp01((s - tail) / span)
        const alpha = (0.08 + 0.85 * w * w) * fade
        c.strokeStyle = `rgba(${SKY},${alpha.toFixed(3)})`
        c.lineWidth = (0.9 + 1.1 * w) * dpr
        c.beginPath()
        c.moveTo(prevX, prevY)
        c.lineTo(px, py)
        c.stroke()
      }
      prevX = px
      prevY = py
      prevVisible = visible
      if (k === to) {
        headX = px
        headY = py
        headVisible = visible
      }
    }
    // 弧の先端の光
    if (headVisible && head < 0.999 && head > 0.001) {
      const g = c.createRadialGradient(headX, headY, 0, headX, headY, 12 * dpr)
      g.addColorStop(0, "rgba(255,255,255,0.95)")
      g.addColorStop(0.25, `rgba(${SKY},0.6)`)
      g.addColorStop(1, `rgba(${AZURE},0)`)
      c.fillStyle = g
      c.beginPath()
      c.arc(headX, headY, 12 * dpr, 0, TAU)
      c.fill()
    }
  }

  function drawTokyo(c: CanvasRenderingContext2D, cam: Cam) {
    proj(cam, tokyo[0], tokyo[1], tokyo[2], tmp)
    if (tmp[2] < 0.03) return
    const appear = clamp01((time - 1.7) / 1.1)
    if (appear <= 0) return
    const px = cx + tmp[0] * R
    const py = cy - tmp[1] * R

    // 地表から立ち上がる光の柱
    const reach = 1.36
    proj(cam, tokyo[0] * reach, tokyo[1] * reach, tokyo[2] * reach, tmp2)
    const ex = px + (cx + tmp2[0] * R - px) * appear
    const ey = py + (cy - tmp2[1] * R - py) * appear
    const beam = c.createLinearGradient(px, py, ex, ey)
    beam.addColorStop(0, "rgba(255,255,255,0.95)")
    beam.addColorStop(0.45, `rgba(${SKY},0.5)`)
    beam.addColorStop(1, `rgba(${AZURE},0)`)
    c.lineCap = "round"
    c.strokeStyle = beam
    c.lineWidth = 6 * dpr
    c.globalAlpha = 0.18
    c.beginPath()
    c.moveTo(px, py)
    c.lineTo(ex, ey)
    c.stroke()
    c.globalAlpha = 1
    c.lineWidth = 1.6 * dpr
    c.beginPath()
    c.moveTo(px, py)
    c.lineTo(ex, ey)
    c.stroke()

    // 拡がる波紋
    for (let n = 0; n < 2; n++) {
      const ph = reduced ? 0.35 + n * 0.4 : (time * 0.55 + n * 0.5) % 1
      c.strokeStyle = `rgba(${SKY},${((1 - ph) ** 1.6 * 0.75 * appear).toFixed(3)})`
      c.lineWidth = 1.3 * dpr
      c.beginPath()
      c.ellipse(px, py, (4 + ph * 30) * dpr, (4 + ph * 30) * dpr * (0.45 + 0.55 * tmp[2]), 0, 0, TAU)
      c.stroke()
    }

    // 核
    const halo = c.createRadialGradient(px, py, 0, px, py, 16 * dpr)
    halo.addColorStop(0, "rgba(255,255,255,0.9)")
    halo.addColorStop(0.2, `rgba(${SKY},0.55)`)
    halo.addColorStop(1, `rgba(${AZURE},0)`)
    c.fillStyle = halo
    c.beginPath()
    c.arc(px, py, 16 * dpr, 0, TAU)
    c.fill()
    c.fillStyle = "#fff"
    c.beginPath()
    c.arc(px, py, 2.7 * dpr, 0, TAU)
    c.fill()
  }

  // 軌道上の点(画面座標系)。cn/sn は昇交点の回転(cos/sin)で、軌道ごとにフレームあたり一度だけ求める
  function orbitPoint(
    orbit: (typeof ORBITS)[number],
    cosT: number,
    sinT: number,
    cn: number,
    sn: number,
    out: number[],
  ) {
    const x0 = orbit.radius * cosT
    const z0 = orbit.radius * sinT
    const y1 = -z0 * orbit.sinI
    const z1 = z0 * orbit.cosI
    out[0] = x0 * cn - y1 * sn
    out[1] = x0 * sn + y1 * cn
    out[2] = z1
  }

  function hiddenBehindGlobe(x: number, y: number, z: number) {
    return z < 0 && x * x + y * y < 1
  }

  function drawOrbits(c: CanvasRenderingContext2D, front: boolean) {
    const appear = clamp01((time - 0.4) / 1.4)
    if (appear <= 0) return
    c.lineCap = "round"
    for (let o = 0; o < ORBITS.length; o++) {
      const orbit = ORBITS[o]
      const node = orbit.node + (reduced ? 0 : time * 0.02 * orbit.dir)
      const cn = Math.cos(node)
      const sn = Math.sin(node)
      // 軌道の線
      c.strokeStyle = `rgba(${SKY},${(front ? 0.42 : 0.15) * appear})`
      c.lineWidth = (front ? 0.9 : 0.7) * dpr
      c.beginPath()
      let drawing = false
      for (let k = 0; k <= ORBIT_SEGMENTS; k++) {
        orbitPoint(orbit, SEGMENT_COS[k], SEGMENT_SIN[k], cn, sn, tmp)
        const isFront = tmp[2] >= 0
        if (isFront === front) {
          const px = cx + tmp[0] * R
          const py = cy - tmp[1] * R
          if (drawing) c.lineTo(px, py)
          else c.moveTo(px, py)
          drawing = true
        } else {
          drawing = false
        }
      }
      c.stroke()

      // 衛星と尾
      const theta = orbit.phase + (reduced ? 0 : time * orbit.speed)
      for (let k = 22; k >= 0; k--) {
        const a = theta - orbit.dir * k * 0.045
        orbitPoint(orbit, Math.cos(a), Math.sin(a), cn, sn, tmp)
        const isFront = tmp[2] >= 0
        if (isFront !== front) continue
        if (hiddenBehindGlobe(tmp[0], tmp[1], tmp[2])) continue
        const px = cx + tmp[0] * R
        const py = cy - tmp[1] * R
        if (k === 0) {
          const g = c.createRadialGradient(px, py, 0, px, py, 11 * dpr)
          g.addColorStop(0, "rgba(255,255,255,1)")
          g.addColorStop(0.3, `rgba(${SKY},0.6)`)
          g.addColorStop(1, `rgba(${AZURE},0)`)
          c.fillStyle = g
          c.globalAlpha = appear
          c.beginPath()
          c.arc(px, py, 11 * dpr, 0, TAU)
          c.fill()
          c.globalAlpha = 1
        } else {
          const w = 1 - k / 23
          c.fillStyle = `rgba(${SKY},${(w * w * 0.5 * appear).toFixed(3)})`
          c.beginPath()
          c.arc(px, py, (0.6 + 1.1 * w) * dpr, 0, TAU)
          c.fill()
        }
      }
    }
  }

  function tick(now: number) {
    if (!running) return
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    time += dt
    // ポインターとスクロールへの追従をなめらかにする
    smoothX += (pointerX - smoothX) * 0.06
    smoothY += (pointerY - smoothY) * 0.06
    updateScroll()
    smoothScroll += (scrollYaw - smoothScroll) * 0.08
    draw()
    raf = requestAnimationFrame(tick)
  }

  // 中心座標は resize と tick(updateScroll)で更新済みのものを使い、イベントごとにレイアウトを読まない
  function onPointerMove(event: PointerEvent) {
    pointerX = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth / 2)))
    pointerY = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight / 2)))
  }

  // 監視開始時に必ず一度呼ばれるので、初回の寸法決定と描画もここで済む
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)

  // 動きを減らす設定では resize が描いた静止画のままで、ループもポインター追従も持たない
  let intersection: IntersectionObserver | null = null
  if (!reduced) {
    // 画面内にいる間だけ回し、ポインターの追従も画面内にいる間だけ付ける
    intersection = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting)
        if (visible && !running) {
          running = true
          last = performance.now()
          raf = requestAnimationFrame(tick)
          if (options.pointer) window.addEventListener("pointermove", onPointerMove, { passive: true })
        } else if (!visible && running) {
          running = false
          cancelAnimationFrame(raf)
          window.removeEventListener("pointermove", onPointerMove)
        }
      },
      { threshold: 0.05 },
    )
    intersection.observe(canvas)
  }

  return () => {
    running = false
    cancelAnimationFrame(raf)
    resizeObserver.disconnect()
    intersection?.disconnect()
    window.removeEventListener("pointermove", onPointerMove)
  }
}
