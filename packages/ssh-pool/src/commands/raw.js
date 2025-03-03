import { joinCommandArgs } from './util.js'
import { deprecateV3 } from '../util.js'

const SUDO_REGEXP = /sudo\s/

export function formatRawCommand({ asUser, command }) {
  let args = []
  if (asUser) args = [...args, 'sudo', '-u', asUser]
  // Deprecate
  if (asUser && command) {
    if (command.match(SUDO_REGEXP)) {
      deprecateV3(
        'You should not use "sudo" and "asUser" options together. Please remove "sudo" from command.',
      )
    }

    const commandWithoutSudo = command.replace(SUDO_REGEXP, '');
    args = [...args, 'bash', '-c', `'${commandWithoutSudo}'`]
  } else if (command) args = [...args, command]
  return joinCommandArgs(args)
}
