export function addStyle(id, key, value) {
  document.getElementById(id).style[key] = value;
}

//[{key, value}]
export function addStyleArray(id, styles) {
  styles.forEach((x) => (document.getElementById(id).style[x.key] = x.value));
}
