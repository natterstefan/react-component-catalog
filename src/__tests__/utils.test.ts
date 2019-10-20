import { get } from '../utils'

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
})
