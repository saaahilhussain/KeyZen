'use client'

import { useEffect, useState } from "react"

const CAT: readonly string[] = [
  "..##......##..",
  ".#ww#....#ww#.",
  ".#wwww####www#",
  ".#we#wwwwww#e#",
  ".#wwwwwwwwwww#",
  ".#wwww####www#",
  ".#wwwwwwwwwww#",
  "..#wwwwwwwww#.",
  "..#wwwwwwwww#.",
  "...#wwwwwwww#.",
  "...#w##ww##w#.",
  "...#w#..#w##..",
  "...##....##...",
]

const PX = 5

function CatPixels() {
  const cells: { x: number; y: number; kind: "#" | "w" | "e" }[] = []
  CAT.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const ch = row[c]
      if (ch === "#" || ch === "w" || ch === "e") {
        cells.push({ x: c * PX, y: r * PX, kind: ch })
      }
    }
  })
  return (
    <>
      {cells.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className={p.kind === "w" ? "fill-card" : "fill-foreground"}
        />
      ))}
    </>
  )
}

function PixelCatWithSign() {
  return (
    <svg
      viewBox="-16 -6 220 170"
      shapeRendering="crispEdges"
      overflow="visible"
      preserveAspectRatio="xMidYMax meet"
      className="h-32 w-44 sm:h-40 sm:w-56"
      aria-hidden="true"
    >
      <g className="cat-sign">
        <rect
          x="-10"
          y="4"
          width="200"
          height="36"
          className="fill-card"
          stroke="currentColor"
          strokeWidth={PX / 2}
        />
        <rect x="-10" y="4" width={PX} height={PX} className="fill-foreground" />
        <rect x="185" y="4" width={PX} height={PX} className="fill-foreground" />
        <rect x="-10" y="35" width={PX} height={PX} className="fill-foreground" />
        <rect x="185" y="35" width={PX} height={PX} className="fill-foreground" />
        <text
          x="90"
          y="27"
          textAnchor="middle"
          className="fill-foreground font-(family-name:--font-doto)"
          fontSize="18"
          fontWeight="bold"
          letterSpacing="1"
        >
          PAGE NOT FOUND
        </text>
      </g>

      {[
        { x: 48, y: 44 },
        { x: 54, y: 50 },
        { x: 60, y: 56 },
        { x: 66, y: 62 },
      ].map((p, i) => (
        <rect
          key={`arm-${i}`}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className="fill-foreground"
        />
      ))}

      <g transform="translate(60, 68)">
        <CatPixels />
      </g>

      {[
        { x: 140, y: 108 },
        { x: 145, y: 103 },
        { x: 145, y: 98 },
        { x: 145, y: 93 },
        { x: 140, y: 88 },
      ].map((p, i) => (
        <rect
          key={`tail-${i}`}
          x={p.x}
          y={p.y}
          width={PX}
          height={PX}
          className="fill-foreground"
        />
      ))}
    </svg>
  )
}

export default function AnimatedCat() {
  const [onTop, setOnTop] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOnTop(true), 680)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`cat-slide pointer-events-none absolute bottom-full left-1/3 translate-y-20 scale-70 ${onTop ? "z-40" : "z-0"}`}
      aria-hidden="true"
    >
      <PixelCatWithSign />
    </div>
  )
}
