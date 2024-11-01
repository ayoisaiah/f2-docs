# Regular Expressions

F2 uses regular expressions (regex) by default to find patterns in file names
that need to be replaced. While F2 does offer a string-literal mode for simpler
find-and-replace operations, regex mode is the default and provides more
flexibility. F2's regex engine follows the RE2 syntax standards, which are also
used in languages like Python, C, and Perl.

Using regular expressions, you can match parts of a string one or more times (or
not at all). By default, F2 matches all occurrences, but you can limit this
using the `-l/--limit` option.

## Basic Regex Examples

| **Regex**      | **Explanation**                                                        |
| -------------- | ---------------------------------------------------------------------- |
| `.*`           | Matches all the text in the file name                                  |
| `^log`         | Matches text that starts with log                                      |
| `jpg$`         | Matches files that end with jpg                                        |
| `^\d+.*png$`   | Matches files that start with a number and ends with png               |
| `[^a-zA-Z0-9]` | Matches any character in the filename that is not a letter or a number |
| `\((.*?)\)`    | Matches a pair of parenthesis and everything inside                    |

## Capture Variables in F2

F2 supports capture variables, which allow you to extract parts of the file name
and use them in the replacement string. Capture variables are particularly
useful for reformatting file names or dynamically inserting matched text into
new file names.

| **Regex**                  | **Replacement** | **Explanation**                                                                                 |
| -------------------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `(.*).png`                 | `img_$1.png`    | `$1` will be replaced with whatever was matched by `.*`. E.g: `fun.png` becomes `img_fun.png`   |
| `(.*).png`                 | `${1}_img.png`  | `${1}` will be replaced with whatever was matched by `.*`. E.g: `fun.png` becomes `fun_img.png` |
| `(\d\d\d\d)-(\d\d)-(\d\d)` | `$3-$2-$1`      | Swap the numbers in the file name. E.g: `2020-08-07` becomes `07-08-2020`                       |

### Notes on Appending to a Capture Variable

In Go, capture variables are denoted by `$name` or `${name}`, where name is a
sequence of letters, digits, or underscores.

When you use something like `$1`, it refers to the submatch at index 1. When you
use `$1_`, it tries to find a variable named `1_` that was captured like this
`(?P<1_>...)`. If this variable does not exist, you will see an empty string.

To retain the use of indexes (`$1`) while appending letters, other digits, or
underscores to the captured variable, you need to use the full syntax: `${1}_`.

For example:

- `$1_` would try to find a capture group named `1_`, which would return an
  empty string if it doesn't exist.
- `${1}_` properly appends an underscore to the value captured by the `1` group.

Learn more by checking out the
[Go Expand documentation](https://pkg.go.dev/regexp#Regexp.Expand).

## Resources

If you're new to regular expressions or want to deepen your understanding, the
following resources are highly recommended:

- [RegexOne](https://regexone.com/): A tutorial for beginners.
- [RE2 Syntax Documentation](https://github.com/google/re2/wiki/Syntax):
  Detailed information on the regex syntax supported by F2.
- [Regex101](https://regex101.com/): A tool for practicing regular expressions.
  Be sure to select the "Golang" flavor from the sidebar when using it for F2.
