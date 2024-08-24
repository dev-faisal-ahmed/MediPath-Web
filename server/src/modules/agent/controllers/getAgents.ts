import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { Agent } from '../model';

export const getAgents = catchAsync(async (req, res) => {
  const agents = await Agent.find();

  return sendSuccessResponse(res, {
    message: 'Agents retrieved successfully',
    data: agents,
  });
});
