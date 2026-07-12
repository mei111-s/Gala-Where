import { notFound } from "next/navigation";
import Link from "next/link";
import { categoryBySlug } from "@/lib/data";
import { getAllSpots } from "@/lib/store";
import CategoryExplorer from "@/components/CategoryExplorer";

export default async function CategoryPage({ params }) {
  const category = categoryBySlug(params.slug);
  if (!category) notFound();

  const allSpots = await getAllSpots();
  const spots = allSpots.filter((s) => s.category === category.slug);

  return (
    <div>
      <Link href="/" className="font-mono text-xs text-inkmuted hover:text-cherry">
        ← all areas
      </Link>
      <h1 className="font-display text-4xl font-extrabold text-maroon mt-2 mb-1">
        {category.icon} {category.name}
      </h1>
      <p className="text-inkmuted mb-6">
        Every {category.name.toLowerCase()} spot we've got, across the city.
      </p>

      <CategoryExplorer spots={spots} />
    </div>
  );
}