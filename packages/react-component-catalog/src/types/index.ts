/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * This interface can be augmented by users to add types to
 * `react-component-catalog`'s catalog.
 *
 * ## Docs
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
 *
 * ## Examples
 * @see https://blog.agney.dev/styled-components-&-typescript/
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9e6f0ec7864b60b9a42b654d250dbe4207398c66/types/styled-components/index.d.ts#L405-L412
 *
 * ## Notes
 * `interface CatalogComponents extends Record<string, any>` doesn't work
 * properly, because then CatalogComponents can be an object with `any` value.
 * Which means using `CatalogComponents` does not have autocomplete support etc.
 * For now it is an empty interface, based on how styled-components (see link
 * above handles it.). This interface and IProps["component"] of
 * CatalogComponent play together and give the typing support when
 * CatalogComponent is used.
 */
export interface CatalogComponents {}

declare global {
  /**
   * Declare __DEV__ in the global namespace, so it is available everywhere
   * @see https://github.com/jaredpalmer/tsdx#advanced-babel-plugin-dev-expressions
   *
   * Inspired by:
   * @see https://github.com/danilobuerger/DefinitelyTyped/blob/75b774829ed6abcae5ac69c4f0564d86bbf860c7/types/react-native/index.d.ts#L9348-L9353
   */
  const __DEV__: boolean
}
