export function capitalise(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitaliseNewSentence(string) {
  return string.charAt(1).toUpperCase() + string.slice(2);
}

export function punctuate(string) {
  // Use Regex to remove the leading blank space
  string = string.replace(/(?:\s+|^)full stop(?:\s+|$)/g, ".");
  string = string.replace(/(?:\s+|^)comma(?:\s+|$)/g, ",");
  string = string.replace(/(?:\s+|^)question mark(?:\s+|$)/g, "?");
  string = string.replace(/(?:\s+|^)exclamation mark(?:\s+|$)/g, "!");
  string = string.replace(/(?:\s+|^)colon(?:\s+|$)/g, ":");
  string = string.replace(/(?:\s+|^)semicolon(?:\s+|$)/g, ";");
  string = string.replace("new paragraph", "\n\n");
  string = string.replace("hyphen", "-");

  return string;
}
