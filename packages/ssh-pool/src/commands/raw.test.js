import * as util from '../util.js'
import { formatRawCommand } from './raw.js'

describe('raw', () => {
  beforeEach(() => {
    util.deprecateV3 = jest.fn()
  })

  describe('#formatRawCommand', () => {
    it('should support command', () => {
      expect(formatRawCommand({ command: 'echo "ok"' })).toBe('echo "ok"')
    })

    it('should support asUser', () => {
      expect(formatRawCommand({ asUser: 'foo', command: 'echo "ok"' })).toBe(
        'sudo -u foo bash -c \'echo "ok"\'',
      )

      expect(
        formatRawCommand({ asUser: 'foo', command: 'sudo echo "ok"' }),
      ).toBe('sudo -u foo bash -c \'echo "ok"\'')
    })
  })
})
