import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

const neonBtnBase =
  'relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-0'

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative w-full ${className}`}>{children}</section>
)

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-0 overflow-hidden">
      {/* Animated gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_70%_-10%,rgba(99,102,241,0.35),transparent),radial-gradient(900px_600px_at_10%_10%,rgba(56,189,248,0.25),transparent),linear-gradient(120deg,#05081a,#0a0f2b_40%,#140a3a_80%)] animate-gradient-slow" />

      {/* Soft moving particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-[2px] w-[2px] rounded-full bg-cyan-300/40 shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]"
            style={{
              top: `${(i * 41) % 100}%`,
              left: `${(i * 73) % 100}%`,
              animation: `float ${(10 + (i % 5)) + Math.random()}s ease-in-out ${(i % 7) * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Faint scanlines for tech vibe */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,255,255,0.5)_96%,transparent_97%)] bg-[length:100%_8px]" />
    </div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -80])
  const scale = useTransform(scrollY, [0, 600], [1, 1.05])
  const opacity = useTransform(scrollY, [0, 600], [1, 0.85])

  return (
    <Section id="hero" className="min-h-[95vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Overlays to deepen contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020617] to-transparent" />

      <motion.div
        ref={ref}
        style={{ y, scale, opacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-cyan-200/90 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
            Season 2 is Live
          </span>

          <h1 className="mt-5 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300">Bushido League</span>
            <span className="block text-[0.85em]">FC 25</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg text-blue-100/90">
            Comprehensive Information on All Matches and Standings
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#schedule" className={`${neonBtnBase} text-[#0b1028] bg-gradient-to-r from-cyan-300 to-blue-300 hover:shadow-[0_0_24px_rgba(56,189,248,0.65)]`}>
              <span className="relative z-10">View Schedule</span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/30 opacity-0 transition-opacity duration-300 hover:opacity-10" />
            </a>
            <a href="#standings" className={`${neonBtnBase} border border-violet-400/50 text-violet-100 hover:text-white bg-violet-500/10 hover:bg-violet-500/20 hover:shadow-[0_0_24px_rgba(167,139,250,0.6)]`}>
              View Standings
            </a>
          </div>

          {/* Light sweep */}
          <div className="relative mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <span className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-sweep" />
          </div>
        </motion.div>
      </motion.div>
    </Section>
  )
}

function TopTeams() {
  const teams = useMemo(
    () => [
      {
        name: 'Chelsea',
        rank: 1,
        color: 'from-[#0a84ff] to-[#4fc3ff]',
        accent: 'text-[#bfa52f]',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
      },
      {
        name: 'Inter Milan',
        rank: 2,
        color: 'from-[#2b74ff] to-[#6a5cff]',
        accent: 'text-slate-200',
        img: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/FC_Internazionale_Milano_2021.svg',
      },
      {
        name: 'Liverpool',
        rank: 3,
        color: 'from-[#ff3b3b] to-[#ff7b57]',
        accent: 'text-amber-200',
        img: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
      },
    ],
    []
  )

  const podiumOrder = [1, 0, 2] // center first, then left, then right indices

  return (
    <Section id="standings" className="py-24">
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          Champion Podium
        </motion.h2>

        <p className="mt-3 max-w-2xl text-blue-100/80">
          The elite contenders dominating Season 2.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-end">
          {podiumOrder.map((idx, col) => {
            const t = teams[idx]
            const isCenter = col === 0
            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: col * 0.1 }}
                className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 ${
                  isCenter ? 'md:translate-y-[-24px]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm uppercase tracking-wider ${t.accent}`}>Rank {t.rank}</span>
                  <span className="text-xs text-blue-200/70">Season 2</span>
                </div>

                <div className="mt-6 flex flex-col items-center">
                  <div className="relative">
                    <motion.img
                      src={t.img}
                      alt={`${t.name} logo`}
                      className="h-28 w-28 object-contain drop-shadow-[0_0_24px_rgba(59,130,246,0.5)]"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3 + col, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Shining medal */}
                    <div className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 shadow-[0_0_18px_rgba(234,179,8,0.8)] ring-2 ring-amber-200/60" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-white">{t.name}</h3>

                  {/* Podium base */}
                  <div className="mt-6 w-full">
                    <div className={`mx-auto h-20 w-11/12 rounded-xl bg-gradient-to-br ${t.color} relative overflow-hidden shadow-[0_18px_60px_-15px_rgba(14,165,233,0.35)]`}>
                      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(400px_40px_at_50%_-10%,white,transparent)]" />
                      <div className="absolute -bottom-2 left-1/2 h-6 w-4/5 -translate-x-1/2 rounded-full bg-black/40 blur-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about" className="py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-white"
        >
          About Bushido League
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-blue-100/85 max-w-3xl"
        >
          Inspired by the spirit of discipline and respect, Bushido League FC 25 brings top-tier clubs together for a season of electric competition. We celebrate teamwork, strategy, and sportsmanship — delivering a premium e-sport experience that fuses energy, prestige, and cutting-edge presentation.
        </motion.p>
      </div>
    </Section>
  )
}

function SchedulePreview() {
  const matches = [
    {
      date: 'Sat, Mar 15',
      time: '19:00',
      home: 'Chelsea',
      away: 'Liverpool',
    },
    {
      date: 'Sun, Mar 16',
      time: '20:30',
      home: 'Inter Milan',
      away: 'Chelsea',
    },
    {
      date: 'Wed, Mar 19',
      time: '18:45',
      home: 'Liverpool',
      away: 'Inter Milan',
    },
  ]

  return (
    <Section id="schedule" className="py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold text-white"
        >
          Schedule Preview
        </motion.h2>

        {/* Timeline */}
        <div className="relative mt-10">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/80 to-violet-400/80" />
          <div className="space-y-6">
            {matches.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative ml-10 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md hover:shadow-[0_0_36px_rgba(56,189,248,0.25)] transition-shadow"
              >
                <span className="absolute left-[-26px] top-5 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-blue-200/80">{m.date} • {m.time}</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      {m.home} <span className="text-blue-300/80">vs</span> {m.away}
                    </p>
                  </div>
                  <button className={`${neonBtnBase} border border-cyan-300/50 text-cyan-100 hover:text-white bg-cyan-500/10 hover:bg-cyan-500/20`}>Details</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-sm text-blue-100/70">© 2025 E-Sport SAI | Keep Trying, Trust, And Stay Fun.</p>
      </div>
      {/* Glow line */}
      <div className="pointer-events-none absolute -top-[1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-300/30 selection:text-white">
      <AnimatedBackground />
      <Hero />
      <TopTeams />
      <About />
      <SchedulePreview />
      <Footer />
    </div>
  )
}
