'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ButtonLink } from '@/components/ui/Button';

interface MissionPreviewContentProps {
  line1: string;
  line2: string;
  highlight: string;
  text: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const lineVariant = (reduced: boolean) => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.72, ease: EASE },
  },
});

export function MissionPreviewContent({
  line1,
  line2,
  highlight,
  text,
}: MissionPreviewContentProps) {
  const reduced = useReducedMotion() ?? false;
  const item = lineVariant(reduced);

  return (
    <motion.div
      className="w-full max-w-xl lg:max-w-[46%] xl:max-w-[42rem]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.32 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: reduced ? 0 : 0.14, delayChildren: reduced ? 0 : 0.08 },
        },
      }}
    >
      <h2
        id="foundation-heading"
        className="font-display text-[2.35rem] leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
      >
        <motion.span variants={item} className="block">
          {line1}
        </motion.span>
        {line2 ? (
          <motion.span variants={item} className="block">
            {line2}
          </motion.span>
        ) : null}
        <motion.span variants={item} className="mt-0.5 block italic text-bronze-700">
          {highlight}
        </motion.span>
      </h2>

      <motion.p
        variants={item}
        className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-7 sm:text-lg sm:leading-relaxed"
      >
        {text}
      </motion.p>

      <motion.div
        className="mt-8 flex flex-wrap items-center gap-4 sm:mt-9"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduced ? 0 : 0.1, delayChildren: 0 } },
        }}
      >
        <motion.div variants={item}>
          <ButtonLink href="/about/mission" variant="secondary" size="lg" withArrow>
            Explore the mission
          </ButtonLink>
        </motion.div>
        <motion.div variants={item}>
          <ButtonLink
            href="/about/team"
            variant="ghost"
            size="lg"
            withArrow
            className="text-pomegranate hover:text-pomegranate-700"
          >
            Meet the team
          </ButtonLink>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
