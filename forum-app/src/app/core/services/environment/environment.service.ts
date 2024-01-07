import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { JsonValue } from 'type-fest';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  getEnvironmentVar(environmentVarName: string): JsonValue {
    if (environment === undefined) {
      throw new Error('Environment undefined');
    }
    if (environment[environmentVarName] === undefined) {
      throw new Error(
        'Environment variable does not exist: ' + environmentVarName
      );
    }
    return environment[environmentVarName];
  }
}
