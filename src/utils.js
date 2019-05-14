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
export const get = (obj, path, def) => {
  /**
   * If the path is a string, convert it to an array
   * @param  {String|Array} path The path
   * @return {Array}             The path array
   */
  const stringToPath = pathValue => {
    // If the path isn't a string, return it
    if (typeof pathValue !== 'string') {
      if (Array.isArray(pathValue)) {
        return pathValue
      }
      return null
    }

    // Create new array
    const output = []

    // Split to an array with dot notation
    pathValue.split('.').forEach(item => {
      // Split to an array with bracket notation
      item.split(/\[([^}]+)\]/g).forEach(key => {
        // Push to the new array
        if (key.length > 0) {
          output.push(key)
        }
      })
    })

    return output
  }

  // Get the path as an array
  const findPath = stringToPath(path)

  // an invalid path was provided, which we were not able to handle
  if (!findPath) {
    return def
  }

  // Cache the current object
  let current = obj

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

/**
 * Returns an array with the flattend Object.keys of a given object
 *
 * Inspired by flattenObject published on https://30secondsofcode.org/object
 *
 * ```js
 * const obj = {
 *  a: 1,
 *  b: 2,
 *  c: {
 *    d: 3,
 *    e: {
 *      f: 4,
 *    },
 *  },
 * }
 * ```
 *
 * would result in `['a', 'b', 'c.d', 'c.e.f']`
 */
export const flattenObjectKeys = (obj, prefix = '', flatObjectProps = []) => {
  if (!obj || typeof obj === 'string' || typeof obj === 'number') {
    return null
  }

  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : ''

    if (typeof obj[k] === 'object') {
      Object.assign(acc, flattenObjectKeys(obj[k], pre + k, flatObjectProps))
    } else {
      flatObjectProps.push(pre + k)
    }

    return acc
  }, {})

  return flatObjectProps
}
