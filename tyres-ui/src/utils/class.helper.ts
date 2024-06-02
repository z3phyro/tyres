export const cls = (classes: { [key: string]: boolean }) =>
  Object.keys(classes)
    .filter((key) => classes[key])
    .join(" ");
