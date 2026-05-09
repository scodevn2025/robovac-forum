import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to{" "}
          <span className="text-primary">{SITE_NAME}</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/f/reviews"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse Reviews
          </Link>
          <Link
            href="/f/discussion"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Join Discussion
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Reviews", desc: "In-depth robot vacuum reviews from real users", href: "/f/reviews" },
          { title: "Troubleshooting", desc: "Get help fixing your robot vacuum issues", href: "/f/troubleshooting" },
          { title: "Deals", desc: "Find the best prices and discounts", href: "/f/deals" },
          { title: "Brand Forums", desc: "Roborock, Dreame, iRobot, Ecovacs & more", href: "/f/brand-forums" },
        ].map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="rounded-xl border p-6 hover:border-primary/50 hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-semibold">{cat.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{cat.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Popular Brands</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {["Roborock", "Dreame", "iRobot", "Ecovacs", "Xiaomi", "Samsung", "Eufy", "Narwal", "Shark", "Yeedi", "MOVA", "SwitchBot"].map(
            (brand) => (
              <span
                key={brand}
                className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary cursor-pointer transition-colors"
              >
                {brand}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
