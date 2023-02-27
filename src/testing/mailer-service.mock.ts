import { MailerService } from '@nestjs-modules/mailer';

export const maillerServiceMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn(),
  },
};
