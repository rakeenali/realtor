import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, [_root, _args, ctx, _info]) => ctx.req.user,
);
