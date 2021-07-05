import * as ts from 'typescript';

/**
 * Prints out particular nodes from a source file
 *
 * @param file a path to a file
 * @param identifiers top level identifiers available
 */
export function extract(file: string, identifiers: string[]) {
  // Create a Program to represent the project, then pull out the
  // source file to parse its AST.
  let program = ts.createProgram([file], { allowJs: true });
  const sourceFile = program.getSourceFile(file);

  // To print the AST, we'll use TypeScript's printer
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // To give constructive error messages, keep track of found and un-found identifiers
  const unfoundNodes = [],
    foundNodes = [];

  // Loop through the root AST nodes of the file
  ts.forEachChild(sourceFile, (node) => {
    let name = '';

    // This is an incomplete set of AST nodes which could have a top level identifier
    // it's left to you to expand this list, which you can do by using
    // https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
    // as below
    if (ts.isFunctionDeclaration(node)) {
      name = node.name.text;
      // Hide the method body when printing
      // @ts-ignore
      node.body = undefined;
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile);
    } else if (ts.isInterfaceDeclaration(node)) {
      name = node.name.text;
    }

    const container = identifiers.includes(name) ? foundNodes : unfoundNodes;
    container.push([name, node]);
  });

  // Either print the found nodes, or offer a list of what identifiers were found
  //   if (!foundNodes.length) {
  //     console.log(
  //       `Could not find any of ${identifiers.join(', ')} in ${file}, found: ${unfoundNodes
  //         .filter((f) => f[0])
  //         .map((f) => f[0])
  //         .join(', ')}.`,
  //     );
  //     process.exitCode = 1;
  //   } else {
  //     foundNodes.map((f) => {
  //       const [name, node] = f;
  //       console.log('### ' + name + '\n');
  //       console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)) + '\n';
  //     });
  //   }
  return foundNodes;
}

export const extractNode = (file: string, identifiers: string) => {
  return extract(file, [identifiers])[0][1] as ts.Node;
};

export const printNode = (node: ts.Node) => {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  return printer.printNode(ts.EmitHint.Unspecified, node, node.getSourceFile());
};
