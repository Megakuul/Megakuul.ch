/** Highlights the Syntax from a raw string with HTML Styles
 *
 * @param input Input text
 * @param keywords Config Map where key=keyword and value=htmlstyle
 * @param bracketstyle CSS Style of the Brackets
 * @param identifierstyle Default CSS Style of identifiers (if they are not in the Config Map)
 * @param numstyle CSS Style for Ints or Floats
 * @returns String in HTML Format
 */
export const Highlight = (
  input: string,
  keywords: Map<string, string>,
  stringstyle: string = 'color: rgb(99, 53, 16, 0.8);',
  commentstyle: string = 'color: rgb(115, 117, 125, 0.8);',
  bracketstyle: string = 'color: rgb(160, 118, 249, 0.7);',
  identifierstyle: string = 'color: rgba(150, 140, 140, 0.7);',
  numstyle: string = 'color: rgba(173, 216, 230, 0.6);',
) => {
  let output: string = '';
  let identifier: string = '';

  function isalnum(c: string): boolean {
    return /\w/.test(c) && c !== ' ' && c !== '\n' && c !== '\r' && c !== '\t';
  }

  function isnum(ident: string): boolean {
    return /^[0-9]+$/.test(ident);
  }

  for (let i = 0; i < input.length; i++) {
    let c: string = input[i];

    // Handle Strings
    if (c === '"') {
      let nextChar: string;
      identifier = c;
      do {
        i++;
        c = input[i];
        identifier += c;
        nextChar = c;
      } while (nextChar && nextChar !== '"');

      output += `<span style="${stringstyle}">${identifier}</span>`;
      continue;
    }

    if (c === '/') {
      if (input[i + 1] === '/') {
        identifier = c;
        do {
          i++;
          c = input[i];
          identifier += c;
        } while (c !== '\n');
        output += `<span style="${commentstyle}">${identifier}</span>`;
        continue;
      }
    }

    // Handle Alnum Chars
    if (isalnum(c)) {
      identifier = '';
      do {
        identifier += c;
        i++;
        c = input[i];
      } while (isalnum(c));
      // Bounce back the last char
      i--;

      if (keywords.has(identifier)) {
        output += `<span style="${keywords.get(identifier)}">${identifier}</span>`;
        continue;
      }
      if (isnum(identifier)) {
        output += `<span style="${numstyle}">${identifier}</span>`;
        continue;
      }
      output += `<span style="${identifierstyle}">${identifier}</span>`;
      continue;
    }

    // Handle Brackets (and eventually some other chars later)
    switch (c) {
      case '{':
      case '}':
      case '(':
      case ')':
      case '[':
      case ']':
        output += `<span style="${bracketstyle}">${c}</span>`;
        break;
      default:
        // Dont change all the other characters
        output += c;
        break;
    }
    continue;
  }

  return output;
};

