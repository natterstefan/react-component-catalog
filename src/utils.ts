type Keys = string | number
type ObjectType = { [K in Keys]: any }
type PathType = string[] | string | number

/*!
 * Get an object value from a specific path
 *
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Source: https://gomakethings.com/how-to-get-the-value-of-an-object-from-a-specific-path-with-vanilla-js/
 *
 * @param  {Object}       obj  The object
 * @param  {String|Array} path The path
 * @param  {*}            def  A default value to return [optional]
 * @return {*}                 The value
 */
export const get = (obj: ObjectType, path: PathType, def?: any): any => {
  /**
   * If the path is a string, convert it to an array
   * @param  {String|Array} path The path
   * @return {Array}             The path array
   */
  const stringToPath = (pathValue: PathType): null | any => {
    // If the path isn't a string, return it
    if (typeof pathValue !== 'string') {
      if (Array.isArray(pathValue)) {
        return pathValue
      }
      return null
    }

    // Create new array
    const output: any[] = []

    // Split to an array with dot notation
    pathValue.split('.').forEach(item => {
      // Split to an array with bracket notation
      item.split(/\[([^}]+)\]/g).forEach((key: any) => {
        // Push to the new array
        if (key.length > 0) {
          output.push(key)
        }
      })
    })

    return output
  }

  // Get the path as an array
  const findPath: any[] = stringToPath(path)

  // an invalid path was provided, which we were not able to handle
  if (!findPath) {
    return def
  }

  // Cache the current object
  let current: ObjectType = obj

  // For each item in the path, dig into the object
  for (let i = 0; i < findPath.length; i++) {
    // If the item isn't found, return the default (or null)
    if (!current[findPath[i]]) {
      return def
    }

    // Otherwise, update the current value
    current = current[findPath[i]]
  }

  return current
}
