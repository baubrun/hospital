export const medicalConditions = [
  "Stroke",
  "Covid-19",
  "Heart Failure",
  "Cancer Treatment",
  "General Pain",
  "Broken limb",
];

export const getTrueKeys = (data) => {
  const filtered = [];
  for (const [k, v] of Object.entries(data)) {
    if (v) {
      filtered.push(k);
    }
  }
  return filtered;
};
