import which from 'which'
import { wrapCommand, joinCommandArgs, requireArgs } from './util.js'

export async function isRsyncSupported() {
  return new Promise(resolve => which('rsync', err => resolve(!err)))
}

function formatExcludes(excludes) {
  return excludes.reduce(
    (args, current) => [...args, '--exclude', `"${current}"`],
    [],
  )
}

export function formatRsyncCommand({
  asUser,
  src,
  dest,
  excludes,
  additionalArgs,
  remoteShell,
}) {
  requireArgs(['src', 'dest'], { src, dest }, 'rsync')
  let args = ['rsync', '--archive', '--compress']
  if (asUser) args = [...args, '--rsync-path', wrapCommand(`sudo -u ${asUser} rsync`)]
  if (additionalArgs) args = [...args, ...additionalArgs]
  if (excludes) args = [...args, ...formatExcludes(excludes)]
  if (remoteShell) args = [...args, '--rsh', wrapCommand(remoteShell)]
  args = [...args, src, dest]
  return joinCommandArgs(args)
}
