export function alarmLevel(v: number) {
  let arr = ['低', '中', '高', '紧急'] // v [0, 1, 2, 3]
  if (v !== undefined && v !== null && Number(v).toString() !== 'NaN') {
    v = Number(v)
    return arr[v]
  }
  return v
}

export function alarmLevelClass(v: number) {
  let arr = ['f-light', 'f-middle', 'f-warning', 'f-danger'] // v [0, 1, 2, 3]
  if (v !== undefined && v !== null && Number(v).toString() !== 'NaN') {
    v = Number(v)
    return arr[v]
  }
  return v + ''
}