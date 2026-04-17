import { BookOpen, BookmarkPlus, LibraryBig, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const featuredMoments = [
  {
    icon: BookOpen,
    title: "Curated reading journeys",
    description:
      "Thoughtfully arranged shelves, warm discovery paths, and a soothing interface designed to feel like leafing through beloved volumes.",
  },
  {
    icon: BookmarkPlus,
    title: "Personal collections",
    description:
      "Save future reads, revisit favorites, and shape a digital library experience that feels intimate, calm, and delightfully organized.",
  },
  {
    icon: LibraryBig,
    title: "Quiet premium ambiance",
    description:
      "Soft paper-like surfaces, refined motion, and elegant spacing create a welcoming environment for focused browsing and reflection.",
  },
];

function App() {
  return (
    <motion.main
      className="library-shell flex items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <motion.section
          variants={itemVariants}
          className="library-panel grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-14"
        >
          <div className="flex flex-col justify-center gap-6">
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <span className="library-chip">
                <Sparkles size={14} className="icon-bob" />
                Premium digital library
              </span>
              <span className="library-chip">Warm, calm, and beautifully organized</span>
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
              <h1 className="library-page-heading max-w-2xl">
                A refined reading sanctuary for thoughtful book lovers.
              </h1>
              <p className="max-w-2xl text-base leading-7 library-muted sm:text-lg">
                Bibliophile's Bazar welcomes readers into a softer digital experience inspired by
                classic libraries, handwritten notes, and the hush of well-loved shelves.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <button type="button" className="library-button">
                Explore the collection
              </button>
              <button type="button" className="library-button-secondary">
                Visit your reading corner
              </button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid gap-4 pt-2 sm:grid-cols-3"
            >
              <div className="library-card p-5">
                <p className="text-3xl font-bold font-heading">Quiet</p>
                <p className="mt-2 text-sm leading-6 library-muted">
                  Designed with gentle contrast, breathable spacing, and tactile paper-inspired layers.
                </p>
              </div>
              <div className="library-card p-5">
                <p className="text-3xl font-bold font-heading">Curated</p>
                <p className="mt-2 text-sm leading-6 library-muted">
                  A consistent visual language for authentication, profiles, and account pages alike.
                </p>
              </div>
              <div className="library-card p-5">
                <p className="text-3xl font-bold font-heading">Elegant</p>
                <p className="mt-2 text-sm leading-6 library-muted">
                  Motion and surfaces that feel polished without ever becoming loud or distracting.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.aside variants={itemVariants} className="flex items-stretch">
            <div className="library-card library-hover-card flex w-full flex-col justify-between gap-6 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="library-chip">Today's note</span>
                <Quote className="text-library/80" size={22} />
              </div>

              <div className="space-y-4">
                <h2 className="library-section-title">
                  “A room without books is like a body without a soul.”
                </h2>
                <p className="text-sm leading-7 library-muted">
                  Inspired by timeless reading rituals, this visual system creates harmony across the
                  app while preserving every existing workflow and route.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="shimmer-skeleton h-3 w-3/4" />
                <div className="shimmer-skeleton h-3 w-full" />
                <div className="shimmer-skeleton h-3 w-5/6" />
              </div>
            </div>
          </motion.aside>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="grid gap-6 lg:grid-cols-3"
        >
          {featuredMoments.map(({ icon: Icon, title, description }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              className="library-card library-hover-card group flex flex-col gap-4"
              whileHover={{ y: -6, rotate: -0.35 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-library bg-white/60">
                <Icon size={22} className="icon-bob text-library" />
              </div>
              <div className="space-y-2">
                <h3 className="library-section-title text-[1.35rem]">{title}</h3>
                <p className="text-sm leading-7 library-muted">{description}</p>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </div>
    </motion.main>
  );
}

export default App;