export const stripDash = (uuid: string) => {
  return uuid.replaceAll('-', '').toLowerCase()
}

export const stripDashAll = (uuids: string[]) => {
  const newUuids = []
  for (const uuid of uuids) {
    newUuids.push(uuid.replaceAll('-', '').toLowerCase())
  }
  return newUuids
}