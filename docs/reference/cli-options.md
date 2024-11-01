# Command-Line Options

```text
f2 v1.10.0
Ayooluwa Isaiah <ayo@freshman.tech>

f2 bulk renames files and directories, matching files against a specified
pattern. It employs safety checks to prevent accidental overwrites and
offers several options for fine-grained control over the renaming process.

Project repository: https://github.com/ayoisaiah/f2

USAGE
  f2 FLAGS [OPTIONS] [PATHS TO FILES AND DIRECTORIES...]
  command | f2 FLAGS [OPTIONS]

POSITIONAL ARGUMENTS
  [PATHS TO FILES AND DIRECTORIES...]
    Optionally provide one or more files and directories to search for matches.
    If omitted, it searches the current directory alone. Also, note that
    directories are not searched recursively unless --recursive/-R is used.

FLAGS
  --csv
    Load a CSV file, and rename according to its contents.

  -f, --find
    A regular expression pattern used for matching files and directories.
    It accepts the syntax defined by the RE2 standard and defaults to .*
    if omitted which matches the entire file/directory name.

    When -s/--string-mode is used, this pattern is treated as a literal string.

  -r, --replace
    The replacement string which replaces each match in the file name.
    It supports capture variables, built-in variables, and exiftool variables.
    If omitted, it defaults to an empty string.

  -u, --undo
    Undo the last renaming operation performed in the current working directory.

OPTIONS
  --allow-overwrites
    Allows the renaming operation to overwrite existing files.
    Caution: Using this option can lead to unrecoverable data loss.

  -E, --exclude
    Excludes files and directories that match the provided regular expression.
    This flag can be repeated to specify multiple exclude patterns.

    Example:
      -E 'json' -E 'yml' (filters out JSON and YAML files)
      -E 'json|yaml' (equivalent to the above)

    Note:
      This does not prevent recursing into matching directories (use
      --exclude-dir instead).

  --exclude-dir
    Prevents F2 from recursing into directories that match the provided regular
    expression pattern.

  --exiftool-opts
    Provides options to customize Exiftool's output when using ExifTool
    variables in replacement patterns.

    Supported options:
      --api
      --charset
      --coordFormat
      --dateFormat
      --extractEmbedded

    Example:
      $ f2 -r '{xt.GPSDateTime}' --exiftool-opts '--dateFormat %Y-%m-%d'

  -x, --exec
    Executes the renaming operation and applies the changes to the filesystem.

  -F, --fix-conflicts
    Automatically fixes renaming conflicts using predefined rules.

  --fix-conflicts-pattern
    Specifies a custom pattern for renaming files when conflicts occur.
    The pattern should be a valid Go format string containing a single '%d'
    placeholder for the conflict index.

    Example: '_%02d'  (generates _01, _02, etc.)

    If not specified, the default pattern '(%d)' is used.

  -H, --hidden
    Includes hidden files and directories in the search and renaming process.

    On Linux and macOS, hidden files are those that start with a dot character.
    On Windows, only files with the 'hidden' attribute are considered hidden.

    To match hidden directories as well, combine this with the -d/--include-dir
    flag.

  -d, --include-dir
    Includes matching directories in the renaming operation (they are excluded
    by default).

  -i, --ignore-case
    Ignores case sensitivity when searching for matches.

  -e, --ignore-ext
    Ignores the file extension when searching for matches.

  --json
    Produces JSON output, except for error messages which are sent to the
    standard error.

  -m, --max-depth
    Limits the depth of recursive search. Set to 0 (default) for no limit.

  --no-color
    Disables colored output.

  -D, --only-dir
    Renames only directories, not files (implies -d/--include-dir).

  -p, --pair
    Enable pair renaming to rename files with the same name (but different
    extensions) in the same directory to the same new name. In pair mode,
    file extensions are ignored and --sort/--sortr has no effect.

    Example:
      Before: DSC08533.ARW DSC08533.JPG DSC08534.ARW DSC08534.JPG

      $ f2 -r "Photo_{%03d}" --pair -x

      After: Photo_001.ARW Photo_001.JPG Photo_002.ARW Photo_002.JPG

  --pair-order
    Order the paired files according to their extension. This helps you control
    the file to be renamed first, and whose metadata should be extracted when
    using variables.

    Example:
      --pair-order 'dng,jpg' # rename dng files before jpg
      --pair-order 'xmp,arw' # rename xmp files before arw

  --quiet
    Don't print anything to stdout. If no matches are found, f2 will exit with
    an error code instead of the normal success code without this flag.
    Errors will continue to be written to stderr.

  -R, --recursive
    Recursively traverses directories when searching for matches.

  -l, --replace-limit
    Limits the number of replacements made on each matched file. 0 (default)
    means replace all matches. Negative values replace from the end of the
    filename.

  --reset-index-per-dir
    Resets the auto-incrementing index when entering a new directory during a
    recursive operation.

  --sort
    Sorts matches in ascending order based on the provided criteria.

    Allowed values:
      * 'default'  : Lexicographical order.
      * 'size'     : Sort by file size.
      * 'natural'  : Sort according to natural order.
      * 'mtime'    : Sort by file last modified time.
      * 'btime'    : Sort by file creation time.
      * 'atime'    : Sort by file last access time.
      * 'ctime'    : Sort by file metadata last change time.

  --sortr
    Accepts the same values as --sort but sorts matches in descending order.

  --sort-per-dir
    Ensures sorting is performed separately within each directory rather than
    globally.

  -s, --string-mode
    Treats the search pattern (specified by -f/--find) as a literal string
    instead of a regular expression.

  -V, --verbose
    Enables verbose output during the renaming operation.

ENVIRONMENTAL VARIABLES
  F2_DEFAULT_OPTS
    Override the default options according to your preferences. For example,
    you can enable execute mode and ignore file extensions by default:

    export F2_DEFAULT_OPTS=--exec --ignore-ext

  F2_NO_COLOR, NO_COLOR
    Set to any value to disable coloured output.

  F2_DEBUG
    Enable debug mode.

LEARN MORE
  Read the manual at https://f2.freshman.tech
```
