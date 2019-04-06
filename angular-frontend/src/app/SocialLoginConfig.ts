import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    LoginOpt
} from 'angularx-social-login';
import { googleLoginKey } from '../environments/environment';

export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleLoginKey)
        }
    ]);

    return config;
}