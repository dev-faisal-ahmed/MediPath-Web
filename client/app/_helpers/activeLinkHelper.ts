const activeLink: Record<string, string[]> = {
  ['/']: ['/'],
  ['/doctors']: ['/doctors', '/doctor/add'],
  ['/patients']: ['/patients', '/patient/add'],
};

export const isActive = (url: string, pathName: string) => {
  return activeLink[url]?.includes(pathName);
};
