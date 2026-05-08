export type ShowcaseMedia = {
  id: string;
  title: string;
  kind: "image" | "video";
  src: string;
  thumbnail?: string;
  summary?: string;
  date?: string;
  link?: string;
};
