import { joinCommandArgs, requireArgs } from './util.js'
import { formatRawCommand } from './raw.js'

export function formatMkdirCommand({ asUser, folder }) {
  requireArgs(['folder'], { folder }, 'mkdir')
  return formatRawCommand({
    asUser,
    command: joinCommandArgs(['mkdir', '-p', folder]),
  })
}
