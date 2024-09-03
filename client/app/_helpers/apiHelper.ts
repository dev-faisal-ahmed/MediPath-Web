import { toast } from 'sonner';

export const postRequestHelper = async (
  fn: () => void,
  id: string | number,
) => {
  return Promise.resolve(fn()).catch((err) => {
    toast.error(err.data?.message || 'Something went wrong', { id });
  });
};
