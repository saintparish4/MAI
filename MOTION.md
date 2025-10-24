Motion Strategy
2.1 Global smooth scrolling (Lenis)

Initialize once in a Client component (e.g., components/providers/lenis-provider.tsx).

Respect prefers-reduced-motion: if true → do not init Lenis or any scroll-linked timeline.

Provide an imperative scrollTo(id) for in-page nav.

2.2 When to use Framer vs GSAP

Framer Motion:

page transitions (<AnimatePresence/> in app/layout.tsx)

component mount/exit (cards, modals, toasts)

subtle parallax via useScroll/useTransform for single elements

GSAP (+ ScrollTrigger):

complex hero timelines (stagger headline → input → cards)

multi-section reveals (e.g., “How it works” → step 1/2/3 in sync with scroll)

performance-sensitive sequences (GSAP generally smoother for chained tweens)

2.3 Default animation presets

Fade up (Framer variant): { initial:{opacity:0,y:16}, animate:{opacity:1,y:0, transition:{duration:0.28, ease:'easeOut'} } }

Stagger container: { staggerChildren: 0.06, delayChildren: 0.04 }

Hover button: scale to 1.02, shadow intensifies, transition var(--dur-fast) with --elev

Card in-view (GSAP): from { y:24, opacity:0 } to { y:0, opacity:1, duration:0.5, ease:'power2.out' }, triggered once