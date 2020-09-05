import { get, PropertyPath } from './utils'
import { CatalogComponents } from './types'

export interface ICatalog<T extends CatalogComponents = CatalogComponents> {
  // contains the raw catalog
  _catalog: T
  /**
   * Get a Component by it's path in the given catalog. If it is not available,
   * getComponent will return undefined
   *
   * @example
   * ```
   * const Button = catalog.getComponent('button');
   * const Button = catalog.getComponent(['button']);
   *
   * // or, if the components in the catalog are nested
   * const Button = catalog.getComponent("common.button")
   * const Button = catalog.getComponent(["common", "button"])
   * ```
   *
   * types are inspired by
   * @see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7caeca4bfbd5ca9f306c14def3dd6b416869c615/types/lodash/common/object.d.ts#L1669
   * @see https://codewithstyle.info/Deep-property-access-in-TypeScript/
   *
   * Playground
   * @see https://nttr.st/2xu77eG
   *
   * Additional references:
   * @see https://github.com/pirix-gh/ts-toolbelt
   * @see https://stackoverflow.com/q/47256723/1238150
   * @see https://stackoverflow.com/a/58436959/1238150
   */
  getComponent<TKey extends keyof NonNullable<T>>(
    component: TKey | [TKey],
  ): NonNullable<T>[TKey] | undefined
  getComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1]
  >(
    component: [TKey1, TKey2],
  ): NonNullable<T>[TKey1][TKey2] | undefined
  getComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1],
    TKey3 extends keyof NonNullable<T>[TKey1][TKey2]
  >(
    component: [TKey1, TKey2, TKey3],
  ): NonNullable<T>[TKey1][TKey2][TKey3] | undefined
  getComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1],
    TKey3 extends keyof NonNullable<T>[TKey1][TKey2],
    TKey4 extends keyof NonNullable<T>[TKey1][TKey2][TKey3]
  >(
    component: [TKey1, TKey2, TKey3, TKey4],
  ): NonNullable<T>[TKey1][TKey2][TKey3][TKey4] | undefined
  getComponent<K extends unknown>(component: T): K
  /**
   * validates if the given component exists in the catalog
   *
   * @example
   * ```
   * const hasButton = catalog.hasComponent('button');
   * const hasButton = catalog.hasComponent(['button']);
   *
   * // or, if the components in the catalog are nested
   * const hasButton = catalog.hasComponent("common.button")
   * const hasButton = catalog.hasComponent(["common", "button"])
   * ```
   */
  hasComponent<TKey extends keyof NonNullable<T>>(
    component: TKey | [TKey],
  ): boolean
  hasComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1]
  >(
    component: [TKey1, TKey2],
  ): boolean
  hasComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1],
    TKey3 extends keyof NonNullable<T>[TKey1][TKey2]
  >(
    component: [TKey1, TKey2, TKey3],
  ): boolean
  hasComponent<
    TKey1 extends keyof NonNullable<T>,
    TKey2 extends keyof NonNullable<T>[TKey1],
    TKey3 extends keyof NonNullable<T>[TKey1][TKey2],
    TKey4 extends keyof NonNullable<T>[TKey1][TKey2][TKey3]
  >(
    component: [TKey1, TKey2, TKey3, TKey4],
  ): boolean
  hasComponent(component: PropertyPath): boolean
}

export class Catalog<T extends CatalogComponents = CatalogComponents>
  implements ICatalog<T> {
  public _catalog: T

  constructor(catalog: T) {
    this._catalog = catalog
  }

  public getComponent: ICatalog<T>['getComponent'] = (component: any) =>
    get(this._catalog, component)

  public hasComponent: ICatalog<T>['hasComponent'] = (component: any) =>
    !!get(this._catalog, component)
}

export default Catalog
