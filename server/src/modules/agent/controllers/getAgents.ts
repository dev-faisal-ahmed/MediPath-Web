import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Agent } from '../model';

export const getAgents = catchAsync(async (_req, res) => {
  const agents = await Agent.find().sort({ name: 1 });

  return sendSuccessResponse(res, {
    message: 'Agents retrieved successfully',
    data: agents,
  });
});
