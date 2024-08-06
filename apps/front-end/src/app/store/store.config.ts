import { NgxsConfig } from '@ngxs/store';

import { AuthState } from './auth/auth.state';
import { DashboardStates } from './dashboard';

export const STATES_MODULES = [AuthState, ...DashboardStates];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   * todo: you need set production mode
   * import { environment } from '@env';
   * developmentMode: !environment.production
   */
  developmentMode: true,
};
