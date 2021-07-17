import { createVerifier } from '../index'

const payload = 'No more secrets, Marty.'
const secret = 'MY_VOICE_IS_MY_PASSPORT_VERIFY_ME'

const { sign, verify } = createVerifier('skipVerifier')

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(jest.fn())
})

afterEach(() => {
  jest.spyOn(console, 'warn').mockRestore()
})

describe('skips verification verifier', () => {
  describe('faux signs a payload', () => {
    test('it has an empty signature', () => {
      const signature = sign({ payload, secret })
      expect(signature).toEqual('')
    })

    test('it always verifies', () => {
      const signature = sign({ payload, secret })
      expect(verify({ payload, secret, signature })).toBeTruthy()
    })
  })
})
