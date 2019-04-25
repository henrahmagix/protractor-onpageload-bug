# Protractor onPageLoad bug example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

This is meant to serve as the smallest example of this Protractor bug: https://github.com/angular/protractor/issues/4968

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
