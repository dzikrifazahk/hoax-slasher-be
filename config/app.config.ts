import { AdminConfig } from './admin.config';

export default () => ({
  admin: {
    ...AdminConfig(),
  },
  logoPath: {
    url: process.env.LOGO_PATH,
  },
  uploadsDir: process.env.UPLOADS_DIR,
});
