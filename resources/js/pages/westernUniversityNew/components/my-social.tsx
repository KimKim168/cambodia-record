import { FloatingDock } from "./ui/floating-dock";
import { usePage } from "@inertiajs/react";

export function MySocial() {
  const { links } = usePage().props;

  const social_links = links?.map((item) => ({
    title: item.title,
    image: item.image, // e.g., "1748313444_facebook.webp"
    href: item.link,
  }));

  return (
    <div className="flex items-center">
      <FloatingDock
        desktopClassName="translate-y-2"
        items={social_links}
      />
    </div>
  );
}
