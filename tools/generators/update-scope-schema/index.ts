import { Tree, formatFiles, installPackagesTask, updateJson, readJson } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

function getScopes(nxJson: any) {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes = projects
    .map((project) => project.tags.filter((tag: string) => tag.startsWith('scope:')))
    .reduce((acc, tags) => [...acc, ...tags], [])
    .map((scope: string) => scope.slice(6));
  return Array.from(new Set(allScopes));
}

export default async function (tree: Tree, schema: any) {
  const scopes = getScopes(readJson(tree, 'nx.json'));

  await updateJson(tree, 'tools/generators/util-lib/schema.json', (schemaJson) => {
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return schemaJson;
  });
  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
