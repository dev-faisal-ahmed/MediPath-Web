import { sendSuccessResponse } from '../../../helpers';
import { catchAsync } from '../../../middlewares';
import { AppError } from '../../../utils';
import { Agent } from '../model';
import { addAgentValidationSchema } from '../validation';

export const addAgent = catchAsync(async (req, res) => {
  // validation
  const payload = await addAgentValidationSchema.parseAsync(req.body);

  // checking if agent is already added or not
  const isAgentExist = await Agent.findOne({ phone: payload.phone });
  if (isAgentExist) throw new AppError('This number already exist', 400);

  const agent = await Agent.create(payload);
  if (!agent) throw new AppError('Failed to add agent', 400);

  return sendSuccessResponse(res, {
    message: 'Agent added successfully',
    data: agent,
  });
});
