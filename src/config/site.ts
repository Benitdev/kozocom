const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://kozocom.vercel.app";

export const siteConfig = {
  name: "Kozocom",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  description: "Kozocom.",
  links: {
    twitter: "https://twitter.com/immoinulmoin",
    github: "https://github.com/moinulmoin/chadnext",
  },
};

export type SiteConfig = typeof siteConfig;
