import { get, flattenObjectKeys } from './utils'

describe('utils', () => {
  const obj = {
    a: 1,
    b: 2,
    c: {
      d: 3,
      e: {
        f: 4,
      },
    },
  }

  const objArray = {
    a: [{ b: 1 }, { b: 2 }],
  }

  describe('get', () => {
    it('returns undefined when path (nested or not) is not found', () => {
      expect(get(obj, 'ab')).toBeUndefined()
      expect(get(objArray, 'a[2].b')).toBeUndefined()
    })

    it('returns default value when path is not found', () => {
      expect(get(obj, 'ab', 'default')).toStrictEqual('default')
      expect(get(obj, 'ab') || 'default').toStrictEqual('default')
    })

    it('returns value when path is present in obj', () => {
      expect(get(obj, 'a')).toStrictEqual(1)
    })

    it('returns value when path is pointing to a present array index', () => {
      expect(get(objArray.a, '0')).toStrictEqual({ b: 1 })
    })

    it('returns value when path is an index of an array (non-string path) is present in obj', () => {
      expect(get(objArray.a, 0)).toBeUndefined()
    })

    it('returns value when nested path is found', () => {
      expect(get(obj, 'c.e.f')).toStrictEqual(4)
    })

    it('returns value when nested path (string-array) is found', () => {
      expect(get(obj, ['c', 'e', 'f'])).toStrictEqual(4)
    })

    it('returns value when nested path (with array) is found', () => {
      expect(get(objArray, 'a[0].b')).toStrictEqual(1)
    })
  })

  describe('flattenObjectKeys', () => {
    it('returns null when no object is given', () => {
      expect(flattenObjectKeys()).toBeNull()
    })

    it('returns an empty array for an empty object', () => {
      expect(flattenObjectKeys({})).toStrictEqual([])
    })

    it('returns an empty array for values other than an object', () => {
      expect(flattenObjectKeys(1)).toBeNull()
      expect(flattenObjectKeys('string')).toBeNull()
    })

    it("returns an array containing the object's properties", () => {
      expect(flattenObjectKeys(obj)).toStrictEqual(['a', 'b', 'c.d', 'c.e.f'])
    })

    it("returns an array containing the object's (with array) properties", () => {
      expect(flattenObjectKeys(objArray)).toStrictEqual(['a.0.b', 'a.1.b'])
    })
  })
})
