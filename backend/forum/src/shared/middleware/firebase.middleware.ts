import { Injectable, NestMiddleware } from '@nestjs/common';
import { FirebaseService } from '../../modules/global/firebase/firebase.service';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}
  async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    const token = req.body.firebaseToken;
    const auth = this.firebaseService.getAuth();
    const data = await auth.verifyIdToken(token);

    req.body = {
      email: data.email,
      id: data.uid,
    };
    next();
  }
}
