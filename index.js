function ratioToRGB ({ r, g, b }) {
  return ({
    r: r * 255,
    g: g * 255,
    b: b * 255
  })
}

function ratioToRGBA ({ r, g, b, a }) {
  return ({
    r: r * 255,
    g: g * 255,
    b: b * 255,
    a: a
  })
}

export default function getColors(document, nodeType, nameRegex, channelType) {
  nodeType = nodeType || ['RECTANGLE']
  nameRegex = nameRegex || /.*/g
  channelType = channelType || 'rgb'

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

      let color;

      if (channelType === 'rgba') {

        const newColorObj = {
          ...node.fills[0].color,
          a: node.fills[0].opacity,
        };

        color = ratioToRGBA(newColorObj)

      } else {

        color = ratioToRGB(node.fills[0].color)

      }

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

