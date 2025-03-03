import utils from 'shipit-utils'
import logTask from './log.js'
import fetchTask from '../deploy/fetch.js'

/**
 * Pending task.
 * - deploy:fetch
 * - pending:log
 */
export default shipit => {
  logTask(shipit)
  fetchTask(shipit)
  utils.registerTask(shipit, 'pending', ['deploy:fetch', 'pending:log'])
}
