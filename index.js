function ratioToRGB ({ r, g, b }) {
  return ({
    r: r * 255,
    g: g * 255,
    b: b * 255
  })
}

export default function getColors (document, nodeType, nameRegex) {
  nodeType = nodeType || ['RECTANGLE']
  nameRegex = nameRegex || /.*/g

  if (!document) {
    return null
  }

  let results = []

  function visit (node) {
    if (
      node.name.match(nameRegex)
      && nodeType.includes(node.type)
      && node.fills.length
      && node.fills[0].color
    ) {
      const color = ratioToRGB(node.fills[0].color)
      const { name } = node

      results = [...results, ...[{name, color}]]
    }

    if ('children' in node) {
      node.children.forEach(visit)
    }
  }

  visit(document)

  return results
}

