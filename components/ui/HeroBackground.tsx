"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"

// Match exact Tailwind orange palette used throughout site
const ACCENT = {
    bright: "rgb(251, 146, 60)",  // orange-400 - matches from-orange-400
    mid: "rgb(249, 115, 22)",     // orange-500 - matches via-orange-500  
    dark: "rgb(234, 88, 12)",     // orange-600 - matches to-orange-600
    dim: "rgb(194, 65, 12)",      // orange-700 - for deeper accents
}

const MOBILE_BREAKPOINT = 768

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
        setIsMobile(mq.matches)
        const handler = () => setIsMobile(mq.matches)
        mq.addEventListener("change", handler)
        return () => mq.removeEventListener("change", handler)
    }, [])
    return isMobile
}

function useDebouncedSize() {
    const [size, setSize] = useState({ width: 0, height: 0 })
    useEffect(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
        let tick: ReturnType<typeof requestAnimationFrame> | null = null
        const handleResize = () => {
            if (tick) return
            tick = requestAnimationFrame(() => {
                setSize({ width: window.innerWidth, height: window.innerHeight })
                tick = null
            })
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            if (tick) cancelAnimationFrame(tick)
        }
    }, [])
    return size
}

function CircuitGrid({ isMobile }: { isMobile: boolean }) {
    const windowSize = useDebouncedSize()

    const w = windowSize.width
    const h = windowSize.height
    if (w === 0) return null

    const centerX = w / 2
    const centerY = h / 2
    const gridSpacing = isMobile ? 64 : 48
    const gridHalf = isMobile ? 2 : 5

    const paths: { d: string; id: string }[] = []
    const nodes: { cx: number; cy: number; id: string }[] = []

    // Vertical grid lines (ACCENTen circuit traces)
    for (let i = -gridHalf; i <= gridHalf; i++) {
        const x = centerX + i * gridSpacing
        paths.push({
            d: `M${x} 0 L${x} ${h}`,
            id: `v-${i}`,
        })
        for (let j = -gridHalf; j <= gridHalf; j++) {
            const y = centerY + j * gridSpacing
            if (Math.abs(x - centerX) + Math.abs(y - centerY) < gridSpacing * gridHalf * 0.8) {
                nodes.push({ cx: x, cy: y, id: `node-${i}-${j}` })
            }
        }
    }

    // Horizontal grid lines
    for (let i = -gridHalf; i <= gridHalf; i++) {
        const y = centerY + i * gridSpacing
        paths.push({
            d: `M0 ${y} L${w} ${y}`,
            id: `h-${i}`,
        })
    }

    // Left circuit block (IC-style)
    const leftInset = w * 0.08
    const leftW = w * 0.14
    paths.push({
        d: `M0 ${h * 0.28} L${leftInset} ${h * 0.28} L${leftInset + leftW} ${h * 0.32} L${leftInset + leftW} ${h * 0.68} L${leftInset} ${h * 0.72} L0 ${h * 0.72} Z`,
        id: "left-ic",
    })

    // Right circuit block (mirrored)
    const rightInset = w * 0.92
    const rightW = w * 0.14
    paths.push({
        d: `M${w} ${h * 0.28} L${rightInset} ${h * 0.28} L${rightInset - rightW} ${h * 0.32} L${rightInset - rightW} ${h * 0.68} L${rightInset} ${h * 0.72} L${w} ${h * 0.72} Z`,
        id: "right-ic",
    })

    // Diagonal accent traces
    paths.push({
        d: `M${w * 0.15} ${h * 0.2} L${w * 0.35} ${h * 0.45} L${w * 0.25} ${h * 0.6}`,
        id: "diag-left",
    })
    paths.push({
        d: `M${w * 0.85} ${h * 0.2} L${w * 0.65} ${h * 0.45} L${w * 0.75} ${h * 0.6}`,
        id: "diag-right",
    })

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="ACCENT-line" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={ACCENT.bright} stopOpacity="0.15" />
                        <stop offset="50%" stopColor={ACCENT.mid} stopOpacity="0.5" />
                        <stop offset="100%" stopColor={ACCENT.bright} stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="ACCENT-beam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={ACCENT.mid} stopOpacity="0" />
                        <stop offset="50%" stopColor={ACCENT.mid} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={ACCENT.mid} stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id="node-glow">
                        <stop offset="0%" stopColor={ACCENT.mid} stopOpacity="0.8" />
                        <stop offset="70%" stopColor={ACCENT.bright} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={ACCENT.dark} stopOpacity="0" />
                    </radialGradient>
                    <filter id="ACCENT-glow">
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Base circuit lines — on mobile: static only to avoid lag */}
                {paths.map((item, i) => (
                    <g key={item.id}>
                        <path
                            d={item.d}
                            stroke="url(#ACCENT-line)"
                            strokeWidth="0.8"
                            fill="none"
                            opacity="0.4"
                        />
                        {!isMobile && (
                            <motion.path
                                d={item.d}
                                stroke="url(#ACCENT-beam)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: [0, 0.5, 0],
                                    opacity: [0, 0.9, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.15,
                                    repeatDelay: 0.8,
                                }}
                            />
                        )}
                    </g>
                ))}

                {/* Connection nodes — skip on mobile (expensive: many circles + filter) */}
                {!isMobile && nodes.map((node, i) => (
                    <motion.circle
                        key={node.id}
                        cx={node.cx}
                        cy={node.cy}
                        r="2.5"
                        fill="url(#node-glow)"
                        filter="url(#ACCENT-glow)"
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.05,
                        }}
                    />
                ))}
            </svg>
        </div>
    )
}

export default function HeroBackground() {
    const isMobile = useIsMobile()
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#0C0203]">
            {/* Base: deep dark with ACCENTen undertone */}
            <div
                className="absolute inset-0 opacity-90"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 50%, #0C0203 0%, #0C0203 50%, #0C0203 100%)",
                }}
            />

            {/* Orange vignette matching site's orange-500 tone */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(249, 115, 22, 0.03) 70%, rgba(0,0,0,0.3) 100%)",
                }}
            />

            {/* Soft orange orbs — smaller blur on mobile to reduce GPU cost */}
            <div className={`absolute top-0 left-1/4 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-orange-500/5 to-transparent ${isMobile ? "blur-[40px]" : "blur-[100px]"}`} />
            <div className={`absolute bottom-0 right-1/4 w-[45%] h-[45%] rounded-full bg-gradient-to-tl from-orange-400/5 to-transparent ${isMobile ? "blur-[40px]" : "blur-[110px]"}`} />
            <div className={`absolute top-1/2 left-1/2 w-[60%] h-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-500/3 to-transparent ${isMobile ? "blur-[32px]" : "blur-[80px]"}`} />

            {/* Subtle noise overlay — skip on mobile to save paint cost */}
            {!isMobile && (
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                />
            )}

            <CircuitGrid isMobile={isMobile} />
        </div>
    )
}
