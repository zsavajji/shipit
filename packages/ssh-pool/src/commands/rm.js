import { joinCommandArgs, requireArgs } from './util.js'
import { formatRawCommand } from './raw.js'

export function formatRmCommand({ asUser, file }) {
  requireArgs(['file'], { file }, 'rm')
  return formatRawCommand({
    asUser,
    command: joinCommandArgs(['rm', file]),
  })
}
