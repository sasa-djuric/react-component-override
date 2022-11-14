# react-component-override

A library for overriding react components at runtime.

## Install

```sh
npm install react-component-override
```

or

```sh
yarn add react-component-override
```

## Usage

Opt-in component for an override

```js
// Button.jsx
import { overridable } from 'react-component-override';

export const Button = overridable(({ children, ...props }) => {
  return <button {...props}>{children}</button>;
});
```

and provide overrides

```jsx
// App.jsx
import {
  createOverrides,
  override,
  OverridesProvider
} from 'react-component-override';
import { Button } from './Button';

const OverridenButton = ({ children, ...props }) => {
  return (
    <Button {...props} style={{ background: '#b08eff' }}>
      {children}
    </Button>
  );
};

const overrides = createOverrides([override(Button, OverridenButton)]);

function App() {
  return (
    <OverridesProvider overrides={overrides}>
      <Button>It's actually OverridenButton component</Button>
    </OverridesProvider>
  );
}
```

## License

[MIT](https://github.com/sasa-djuric/react-component-override/blob/master/licence)

