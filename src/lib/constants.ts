export const SITE_NAME = "RoboVac Forum";
export const SITE_DESCRIPTION = "The ultimate community for robot vacuum enthusiasts — all brands, all models, all discussions.";

export const CATEGORY_PREFIXES = [
  "Review",
  "Tips & Tricks",
  "Comparison",
  "Deal Alert",
  "Help Me Choose",
  "Troubleshooting",
  "Setup Guide",
  "News",
  "Showcase",
  "Poll",
] as const;

export const BRANDS = [
  { name: "Roborock", models: ["S8 MaxV Ultra", "S8 Pro Ultra", "Q Revo", "Q8 Max", "Q5 Pro", "S7 MaxV"] },
  { name: "Dreame", models: ["X40 Ultra", "L20 Ultra", "L10s Ultra", "D10s Pro", "F9 Pro"] },
  { name: "iRobot", models: ["Roomba j9+", "Roomba Combo j7+", "Roomba s9+", "Roomba i5+", "Roomba 694"] },
  { name: "Ecovacs", models: ["Deebot X2 Omni", "Deebot T30 Omni", "Deebot N20 Pro", "Deebot T20"] },
  { name: "Xiaomi", models: ["X20+", "X10+", "S10+", "E10s"] },
  { name: "Samsung", models: ["Bespoke Jet Bot AI+", "Bespoke Jet Bot+", "Jet Bot"] },
  { name: "Shark", models: ["Matrix Plus 2-in-1", "AI Ultra 2-in-1", "RV2600WD"] },
  { name: "Narwal", models: ["Freo Z Ultra", "Freo X Ultra", "Freo"] },
  { name: "Eufy", models: ["X10 Pro Omni", "L60", "G40", "L50"] },
  { name: "Yeedi", models: ["Cube Pro", "M12 Pro+", "C12 Pro+", "Vac 2 Pro"] },
  { name: "MOVA", models: ["ViAX 500", "S20 Ultra", "P50 Ultra", "E30 Ultra", "Z60"] },
  { name: "SwitchBot", models: ["K10+ Pro", "S10", "K10+"] },
] as const;

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Post Time", value: "dateline" },
  { label: "Reply/View", value: "replies" },
  { label: "View", value: "views" },
  { label: "Last Post", value: "lastpost" },
  { label: "Heat", value: "heats" },
] as const;

export const TIME_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "One Day", value: "1d" },
  { label: "Two Days", value: "2d" },
  { label: "One Week", value: "1w" },
  { label: "One Month", value: "1m" },
  { label: "Three Months", value: "3m" },
] as const;

export const TOPIC_TYPES = [
  { label: "All Topics", value: "all" },
  { label: "Poll", value: "poll" },
  { label: "Reward", value: "reward" },
] as const;

export const GEO_FLAGS = {
  DE: { label: "Deutschland", flag: "/flags/de.svg" },
  GB: { label: "United Kingdom", flag: "/flags/gb.svg" },
  IT: { label: "Italia", flag: "/flags/it.svg" },
  FR: { label: "France", flag: "/flags/fr.svg" },
  GLOBAL: { label: "Global", flag: "/flags/global.svg" },
} as const;

export const LOCALES = [
  { code: "en", label: "Global / English", flag: "/flags/global.svg" },
  { code: "de", label: "Deutschland", flag: "/flags/de.svg" },
  { code: "fr", label: "France", flag: "/flags/fr.svg" },
  { code: "it", label: "Italia", flag: "/flags/it.svg" },
] as const;

export const THREADS_PER_PAGE = 36;
export const POSTS_PER_PAGE = 20;
export const HOT_THREADS_COUNT = 3;
