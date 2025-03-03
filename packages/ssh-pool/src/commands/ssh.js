import { joinCommandArgs, wrapCommand } from './util.js'

function wrapCwd(cwd, command) {
  return `cd ${cwd} > /dev/null && ${command}; cd - > /dev/null`
}

export function formatSshCommand({
  port,
  key,
  strict,
  tty,
  remote,
  cwd,
  command,
  extraSshOptions,
  verbosityLevel,
}) {
  let args = ['ssh']
  if (verbosityLevel) {
    switch (verbosityLevel) {
      case verbosityLevel <= 0:
        break
      case 1:
        args = [...args, '-v']
        break
      case 2:
        args = [...args, '-vv']
        break
      default:
        args = [...args, '-vvv']
        break
    }
  }
  if (tty) args = [...args, '-tt']
  if (port) args = [...args, '-p', port]
  if (key) args = [...args, '-i', key]
  if(extraSshOptions && typeof extraSshOptions === 'object') {
    Object.keys(extraSshOptions).forEach((sshOptionsKey) => {
      args = [...args, '-o', `${sshOptionsKey}=${extraSshOptions[sshOptionsKey]}`]
    })
  }
  if (strict !== undefined)
    args = [...args, '-o', `StrictHostKeyChecking=${strict}`]
  if (remote) args = [...args, remote]

  const cwdCommand = cwd ? wrapCwd(cwd, command) : command
  if (command) args = [...args, wrapCommand(cwdCommand)]
  return joinCommandArgs(args)
}
