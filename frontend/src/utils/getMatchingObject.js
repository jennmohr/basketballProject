export default function getMatchingObject(array, key, value) {
    for (const obj of array) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
          return obj;
        }
      }
    return null;
}