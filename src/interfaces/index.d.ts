/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { JPayload } from './common';

declare global {
  namespace Express {
    interface Request {
      user: JPayload;
    }
  }
}
