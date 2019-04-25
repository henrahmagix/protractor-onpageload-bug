# Protractor onPageLoad bug example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

This is meant to serve as the smallest example of this Protractor bug: https://github.com/angular/protractor/issues/4968

## Problem

Run `ng e2e` and the running order of Protractor plugins and Angular bootstrap will be printed.

The `onPageLoad` plugin should come before bootstrap, like this:
```
test order [ 'plugin onPageLoad',
  'app component constructor',
  'app component ngOnInit',
  'plugin onPageStable' ]
```

but instead the order is:
```
test order [ 'app component constructor',
  'app component ngOnInit',
  'plugin onPageLoad',
  'plugin onPageStable' ]
```

See [Protractor plugin docs][].

  [Protractor plugin docs]: https://github.com/angular/protractor/blob/4f74a4ec753c97adfe955fe468a39286a0a55837/lib/plugins.ts#L99-L132

## Solution

We can use the Angular CLI option `-c|--configuration`, like `-c prod` (identical to `--prod`), to change files for different builds.

`ng e2e` supports this too, so we can add a new environment file and make a new build confugiration to use that file when running the end-to-end tests. In that file, we can overload a method to return mock data instead of real data.

Therefore, for any class to be mocked, we import it from the evironment instead of importing it directly.

Run `ng e2e` and then `ng e2e -c mocked` to see the difference:
`ng e2e`
```
foo service mapping REAL
```
`ng e2e -c mocked`
```
foo service mapping MOCK
```

### Example

1. Create the service.
    ```ts
    // src/app/my.service.ts
    export class MyService {
      static getValue() {
        return 'REAL';
      }
    }
    ```
2. Export an extension of it from the environment.
    ```ts
    // src/environment/environment.ts
    import { MyService } from 'src/app/my.service';
    export class MyServiceMapping extends MyService {}
    ```
3. Do the same in the mock environment but overload the `getValue()` method.
    ```ts
    // src/environment/environment.mock.ts
    import { MyService } from 'src/app/my.service';
    export class MyServiceMapping extends MyService {
      static getValue() {
        return 'MOCK';
      }
    }
    ```
4. Import the service from the environment instead of directly.
    ```ts
    // src/app/app.component.ts
    import { MyServiceMapping } from 'src/environments/environment';
    const value = MyServiceMapping.getValue();
    ```

This is a slight reworking of an answer on StackOverflow: https://stackoverflow.com/a/51834607/3150057
