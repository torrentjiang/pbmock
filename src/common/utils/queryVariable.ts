export function getQueryVariable(variable: string) {
  const flg = location.href.indexOf('?');
  if (flg < 0) {
    return null;
  } else {
    const query = location.href.slice(flg + 1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return null;
  }
}
