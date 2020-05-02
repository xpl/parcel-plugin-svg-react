# parcel-plugin-svg-react

Parcel plugin for SVGR. Forked from <a href="https://github.com/gregberge/svgr/tree/master/packages/parcel-plugin-svgr">**@svgr/parcel-plugin-svgr**</a>.

```
npm install parcel-plugin-svg-react
```

## The Differences

- `.svgr` extension for React imports
- `.svg` extension for path imports
- Allows CSS imports

## React Imports

Allows to import SVG files as React components. The extension should be `.svgr`, not `.svg`!

```jsx
import Star from './star.svgr'

const App = () => (
  <div>
    <Star />
  </div>
)
```

## Usual Behavior

Allows to import `.svg` files as paths (the usual Parcel behavior):

```jsx
import star from './star.svg'

const Star = () => <div style={{ backgroundImage: star }}></div>
```

## CSS Imports

This works as well:

```css
div {
  background-image: url(./star.svg);
}
```
