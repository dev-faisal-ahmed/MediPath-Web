import { useEffect } from 'react';

type TProps = {
  referrerId: string;
};

export const ReferrerDetails = ({ referrerId }: TProps) => {
  useEffect(() => {
    document.title = '';
  }, []);
  return referrerId;
};
