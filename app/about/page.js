export const metadata = {
  title: "About | Liyag",
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl font-extrabold text-maroon mb-4">
        About Liyag
      </h1>
      <div className="bg-cream border border-mauve/20 rounded-signboard p-6 sm:p-8 shadow-card flex flex-col gap-4 text-ink leading-relaxed">
        <p>
          <span className="font-display font-bold text-maroon">Liyag</span>{" "}
          means "beloved" — and that's basically what this is: a running list
          of the cute, comfy, worth-the-commute spots around Manila that we
          actually go to with each other.
        </p>
        <p>
          We kept losing track of good places in group chats and screenshots,
          so this exists to fix that — one map, organized by city, category,
          and vibe, with everything you need to actually get there: a Maps
          link, how to commute, and the menu.
        </p>
        <p>
          Everything here is picked by us, or suggested by friends and
          reviewed before it goes up. If you know a spot we're missing,{" "}
          <a href="/submit" className="text-cherry font-semibold hover:underline">
            send it in
          </a>{" "}
          — we'd love to add it.
        </p>
      </div>
    </div>
  );
}