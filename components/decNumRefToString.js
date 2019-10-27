export default function decNumRefToString(decNumRef) {
  // eslint-disable-next-line
  return decNumRef.replace(/&#(\d+);/ig, function (match, $1, idx, all) {
    return String.fromCharCode($1);
  });
}
