export function format(value) {
  const type = typeof value;
  switch (type) {
    case "string":
      return `'${value}'`;
    case "number":
      return value;
    case "boolean":
      return value ? 1 : 0;
    case "undefined":
      return 'NULL'
    case "object":
      if(!value) return 'NULL';
    default:
      throw `SQL formatting error: Can't format ${value}`;
  }
}
