import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Agent } from '../model';

export const deleteAgent = catchAsync(async (req, res) => {
  const { agentId } = req.params;
  const deletedStatus = await Agent.deleteOne({ _id: agentId });

  if (!deletedStatus.acknowledged)
    throw new AppError('Failed to delete agent', 400);

  return sendSuccessResponse(res, { message: 'Agent deleted 🗑️', data: null });
});
