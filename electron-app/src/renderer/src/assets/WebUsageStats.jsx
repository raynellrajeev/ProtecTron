export const desktopOS = [
  {
    label: 'Drive: C',
    value: 97.72,
  },
  
  {
    label: 'Drive: D',
    value: 4.65,
  },
];

export const mobileOS = [
  {
    label: 'Android',
    value: 70.48,
  },
  {
    label: 'iOS',
    value: 28.8,
  },
  {
    label: 'Other',
    value: 0.71,
  },
];

export const platforms = [
  {
    label: 'Mobile',
    value: 59.12,
  },
  {
    label: 'Desktop',
    value: 40.88,
  },
];

const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

export const mobileAndDesktopOS = [
  ...mobileOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Mobile)' : v.label,
    value: normalize(v.value, platforms[0].value),
  })),
  ...desktopOS.map((v) => ({
    ...v,
    label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
    value: normalize(v.value, platforms[1].value),
  })),
];

export const valueFormatter = (item) => `${item.value}%`;
