const publishers = [
  { id: "oxford", name: "Oxford", tagline: "University Press" },
  { id: "cambridge", name: "Cambridge", tagline: "University Press" },
  { id: "scholastic", name: "Scholastic", tagline: "Publishing" },
  { id: "penguin", name: "Penguin", tagline: "Random House" },
  { id: "harper", name: "HarperCollins", tagline: "Publishers" },
];

export default function PartnerLogosRow() {
  return (
    <section
      aria-label="Publishing partners"
      className="py-6 px-4 sm:px-6 lg:px-8"
    >
      <p className="text-center text-xs library-muted mb-4 tracking-widest uppercase">
        Trusted publishing partners
      </p>
      <div className="flex flex-wrap justify-center gap-4 sm:flex-nowrap sm:gap-8 sm:items-center">
        {publishers.map((pub) => (
          <span
            key={pub.id}
            className="library-chip opacity-50"
            style={{ fontSize: "0.8rem", letterSpacing: "0.04em" }}
          >
            <span className="font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
              {pub.name}
            </span>
            <span className="hidden sm:inline text-xs"> {pub.tagline}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
