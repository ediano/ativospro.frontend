export const createSlug = (key: string | number) => {
  const slug = String(key).replace(/\W+/g, "-").replace(/\_+/g, "").toLowerCase();
  return slug;
};

export const createId = (key: string | number) => {
  const id = String(key).replace(/\W+/g, "_").replace(/\_+/g, "_").toLowerCase();
  return id;
};
