import { FooService } from 'src/app/foo.service';

export const environment = {
  production: false
};

export class FooServiceMapping extends FooService {
  static getFoo(): string {
    return 'MOCK';
  }
}
