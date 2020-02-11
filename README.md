# figma-color-extract
Smol function for extracting colors from a Figma document

## Installation
```bash
npm install figma-color-extract
```

## How to use
```javascript
import fce from 'figma-color-extract'

fce(document)
```

`figma-color-extract` expects a [Figma document](https://www.figma.com/developers/docs#node-types)
and takes three optional parameters (`nodeType`, `nameRegex` and `channelType`) and returns an
array `{name: string, color: {r: number, g: number, b: number}}[]` or when providing `rgba` as the `channelType `fce(document, '', '', rgba')` -> `{name: string, color: {r: number, g: number, b: number, a: number}}[]`.

`name` is the name of the node and `color` is an rgb representation of the
first fill for that node.

## Parameters

### document - Required
A [Figma document](https://www.figma.com/developers/docs#node-types) as
returned by `GET/v1/files/:key` endpoint.

### nodeType - Optional
An array of [Figma node types](https://www.figma.com/developers/docs#node-types).
This will filter the results to only show colors from nodes that match a type
in the supplied array.

Default value: `['RECTANGLE']`

### nameRegex - Optional
If supplied, the function will only return nodes whose name matches the regex.

Default value: `/.*/g`
