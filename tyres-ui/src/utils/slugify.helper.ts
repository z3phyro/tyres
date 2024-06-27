export const slugify = (value: string) =>
  value.toLowerCase().replace(/\s/g, "-");

export const capitalize = (value: string) =>
  value[0].toUpperCase() + value.slice(1);

export const deSlugify = (value: string) =>
  value.split("-").map(capitalize).join(" ");
