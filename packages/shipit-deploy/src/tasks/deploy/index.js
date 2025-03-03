import utils from 'shipit-utils'
import init from './init.js'
import fetch from './fetch.js'
import update from './update.js'
import publish from './publish.js'
import clean from './clean.js'
import finish from './finish.js'

/**
 * Deploy task.
 * - deploy:fetch
 * - deploy:update
 * - deploy:publish
 * - deploy:clean
 * - deploy:finish
 */

export default shipit => {
  init(shipit)
  fetch(shipit)
  update(shipit)
  publish(shipit)
  clean(shipit)
  finish(shipit)

  utils.registerTask(shipit, 'deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:update',
    'deploy:publish',
    'deploy:clean',
    'deploy:finish',
  ])
}
