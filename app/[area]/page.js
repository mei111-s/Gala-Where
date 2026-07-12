import { notFound } from "next/navigation";
import Link from "next/link";
import { areaBySlug } from "@/lib/data";
import { getSpotsByArea } from "@/lib/store";
import AreaExplorer from "@/components/AreaExplorer";

export default async function AreaPage({ params }) {
  const area = areaBySlug(params.area);
  if (!area) notFound();

  const spots = await getSpotsByArea(area.slug);

  return (
    <div>
      <Link href="/" className="font-mono text-xs text-ink/40 hover:text-cherry">
        ← all areas
      </Link>
      <h1 className="font-display text-4xl font-extrabold text-maroon mt-2 mb-1">
        {area.name}
      </h1>
      <p className="text-inkmuted mb-6">{area.blurb}</p>

      <AreaExplorer spots={spots} />
    </div>
  );
}
