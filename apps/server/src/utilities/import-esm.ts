/**
 * This is the same as `import()` expression that is supposed to load ESM packages while
 * preventing TypeScript from transpiling the import statement into `require()`.
 * 
 * **DO NOT USE THIS UNTIL ITS STRICTLY NECESSARY!**
 */
export const importEsmPackage = async <ReturnType>(
    packageName: string,
  ): Promise<ReturnType> =>
    new Function(`return import('${packageName}')`)().then(
      (loadedModule: unknown) => (loadedModule as any)['default'] ?? loadedModule,
    );