import deploy from './tasks/deploy/index.js'
import rollback from './tasks/rollback/index.js'
import pending from './tasks/pending/index.js'

export default shipit => {
  deploy(shipit)
  rollback(shipit)
  pending(shipit)
};
