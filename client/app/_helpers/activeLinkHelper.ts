const activeLink: Record<string, string[]> = {
  ['/']: ['/'],
  ['/overview']: ['/overview'],
  ['/bill/add']: ['/bill/add'],
  ['/services']: ['/services'],
  ['/bills']: ['/bills'],
  ['/referrers']: ['/referrers'],
  ['/expenses']: ['/expenses'],
};

export const isActive = (url: string, pathName: string) => {
  if (activeLink[url]?.includes(pathName)) return true;
  if (url === '/referrers' && pathName.startsWith('/referrer')) return true;
  return false;
};
