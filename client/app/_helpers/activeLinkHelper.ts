const activeLink: Record<string, string[]> = {
  ['/']: ['/'],
  ['/bill/add']: ['/bill/add'],
  ['/services']: ['/services'],
  ['/bills']: ['/bills'],
  ['/referrers']: ['/referrers'],
  ['/expenses']: ['/expenses'],
};

export const isActive = (url: string, pathName: string) => {
  return activeLink[url]?.includes(pathName);
};
