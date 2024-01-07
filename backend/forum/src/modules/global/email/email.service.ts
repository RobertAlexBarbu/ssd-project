import { Injectable } from '@nestjs/common';
import * as emailjs from '@emailjs/nodejs';
import * as process from 'process';
import { EmailModel } from './email.model';

@Injectable()
export class EmailService {
  constructor() {
    const apiKey: string = process.env.EMAILJS_KEY;
    const publicKey: string = process.env.EMAILJS_PUBLIC_KEY;
    emailjs.init({ privateKey: apiKey, publicKey: publicKey });
  }

  sendMail(email: EmailModel) {
    return emailjs.send('forumly_service', 'template_6496hcp', {
      from_name: email.fromName,
      post_name: email.postName,
      message: email.message,
      to_name: email.toName,
      to_email: email.toEmail,
    });
  }
}
