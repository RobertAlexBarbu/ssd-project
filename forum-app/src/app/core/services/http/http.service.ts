import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { JsonObject } from 'type-fest';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http = inject(HttpClient);

  environmentService = inject(EnvironmentService);

  httpOptions = {
    withCredentials: true
  };


  scheme = this.environmentService.getEnvironmentVar('scheme');

  domain = this.environmentService.getEnvironmentVar('domain');

  port = this.environmentService.getEnvironmentVar('port');

  server = `${this.scheme}://${this.domain}`;

  post<T, V = JsonObject>(url: string, body: V) {
    return this.http.post<T>(
      `${this.server}/api/${url}`,
      body,
      this.httpOptions
    );
  }

  put<T, V = JsonObject>(url: string, body: V) {
    return this.http.put<T>(
      `${this.server}/api/${url}`,
      body,
      this.httpOptions
    );
  }

  putByID<T, V = JsonObject>(url: string, body: V, id: string | number) {
    return this.http.put<T>(
      `${this.server}/api/${url}/${id}`,
      body,
      this.httpOptions
    );
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.server}/api/${url}`, this.httpOptions);
  }

  deleteByID<T>(url: string, id: string | number) {
    return this.http.delete<T>(
      `${this.server}/api/${url}/${id}`,
      this.httpOptions
    );
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.server}/api/${url}`, this.httpOptions);
  }

  getByID<T>(url: string, id: string | number) {
    return this.http.get<T>(
      `${this.server}/api/${url}/${id}`,
      this.httpOptions
    );
  }
}
