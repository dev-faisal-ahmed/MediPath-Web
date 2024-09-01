import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Agent } from '../model';
import { addAgentOrUpdateValidationSchema } from '../validation';

export const addAgent = catchAsync(async (req, res) => {
  // validation
  const payload = await addAgentOrUpdateValidationSchema.parseAsync(req.body);

  const agent = await Agent.create(payload);
  if (!agent) throw new AppError('Failed to add agent', 400);

  return sendSuccessResponse(res, {
    message: 'Agent added successfully',
    data: agent,
  });
});
