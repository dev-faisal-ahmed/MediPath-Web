import { catchAsync } from '../../../middlewares';

const overviewTypes = ['daily', 'weekly', 'monthly', 'yearly'];

export const getOverView = catchAsync(async (req, res) => {
  const { query } = req;
  const type = query.type;
});
