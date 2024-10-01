export const stripDash = (uuid: string) => {
  if (uuid && uuid.length === 36 && uuid.includes('-')) return uuid.replaceAll('-', '').toLowerCase()
  return uuid
}

export const stripDashAll = (uuids: string[]) => {
  const newUuids: string[] = []
  for (let uuid of uuids) {
    if (uuid && uuid.length === 36 && uuid.includes('-')) uuid = uuid.replaceAll('-', '').toLowerCase()
    newUuids.push(uuid)
  }
  return newUuids
}