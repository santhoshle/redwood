const body = `
<BlogPostCell id={id} />
`

export default (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const importComponent = j.importDeclaration(
    [j.importDefaultSpecifier(j.identifier('BlogPostCell'))],
    j.stringLiteral('src/components/BlogPostCell')
  )

  root
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        value: '@redwoodjs/router',
      },
    })
    .remove()

  root.find(j.VariableDeclaration).insertBefore(importComponent)

  return root
    .find(j.VariableDeclarator, {
      id: {
        type: 'Identifier',
        name: 'BlogPostPage',
      },
    })
    .replaceWith((nodePath) => {
      const { node } = nodePath
      node.init.body = body
      return node
    })
    .toSource()
}
