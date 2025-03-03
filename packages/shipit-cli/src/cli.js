/* eslint-disable no-console */
import chalk from 'chalk'
import interpret from 'interpret'
import v8flags from 'v8flags'
import Liftoff from 'liftoff'
import { Command } from 'commander'
import Shipit from './shipit.js'
import pkg from '../package.json' with { type: "json" }

const program = new Command()

function exit(code) {
  if (process.platform === 'win32' && process.stdout.bufferSize) {
    process.stdout.once('drain', () => {
      process.exit(code)
    })
    return
  }

  process.exit(code)
}

program
  .version(pkg.version)
  .allowUnknownOption()
  .allowExcessArguments()
  .usage('<environment> <tasks...>')
  .option('--shipitfile <file>', 'Specify a custom shipitfile to use')
  .option('--require <files...>', 'Script required before launching Shipit')
  .option('--tasks', 'List available tasks')
  .option('--environments', 'List available environments')


program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help()
}

function logTasks(shipit) {
  console.log(
    Object.keys(shipit.tasks)
      .join('\n')
      .trim(),
  )
}

function logEnvironments(shipit) {
  console.log(
    Object.keys(shipit.globalConfig)
      .join('\n')
      .trim(),
  )
}

async function asyncInvoke(env) {
  if (!env.configPath) {
    console.error(chalk.red('shipitfile not found'))
    exit(1)
  }

  const [environment, ...tasks] = program.args

  const shipit = new Shipit({ environment })

  try {
    const { default: initialize } = await import(env.configPath)

    initialize(shipit)
  } catch (error) {
    console.error(chalk.red('Could not load async config'))
    throw error
  }

  if (program.tasks === true) {
    logTasks(shipit)
  } else if (program.environments === true) {
    logEnvironments(shipit)
  } else {
    // Run the 'default' task if no task is specified
    const runTasks = tasks.length === 0 ? ['default'] : tasks

    shipit.initialize()

    shipit.on('task_err', () => exit(1))
    shipit.on('task_not_found', () => exit(1))

    shipit.start(runTasks)
  }
}

function invoke(env) {
  asyncInvoke(env).catch(error => {
    setTimeout(() => {
      throw error
    })
  })
}

const cli = new Liftoff({
  name: 'shipit',
  extensions: interpret.jsVariants,
  v8flags,
})
cli.prepare(
  {
    configPath: program.shipitfile,
    require: program.require,
  },
  invoke,
)
