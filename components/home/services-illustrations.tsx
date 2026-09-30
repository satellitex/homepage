import { cn, cssVars } from "@/lib/utils"
import styles from "./services.module.css"

/*
 * 事業内容カードの挿絵(すべて装飾。親の ServicesStage が aria-hidden を付ける)。
 * 動きはすべて services.module.css 側で、舞台に .is-in が付いてから始まる。
 * JS が無い環境・動きを減らす設定では、ここに書いた形そのもの(完成図)が静止画として表示される。
 */

const ms = (value: number) => `${value}ms`
const r1 = (value: number) => Math.round(value * 10) / 10

const SKY = "#7dd8ff"
const AZURE = "#00b5ff"
const INDIGO = "#8b8dff"

/* ───────────────── 01 IT CONSULTING ─────────────────
   散らばった点(課題)が曲線で一点に集まり、一本の光の線になって右へ抜ける */

const C = { x: 318, y: 128 }

const chaosNodes = [
  { x: 46, y: 46, r: 2.6, o: 0 },
  { x: 108, y: 92, r: 3.4, ring: true, o: 180 },
  { x: 30, y: 152, r: 2.2, o: 90 },
  { x: 158, y: 30, r: 2.2, o: 260 },
  { x: 88, y: 210, r: 3, ring: true, o: 40 },
  { x: 186, y: 182, r: 2.6, o: 320 },
  { x: 218, y: 70, r: 2.2, o: 140 },
  { x: 142, y: 140, r: 2.8, o: 220 },
  { x: 246, y: 220, r: 2, o: 60 },
]

const chaosDust = [
  { x: 66, y: 112 },
  { x: 200, y: 124 },
  { x: 264, y: 36 },
  { x: 16, y: 92 },
  { x: 128, y: 238 },
  { x: 272, y: 168 },
  { x: 122, y: 60 },
  { x: 54, y: 246 },
  { x: 236, y: 146 },
]

const chaosMesh: [number, number][] = [
  [0, 1],
  [1, 7],
  [2, 1],
  [3, 6],
  [4, 5],
  [5, 7],
  [2, 4],
  [3, 1],
  [8, 5],
  [6, 7],
  [0, 3],
]

const convergePath = (node: { x: number; y: number }) => {
  const span = C.x - node.x
  return `M${node.x} ${node.y}C${r1(node.x + span * 0.45)} ${node.y} ${r1(node.x + span * 0.55)} ${C.y} ${C.x} ${C.y}`
}

const beamTicks = Array.from({ length: 15 }, (_, i) => 358 + i * 28)
const milestones = [430, 560, 690]

export function ConsultingArt() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 760 256"
      preserveAspectRatio="xMinYMid slice"
      fill="none"
      focusable="false"
    >
      <defs>
        <linearGradient id="svc-c-path" gradientUnits="userSpaceOnUse" x1="20" y1="0" x2={C.x} y2="0">
          <stop offset="0" stopColor={SKY} stopOpacity="0.06" />
          <stop offset="0.6" stopColor={SKY} stopOpacity="0.28" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="svc-c-beam" gradientUnits="userSpaceOnUse" x1={C.x} y1="0" x2="760" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.22" stopColor={SKY} />
          <stop offset="0.65" stopColor="#2f7bff" />
          <stop offset="1" stopColor="#6366ff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="svc-c-halo" gradientUnits="userSpaceOnUse" x1={C.x} y1="0" x2="760" y2="0">
          <stop offset="0" stopColor={AZURE} stopOpacity="0.55" />
          <stop offset="1" stopColor="#6366ff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="svc-c-gate" gradientUnits="userSpaceOnUse" x1="0" y1="24" x2="0" y2="232">
          <stop offset="0" stopColor={AZURE} stopOpacity="0" />
          <stop offset="0.5" stopColor={AZURE} stopOpacity="0.35" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="svc-c-core">
          <stop offset="0" stopColor={SKY} stopOpacity="0.95" />
          <stop offset="0.3" stopColor={AZURE} stopOpacity="0.4" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-c-node">
          <stop offset="0" stopColor={SKY} stopOpacity="0.55" />
          <stop offset="1" stopColor={SKY} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-c-horizon">
          <stop offset="0" stopColor="#0057d9" stopOpacity="0.32" />
          <stop offset="1" stopColor="#0057d9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 地平のにじみ */}
      <ellipse cx="560" cy={C.y} rx="300" ry="44" fill="url(#svc-c-horizon)" />

      {/* 絡まった関係(混沌) */}
      <g className={styles.cMesh}>
        {chaosMesh.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={chaosNodes[a].x}
            y1={chaosNodes[a].y}
            x2={chaosNodes[b].x}
            y2={chaosNodes[b].y}
            stroke="rgba(160,190,240,0.16)"
            strokeDasharray="2 5"
          />
        ))}
      </g>

      {/* 一点へ集まる曲線 */}
      {chaosNodes.map((node, i) => (
        <path
          key={`p${i}`}
          className={styles.cPath}
          d={convergePath(node)}
          pathLength={100}
          stroke="url(#svc-c-path)"
          strokeWidth="1"
          style={cssVars({ "--d": ms(i * 70) })}
        />
      ))}

      {/* 曲線を流れる光(ホバー時は倍の頻度で流れる) */}
      {chaosNodes.map((node, i) => (
        <g key={`q${i}`} style={cssVars({ "--d": ms(node.o) })}>
          <path className={styles.cPulseHalo} d={convergePath(node)} pathLength={100} stroke={AZURE} strokeWidth="4" strokeLinecap="round" />
          <path className={styles.cPulse} d={convergePath(node)} pathLength={100} stroke="#eaf8ff" strokeWidth="1.4" strokeLinecap="round" />
          <path
            className={cn(styles.cPulse, styles.cPulseAlt)}
            d={convergePath(node)}
            pathLength={100}
            stroke="#eaf8ff"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* 点 */}
      {chaosDust.map((dot, i) => (
        <circle
          key={`d${i}`}
          className={cn(styles.cNode, styles.cTwinkle)}
          cx={dot.x}
          cy={dot.y}
          r="1.2"
          fill="rgba(160,190,240,0.55)"
          style={cssVars({ "--d": ms(200 + i * 40), "--t": ms(i * 420) })}
        />
      ))}
      {chaosNodes.map((node, i) => (
        <g key={`n${i}`} className={styles.cNode} style={cssVars({ "--d": ms(i * 55) })}>
          <circle cx={node.x} cy={node.y} r={node.r * 4} fill="url(#svc-c-node)" />
          {node.ring ? <circle cx={node.x} cy={node.y} r={node.r + 4.5} stroke="rgba(125,216,255,0.35)" /> : null}
          <circle
            className={styles.cTwinkle}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#dff4ff"
            style={cssVars({ "--t": ms(i * 380) })}
          />
        </g>
      ))}

      {/* 収束点の縦の光 */}
      <line className={styles.cGate} x1={C.x} y1="24" x2={C.x} y2="232" stroke="url(#svc-c-gate)" />

      {/* 一本の線 */}
      <g className={styles.cBeam}>
        <path d={`M${C.x} ${C.y}H760`} stroke="url(#svc-c-halo)" strokeWidth="10" strokeLinecap="round" opacity="0.4" />
        <path d={`M${C.x} ${C.y}H760`} stroke="url(#svc-c-beam)" strokeWidth="3" opacity="0.45" />
        <path d={`M${C.x} ${C.y}H760`} stroke="url(#svc-c-beam)" strokeWidth="1.25" />
        {beamTicks.map((x, i) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1={i % 4 === 0 ? C.y - 9 : C.y - 4}
            y2={i % 4 === 0 ? C.y + 9 : C.y + 4}
            stroke="rgba(160,190,240,0.22)"
          />
        ))}
        {milestones.map((x, i) => (
          <g key={x}>
            <circle
              className={styles.cMilestoneFlash}
              cx={x}
              cy={C.y}
              r="9"
              fill="url(#svc-c-core)"
              style={cssVars({ "--d": ms([306, 649, 992][i]) })}
            />
            <circle cx={x} cy={C.y} r="3.2" fill="#05070c" stroke={SKY} strokeWidth="1.1" />
          </g>
        ))}
      </g>

      {/* 線を走る光 */}
      <path className={styles.cBeamPulseHalo} d={`M${C.x} ${C.y}H760`} pathLength={100} stroke={AZURE} strokeWidth="6" strokeLinecap="round" />
      <path className={styles.cBeamPulse} d={`M${C.x} ${C.y}H760`} pathLength={100} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      {/* 描かれるときのペン先 */}
      <g className={styles.cTip}>
        <g className={styles.cTipFade}>
          <circle cx={C.x} cy={C.y} r="16" fill="url(#svc-c-core)" />
          <circle cx={C.x} cy={C.y} r="2.6" fill="#ffffff" />
        </g>
      </g>

      {/* 収束点 */}
      <g className={styles.cCore}>
        <circle cx={C.x} cy={C.y} r="30" fill="url(#svc-c-core)" />
        <circle cx={C.x} cy={C.y} r="7" stroke="rgba(125,216,255,0.5)" />
        <circle cx={C.x} cy={C.y} r="3.2" fill="#ffffff" />
      </g>
    </svg>
  )
}

/* ───────────────── 02 BLOCKCHAIN / WEB3 ─────────────────
   ブロックの鎖。承認の波がブロックを順に灯し、新しいブロックが末尾に積まれて鎖が1つ分送られる */

const BLOCK = { x0: 43, pitch: 54, size: 44, y: 100 }
const LEDGER_Y = BLOCK.y + BLOCK.size / 2
/** 床(映り込みの軸) */
const FLOOR_Y = BLOCK.y + BLOCK.size + 6
const NEWEST = 5
const blockX = (k: number) => BLOCK.x0 + k * BLOCK.pitch
const hashLevels = [0.16, 0.3, 0.48, 0.7, 0.95]

function BlockBody({ k }: { k: number }) {
  const x = blockX(k)
  const { y, size } = BLOCK
  const pending = k === NEWEST
  const cx = x + size / 2
  return (
    <>
      {/* ひとつ前のブロックへのハッシュの参照 */}
      <path
        d={`M${cx} ${y - 3}C${cx} ${y - 24} ${cx - BLOCK.pitch} ${y - 24} ${cx - BLOCK.pitch} ${y - 3}`}
        stroke="rgba(125,216,255,0.3)"
        strokeDasharray="2 3"
      />
      <circle cx={cx - BLOCK.pitch} cy={y - 3} r="1.4" fill={SKY} opacity="0.7" />
      <rect x={x} y={y} width={size} height={size} rx="9" fill="url(#svc-b-fill)" stroke="rgba(160,190,240,0.26)" />
      <path d={`M${x + 10} ${y + 0.5}H${x + size - 10}`} stroke="rgba(255,255,255,0.28)" />
      <g className={pending ? styles.bHashNew : undefined}>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3, 4, 5].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={x + 9.5 + col * 5}
              cy={y + 15 + row * 7}
              r="1.2"
              fill={row === 1 ? SKY : "#cfe0ff"}
              opacity={hashLevels[(k * 7 + row * 11 + col * 5 + k * row * col) % 5]}
            />
          )),
        )}
      </g>
      <circle cx={x} cy={LEDGER_Y} r="2" fill={SKY} />
      <circle cx={x + size} cy={LEDGER_Y} r="2" fill={SKY} />
      <rect
        className={styles.bFlash}
        x={x}
        y={y}
        width={size}
        height={size}
        rx="9"
        fill="rgba(0,181,255,0.18)"
        stroke={AZURE}
        strokeWidth="1.2"
        style={cssVars({ "--d": ms(k * 300) })}
      />
      {pending ? (
        <rect
          className={styles.bPending}
          x={x - 0.5}
          y={y - 0.5}
          width={size + 1}
          height={size + 1}
          rx="9.5"
          stroke={SKY}
          strokeDasharray="3 3"
        />
      ) : null}
    </>
  )
}

/** ブロックの列(ループで1つ分左へ送られる)。映り込みにも同じものを使う */
function ChainRow() {
  return (
    <g className={styles.bChain}>
      {Array.from({ length: NEWEST + 1 }, (_, k) => (
        <g key={k} className={cn(k === 0 && styles.bFirst, k === NEWEST && styles.bNew)}>
          <g className={styles.bEnter} style={cssVars({ "--d": ms(k * 90) })}>
            <BlockBody k={k} />
          </g>
        </g>
      ))}
    </g>
  )
}

export function ChainArt() {
  return (
    <svg className={styles.art} viewBox="0 0 400 256" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
      <defs>
        <linearGradient id="svc-b-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0" stopColor={SKY} stopOpacity="0" />
          <stop offset="0.2" stopColor={SKY} stopOpacity="0.55" />
          <stop offset="0.8" stopColor="#6366ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#6366ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="svc-b-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16233d" />
          <stop offset="1" stopColor="#0a0f1c" />
        </linearGradient>
        <linearGradient id="svc-b-floor" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="400" y2="0">
          <stop offset="0" stopColor="#a0bef0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a0bef0" stopOpacity="0.3" />
          <stop offset="1" stopColor="#a0bef0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="svc-b-reflect-g" gradientUnits="userSpaceOnUse" x1="0" y1={FLOOR_Y} x2="0" y2={FLOOR_Y + 48}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <mask id="svc-b-reflect" maskUnits="userSpaceOnUse" x="0" y={FLOOR_Y} width="400" height="60">
          <rect x="0" y={FLOOR_Y} width="400" height="60" fill="url(#svc-b-reflect-g)" />
        </mask>
        <radialGradient id="svc-b-glow">
          <stop offset="0" stopColor="#0057d9" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0057d9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-b-wave">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor={AZURE} stopOpacity="0.7" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy={LEDGER_Y + 10} rx="200" ry="80" fill="url(#svc-b-glow)" />

      {/* 床と映り込み */}
      <path className={styles.bFloor} d={`M0 ${FLOOR_Y}H400`} stroke="url(#svc-b-floor)" />
      <g mask="url(#svc-b-reflect)">
        <g transform={`translate(0 ${FLOOR_Y * 2}) scale(1 -1)`}>
          <ChainRow />
        </g>
      </g>

      {/* 台帳の線(鎖の背骨) */}
      <path className={styles.bLine} d={`M0 ${LEDGER_Y}H400`} pathLength={100} stroke="url(#svc-b-line)" strokeWidth="6" opacity="0.22" />
      <path className={styles.bLine} d={`M0 ${LEDGER_Y}H400`} pathLength={100} stroke="url(#svc-b-line)" />

      <ChainRow />

      {/* 承認の波 */}
      <g className={styles.bWave}>
        <ellipse cx="0" cy={LEDGER_Y} rx="20" ry="3.2" fill="url(#svc-b-wave)" />
        <circle cx="0" cy={LEDGER_Y} r="1.7" fill="#ffffff" />
      </g>

      {/* 新しいブロックの確定の波紋 */}
      <rect
        className={styles.bPing}
        x={blockX(NEWEST)}
        y={BLOCK.y}
        width={BLOCK.size}
        height={BLOCK.size}
        rx="9"
        stroke={AZURE}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/* ───────────────── 03 FORWARD DEPLOYED ENGINEERING ─────────────────
   エディタにコードが1行ずつ打ち込まれ、デプロイの光が現場(ターゲット)へ届いて波紋が広がる */

const WIN = { x: 56, y: 34, w: 220, h: 176 }
const TARGET = { x: 334, y: 128 }

type CodeSegment = [width: number, color: string]
const DIM = "rgba(139,151,171,0.5)"
const TEXT = "rgba(234,240,248,0.72)"

/** services.module.css の打鍵アニメーション(fType0〜5 / fCaret)はこの座標から生成している */
const codeLines: { x: number; y: number; segments: CodeSegment[] }[] = [
  { x: 88, y: 86, segments: [[14, INDIGO], [30, SKY], [18, DIM]] },
  { x: 100, y: 102, segments: [[22, TEXT], [12, AZURE], [36, "rgba(125,216,255,0.6)"]] },
  { x: 112, y: 118, segments: [[30, INDIGO], [44, DIM]] },
  { x: 112, y: 134, segments: [[18, SKY], [26, TEXT], [14, AZURE]] },
  { x: 100, y: 150, segments: [[40, DIM], [16, INDIGO]] },
  { x: 88, y: 166, segments: [[10, DIM]] },
]

const lineTypeClass = [styles.fType0, styles.fType1, styles.fType2, styles.fType3, styles.fType4, styles.fType5]

const minimap = [8, 6, 10, 4, 9, 7, 5, 10, 6, 8, 4, 7, 9, 5]

export function DeployArt() {
  const last = codeLines[codeLines.length - 1]
  const lastEnd = last.x + last.segments.reduce((sum, [w]) => sum + w + 5, -5) + 2
  const route = `M264 196H290C316 196 ${TARGET.x} 182 ${TARGET.x} 147`

  return (
    <svg className={styles.art} viewBox="0 0 400 256" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
      <defs>
        <linearGradient id="svc-f-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#111a2e" />
          <stop offset="1" stopColor="#090d18" />
        </linearGradient>
        <linearGradient id="svc-f-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#a0bef0" stopOpacity="0.14" />
          <stop offset="1" stopColor="#6366ff" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="svc-f-beacon" gradientUnits="userSpaceOnUse" x1="0" y1="10" x2="0" y2={TARGET.y}>
          <stop offset="0" stopColor={AZURE} stopOpacity="0" />
          <stop offset="1" stopColor={SKY} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="svc-f-glow">
          <stop offset="0" stopColor={SKY} stopOpacity="0.7" />
          <stop offset="0.4" stopColor={AZURE} stopOpacity="0.25" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-f-bg">
          <stop offset="0" stopColor="#0057d9" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0057d9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="220" cy="140" rx="200" ry="110" fill="url(#svc-f-bg)" />

      {/* 現場へのルート */}
      <path className={styles.fRoute} d={route} pathLength={100} stroke="rgba(125,216,255,0.35)" strokeDasharray="1.5 4" strokeLinecap="round" />

      {/* エディタのウィンドウ */}
      <g className={styles.fWin}>
        <rect x={WIN.x} y={WIN.y} width={WIN.w} height={WIN.h} rx="12" fill="url(#svc-f-win)" />
        <rect x={WIN.x + 0.5} y={WIN.y + 0.5} width={WIN.w - 1} height={WIN.h - 1} rx="11.5" stroke="url(#svc-f-edge)" />
        {[72, 84, 96].map((x, i) => (
          <circle key={x} cx={x} cy="50" r="3" fill={["rgba(234,240,248,0.28)", "rgba(234,240,248,0.18)", "rgba(125,216,255,0.55)"][i]} />
        ))}
        <rect x="136" y="48" width="60" height="4" rx="2" fill="rgba(160,190,240,0.16)" />
        <path d={`M${WIN.x} 64H${WIN.x + WIN.w}`} stroke="rgba(160,190,240,0.12)" />

        {/* 行番号とミニマップ */}
        {codeLines.map((line) => (
          <rect key={line.y} x="70" y={line.y - 1.5} width="8" height="3" rx="1.5" fill="rgba(139,151,171,0.28)" />
        ))}
        {minimap.map((w, j) => (
          <rect key={j} x="256" y={76 + j * 6} width={w} height="2" rx="1" fill="rgba(160,190,240,0.18)" />
        ))}

        {/* コード(1行ずつ打ち込まれる) */}
        <g className={styles.fCode}>
          <rect className={styles.fActive} x={WIN.x + 1} y="-7" width={WIN.w - 2} height="14" fill="rgba(125,216,255,0.055)" transform={`translate(0 ${last.y})`} />
          {codeLines.map((line, i) => {
            let cursor = line.x
            return (
              <g key={line.y} className={cn(styles.fLine, lineTypeClass[i])}>
                {line.segments.map(([width, color], s) => {
                  const x = cursor
                  cursor += width + 5
                  return <rect key={s} x={x} y={line.y - 2.5} width={width} height="5" rx="2.5" fill={color} />
                })}
              </g>
            )
          })}
          <g className={styles.fCaret} transform={`translate(${lastEnd} ${last.y})`}>
            <rect className={styles.fBlink} x="0" y="-5.5" width="1.6" height="11" rx="0.8" fill={SKY} />
          </g>
        </g>

        {/* ステータスバーとデプロイボタン */}
        <path d={`M${WIN.x} 182H${WIN.x + WIN.w}`} stroke="rgba(160,190,240,0.1)" />
        <circle cx="72" cy="196" r="2.3" fill="rgba(139,151,171,0.5)" />
        <circle className={styles.fLive} cx="72" cy="196" r="2.3" fill={AZURE} />
        <rect x="80" y="194.5" width="36" height="3" rx="1.5" fill="rgba(139,151,171,0.3)" />
        <rect x="122" y="194.5" width="20" height="3" rx="1.5" fill="rgba(139,151,171,0.2)" />
        <rect x="214" y="189" width="50" height="14" rx="7" fill="rgba(0,181,255,0.08)" stroke="rgba(125,216,255,0.4)" />
        <rect className={styles.fPill} x="214" y="189" width="50" height="14" rx="7" fill="rgba(0,181,255,0.35)" stroke={SKY} />
        <path d="M224 192.5L229.5 196L224 199.5Z" fill={SKY} />
        <rect x="234" y="194.5" width="22" height="3" rx="1.5" fill="rgba(125,216,255,0.6)" />
      </g>

      {/* デプロイの光 */}
      <path className={styles.fPulseHalo} d={route} pathLength={100} stroke={AZURE} strokeWidth="5" strokeLinecap="round" />
      <path className={styles.fPulse} d={route} pathLength={100} stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

      {/* 現場のターゲット */}
      <g className={styles.fTarget}>
        <line className={styles.fBeacon} x1={TARGET.x} y1="10" x2={TARGET.x} y2={TARGET.y - 12} stroke="url(#svc-f-beacon)" strokeWidth="1.4" />
        <circle className={styles.fPing} cx={TARGET.x} cy={TARGET.y} r="11" stroke={AZURE} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <circle
          className={cn(styles.fPing, styles.fPing2)}
          cx={TARGET.x}
          cy={TARGET.y}
          r="11"
          stroke={SKY}
          vectorEffect="non-scaling-stroke"
        />
        <circle className={styles.fGlow} cx={TARGET.x} cy={TARGET.y} r="24" fill="url(#svc-f-glow)" />
        <circle cx={TARGET.x} cy={TARGET.y} r="11" fill="rgba(5,7,12,0.6)" stroke="rgba(125,216,255,0.6)" />
        <circle cx={TARGET.x} cy={TARGET.y} r="5.5" stroke="rgba(125,216,255,0.3)" />
        <circle cx={TARGET.x} cy={TARGET.y} r="2.8" fill="#ffffff" />
        {[
          [0, -1],
          [1, 0],
          [0, 1],
          [-1, 0],
        ].map(([dx, dy]) => (
          <line
            key={`${dx}${dy}`}
            x1={TARGET.x + dx * 14}
            y1={TARGET.y + dy * 14}
            x2={TARGET.x + dx * 19}
            y2={TARGET.y + dy * 19}
            stroke="rgba(125,216,255,0.55)"
            strokeLinecap="round"
          />
        ))}
      </g>
    </svg>
  )
}

/* ───────────────── 04 SYSTEM DESIGN & DEVELOPMENT ─────────────────
   等角投影で重なる3枚の層(UI / サービス / データ)。層は少しずつずれて浮かび、層の間を光のパケットが行き来する */

const S = { cx: 380, w: 110, h: 55, depth: 7 }
const layers = [
  { key: "top", cy: 84, tint: SKY, bob: "0s" },
  { key: "mid", cy: 130, tint: AZURE, bob: "-1.7s" },
  { key: "bot", cy: 176, tint: INDIGO, bob: "-3.4s" },
] as const
type LayerKey = (typeof layers)[number]["key"]

const iso = (u: number, v: number, cy: number): [number, number] => [
  r1(S.cx + ((u - v) * S.w) / 2),
  r1(cy + ((u + v) * S.h) / 2),
]
const pts = (points: [number, number][]) => points.map(([x, y]) => `${x},${y}`).join(" ")
const rhombus = (u: number, v: number, s: number, cy: number) =>
  pts([iso(u - s, v - s, cy), iso(u + s, v - s, cy), iso(u + s, v + s, cy), iso(u - s, v + s, cy)])

/** 層をつなぐ縦の光の柱(平面上の u, v 座標) */
const columns = [
  { u: -0.45, v: 0.25 },
  { u: 0.25, v: -0.45 },
  { u: 0.35, v: 0.45 },
]
const colX = (c: { u: number; v: number }) => iso(c.u, c.v, 0)[0]
const colDy = (c: { u: number; v: number }) => iso(c.u, c.v, 0)[1]
const GAP = layers[1].cy - layers[0].cy

const packets: { col: number; seg: "upper" | "lower"; dir: "up" | "down"; dur: number; delay: number }[] = [
  { col: 0, seg: "upper", dir: "up", dur: 2.6, delay: 0 },
  { col: 1, seg: "upper", dir: "down", dur: 2.2, delay: 900 },
  { col: 2, seg: "upper", dir: "up", dur: 2.9, delay: 1600 },
  { col: 0, seg: "lower", dir: "down", dur: 2.4, delay: 500 },
  { col: 1, seg: "lower", dir: "up", dur: 2.7, delay: 1300 },
  { col: 2, seg: "lower", dir: "down", dur: 2.3, delay: 2100 },
]

function Plane({ cy, tint }: { cy: number; tint: string }) {
  const top = iso(-1, -1, cy)
  const right = iso(1, -1, cy)
  const bottom = iso(1, 1, cy)
  const left = iso(-1, 1, cy)
  const d = S.depth
  return (
    <>
      <polygon points={pts([left, bottom, [bottom[0], bottom[1] + d], [left[0], left[1] + d]])} fill="rgba(8,12,22,0.9)" stroke="rgba(160,190,240,0.14)" />
      <polygon points={pts([bottom, right, [right[0], right[1] + d], [bottom[0], bottom[1] + d]])} fill="rgba(14,22,40,0.9)" stroke="rgba(160,190,240,0.14)" />
      <polygon points={pts([top, right, bottom, left])} fill="url(#svc-s-plane)" stroke="rgba(160,190,240,0.2)" />
      {[-0.5, 0, 0.5].map((t) => (
        <g key={t} stroke="rgba(160,190,240,0.08)">
          <line x1={iso(t, -1, cy)[0]} y1={iso(t, -1, cy)[1]} x2={iso(t, 1, cy)[0]} y2={iso(t, 1, cy)[1]} />
          <line x1={iso(-1, t, cy)[0]} y1={iso(-1, t, cy)[1]} x2={iso(1, t, cy)[0]} y2={iso(1, t, cy)[1]} />
        </g>
      ))}
      <polyline points={pts([left, bottom, right])} stroke={tint} strokeOpacity="0.55" />
      <polyline points={pts([left, top, right])} stroke="rgba(255,255,255,0.1)" />
      {columns.map((c) => (
        <ellipse key={`${c.u}${c.v}`} cx={colX(c)} cy={cy + colDy(c)} rx="5.5" ry="2.75" stroke={tint} strokeOpacity="0.6" />
      ))}
    </>
  )
}

function LayerContent({ layer }: { layer: LayerKey }) {
  if (layer === "top") {
    const cy = layers[0].cy
    return (
      <>
        {columns.map((c, i) => (
          <polygon
            key={i}
            points={rhombus(c.u, c.v, 0.2, cy)}
            fill={i === 1 ? "rgba(125,216,255,0.22)" : "rgba(125,216,255,0.08)"}
            stroke={SKY}
            strokeOpacity={i === 1 ? 0.8 : 0.4}
          />
        ))}
        <polygon points={pts([iso(-0.85, -0.85, cy), iso(0.85, -0.85, cy), iso(0.85, -0.65, cy), iso(-0.85, -0.65, cy)])} fill="rgba(125,216,255,0.1)" />
        <polygon className={styles.sTileGlow} points={rhombus(columns[1].u, columns[1].v, 0.2, cy)} fill="rgba(125,216,255,0.35)" />
      </>
    )
  }
  if (layer === "mid") {
    const cy = layers[1].cy
    const nodes = [...columns, { u: -0.2, v: -0.55 }].map((c) => [colX(c), cy + colDy(c)] as const)
    const links: [number, number][] = [
      [0, 2],
      [2, 1],
      [0, 3],
      [3, 1],
    ]
    return (
      <>
        {links.map(([a, b]) => (
          <line key={`${a}${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(0,181,255,0.45)" />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="url(#svc-s-node)" />
            <circle cx={x} cy={y} r="2.6" fill={i === 3 ? SKY : "#dff4ff"} />
          </g>
        ))}
      </>
    )
  }
  const cy = layers[2].cy
  return (
    <>
      {columns.map((c, i) => {
        const x = colX(c)
        const y = cy + colDy(c)
        return (
          <g key={i}>
            <path d={`M${x - 10} ${y - 7}V${y}A10 5 0 0 0 ${x + 10} ${y}V${y - 7}`} fill="rgba(99,102,255,0.22)" stroke={INDIGO} strokeOpacity="0.6" />
            <ellipse cx={x} cy={y - 7} rx="10" ry="5" fill="rgba(99,102,255,0.35)" stroke={INDIGO} strokeOpacity="0.8" />
          </g>
        )
      })}
    </>
  )
}

function Segment({ seg }: { seg: "upper" | "lower" }) {
  const fromCy = seg === "upper" ? layers[1].cy : layers[2].cy
  return (
    <g className={cn(styles.sSeg, seg === "upper" ? styles.sSegUpper : styles.sSegLower)}>
      {columns.map((c, i) => {
        const x = colX(c)
        const yBottom = fromCy + colDy(c)
        return (
          <g
            key={i}
            className={styles.sColumn}
            style={{ transformOrigin: `${x}px ${seg === "upper" ? yBottom : yBottom - GAP}px` }}
          >
            <rect x={x - 3} y={yBottom - GAP} width="6" height={GAP} fill="url(#svc-s-vline)" opacity="0.32" />
            <rect x={x - 0.5} y={yBottom - GAP} width="1" height={GAP} fill="url(#svc-s-vline)" />
            {packets
              .filter((p) => p.seg === seg && p.col === i)
              .map((p) => (
                <g
                  key={p.delay}
                  className={cn(styles.sPacket, p.dir === "up" ? styles.sPacketUp : styles.sPacketDown)}
                  style={cssVars({ "--dur": `${p.dur}s`, "--d": ms(p.delay) })}
                >
                  <circle cx={x} cy={p.dir === "up" ? yBottom : yBottom - GAP} r="7" fill="url(#svc-s-node)" />
                  <circle cx={x} cy={p.dir === "up" ? yBottom : yBottom - GAP} r="2.1" fill="#ffffff" />
                </g>
              ))}
          </g>
        )
      })}
    </g>
  )
}

function Layer({ index }: { index: 0 | 1 | 2 }) {
  const layer = layers[index]
  return (
    <g className={cn(styles.sLayer, index === 0 && styles.sLayerTop, index === 2 && styles.sLayerBot)}>
      <g className={styles.sDrop} style={cssVars({ "--d": ms((2 - index) * 160) })}>
        <g className={styles.sBob} style={cssVars({ "--bob": layer.bob })}>
          <Plane cy={layer.cy} tint={layer.tint} />
          <LayerContent layer={layer.key} />
        </g>
      </g>
    </g>
  )
}

/** 等角の床(左右に広がる方眼) */
const floorLines = Array.from({ length: 26 }, (_, i) => -200 + i * 44)

/** 中段の左右の頂点から伸びる、外部システムへの接続 */
const satellites = [
  { from: iso(-1, 1, layers[1].cy), to: [182, 86] as [number, number] },
  { from: iso(1, -1, layers[1].cy), to: [578, 166] as [number, number] },
]

function Cube({ x, y, s = 11 }: { x: number; y: number; s?: number }) {
  return (
    <g>
      <polygon points={pts([[x - s, y], [x, y + s / 2], [x, y + s / 2 + s], [x - s, y + s]])} fill="rgba(10,16,30,0.95)" stroke="rgba(125,216,255,0.35)" />
      <polygon points={pts([[x, y + s / 2], [x + s, y], [x + s, y + s], [x, y + s / 2 + s]])} fill="rgba(16,26,46,0.95)" stroke="rgba(125,216,255,0.35)" />
      <polygon points={pts([[x, y - s / 2], [x + s, y], [x, y + s / 2], [x - s, y]])} fill="rgba(0,181,255,0.25)" stroke={SKY} strokeOpacity="0.7" />
    </g>
  )
}

export function StackArt() {
  return (
    <svg className={styles.art} viewBox="0 0 760 256" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
      <defs>
        <linearGradient id="svc-s-plane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2844" stopOpacity="0.62" />
          <stop offset="1" stopColor="#0a101e" stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id="svc-s-vline" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} stopOpacity="0" />
          <stop offset="0.2" stopColor={SKY} stopOpacity="0.9" />
          <stop offset="0.8" stopColor={AZURE} stopOpacity="0.9" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="svc-s-node">
          <stop offset="0" stopColor={SKY} stopOpacity="0.8" />
          <stop offset="0.4" stopColor={AZURE} stopOpacity="0.3" />
          <stop offset="1" stopColor={AZURE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-s-glow">
          <stop offset="0" stopColor="#0057d9" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0057d9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="svc-s-floor-mask-g" cx="0.5" cy="0.75" r="0.6">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <mask id="svc-s-floor-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="760" height="256">
          <rect width="760" height="256" fill="url(#svc-s-floor-mask-g)" />
        </mask>
      </defs>

      <ellipse cx={S.cx} cy="170" rx="280" ry="90" fill="url(#svc-s-glow)" />

      {/* 床の方眼 */}
      <g className={styles.sFloor} mask="url(#svc-s-floor-mask)" stroke="rgba(160,190,240,0.09)">
        {floorLines.map((x) => (
          <g key={x}>
            <line x1={x} y1="256" x2={x + 400} y2="56" />
            <line x1={x + 400} y1="256" x2={x} y2="56" />
          </g>
        ))}
      </g>

      {/* 外部システムへの接続 */}
      {satellites.map(({ from, to }, i) => {
        const d = `M${from[0]} ${from[1]}L${to[0]} ${to[1]}`
        return (
          <g key={i} className={styles.sSat} style={cssVars({ "--d": ms(i * 700) })}>
            <path d={d} stroke="rgba(125,216,255,0.35)" strokeDasharray="2 4" />
            <path className={styles.sSatPulse} d={d} pathLength={100} stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
            <Cube x={to[0] + (i === 0 ? -6 : 6)} y={to[1] + (i === 0 ? -8 : 2)} />
          </g>
        )
      })}

      <Layer index={2} />
      <Segment seg="lower" />
      <Layer index={1} />
      <Segment seg="upper" />
      <Layer index={0} />
    </svg>
  )
}
