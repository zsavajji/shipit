import Shipit from 'shipit-cli'
import { start } from '../../../tests/util.js'
import cleanTask from './clean.js'

describe('deploy:clean task', () => {
  let shipit

  beforeEach(() => {
    shipit = new Shipit({
      environment: 'test',
      log: jest.fn(),
    })

    cleanTask(shipit)

    // Shipit config.
    shipit.initConfig({
      test: {
        deployTo: '/remote/deploy',
        keepReleases: 5,
      },
    })

    shipit.remote = jest.fn(async () => [])
  })

  it('should remove old releases', async () => {
    await start(shipit, 'deploy:clean')
    /* eslint-disable prefer-template */
    expect(shipit.remote).toBeCalledWith(
      '(ls -rd /remote/deploy/releases/*|head -n 5;ls -d /remote/deploy/releases/*)|sort|uniq -u|xargs rm -rf',
    )
    /* eslint-enable prefer-template */
  })
})
