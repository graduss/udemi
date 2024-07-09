import { JwtModuleOptions } from '@nestjs/jwt';

export async function getJwtConfig(): Promise<JwtModuleOptions> {
  return {
    secret: 'secret',
  };
}
