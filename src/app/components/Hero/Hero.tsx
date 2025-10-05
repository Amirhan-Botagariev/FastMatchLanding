"use client";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import dynamic from "next/dynamic";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const BrainCanvas = dynamic(() => import("./BrainCanvas"), {
  ssr: false,
  loading: () => (
    <div className="relative h-[40vw] max-h-[560px] min-h-[260px] w-full md:w-[680px] lg:w-[820px] md:translate-x-10 lg:translate-x-16 rounded-2xl bg-white/5 animate-pulse" />
  ),
});

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white pt-16 md:pt-20">
      {/* GRID BACKGROUND (адаптивные клетки) */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          // размер клетки: от 28px на мобильных до 52px на десктопе
          // смещения (16/14px) — лёгкий параллакс
          background: `
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px clamp(28px,6vw,52px)) 16px 50%/clamp(28px,6vw,52px) clamp(28px,6vw,52px),
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px clamp(28px,6vw,52px)) 0% 14px/clamp(28px,6vw,52px) clamp(28px,6vw,52px)
          `,
          WebkitMaskImage: 'linear-gradient(-20deg, transparent 45%, #000 70%)',
          maskImage: 'linear-gradient(-20deg, transparent 45%, #000 70%)',
        }}
      />

      {/* NAVBAR */}
      <header
        className="fixed inset-x-0 top-0 z-[80] bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/20"
        aria-label="Основная навигация"
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-[#38B6FF]" />
            <span className="text-base md:text-lg font-semibold">
              Fast<span className="text-[#38B6FF]">Match</span>
            </span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-white/80 hover:text-white">Как это работает</a>
            <a href="#why" className="text-sm text-white/80 hover:text-white">Почему мы</a>
            <a href="#cta" className="text-sm text-white/80 hover:text-white">Доступ</a>
          </nav>
          <a
            href="#cta"
            className="rounded-full bg-[#38B6FF] px-3 py-2 md:px-4 md:py-2 text-xs md:text-sm font-semibold text-black hover:opacity-90"
            style={{ paddingRight: "calc(env(safe-area-inset-right) + 1rem)" }}
          >
            Получить доступ
          </a>
        </div>
      </header>

      {/* мягкое свечение */}
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[40rem] w-[40rem] rounded-full bg-[#38B6FF]/10 blur-[120px]" />

      {/* контент */}
            {/* контент */}
      {/* контент */}
        <div
          className="
            relative z-10 mx-auto max-w-7xl px-4
            /* mobile: ставим контент ВЫШЕ — сразу под хедером */
            flex min-h-[100svh] flex-col items-center justify-start
            pt-[calc(72px+env(safe-area-inset-top))] gap-6
            /* c md: прежняя раскладка 2 колонки и вертикальное центрирование */
            md:min-h-0 md:grid md:grid-cols-2 md:items-center md:justify-normal md:gap-10 md:pt-0
          "
        >
          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 w-full text-center md:order-none md:text-left"
          >
            <h1 className="font-extrabold leading-[1.05] text-[clamp(26px,6.2vw,64px)] max-w-[22ch] mx-auto md:mx-0">
              Больше <span className="text-[#38B6FF]">интервью</span><br />
              Быстрее <span className="text-[#38B6FF]">оффер</span><br />
              Никакой <span className="text-[#38B6FF]">рутины</span>
            </h1>
          </motion.div>

          {/* Частицы */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="order-2 w-full flex justify-center md:order-none md:justify-end"
          >
            {/* на мобилке поуalready выше за счёт pt; добавим небольшой отступ */}
            <div className="mt-3 md:mt-0 w-[min(92vw,820px)] md:w-[680px] lg:w-[820px]">
              <div className="h-[clamp(200px,42vw,560px)] md:h-[560px]">
                <BrainCanvas />
              </div>
            </div>
          </motion.div>
        </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  )
}