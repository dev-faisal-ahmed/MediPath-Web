import { addAgentOrUpdateValidationSchema } from '../validation';
import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Agent } from '../model';

export const updateAgent = catchAsync(async (req, res) => {
  const payload = await addAgentOrUpdateValidationSchema.parseAsync(req.body);
  const { agentId } = req.params;

  const updatedAgent = await Agent.updateOne(
    { _id: agentId },
    { $set: payload },
  );

  if (!updatedAgent.acknowledged)
    throw new AppError('Failed to update agent', 400);

  return sendSuccessResponse(res, { message: 'Agent updated', data: null });
});
