import utils from 'shipit-utils'
import initTask from './init.js'
import fetchTask from '../deploy/fetch.js'
import cleanTask from '../deploy/clean.js'
import finishTask from './finish.js'

/**
 * Rollback task.
 * - rollback:init
 * - deploy:publish
 * - deploy:clean
 */
export default shipit => {
  initTask(shipit)
  fetchTask(shipit)
  cleanTask(shipit)
  finishTask(shipit)

  utils.registerTask(shipit, 'rollback', [
    'rollback:init',
    'deploy:publish',
    'deploy:clean',
    'rollback:finish',
  ])
}
