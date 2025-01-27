# Resolving Renaming Conflicts

F2 includes mechanisms to prevent and resolve common renaming issues by
analyzing potential target destinations for conflicts and errors.

This ensures that renaming operations avoid unintended consequences like
overwriting files or creating invalid filenames.

<!-- prettier-ignore-start -->
::: tip
While F2 provides several mechanisms to prevent data loss while renaming, I
suggest you back up your files regardless.
:::
<!-- prettier-ignore-end -->

## Common Renaming Problems

F2 automatically detects the following issues during a renaming operation:

- **Forbidden Characters**: When the new filename contains characters that are
  not allowed by the operating system.
- **Name Collision**: When a file is renamed to the name of an already existing
  file.
- **Maximum Filename Length**: When the new filename exceeds the maximum allowed
  length.
- **Trailing Periods**: On Windows, file or directory names cannot end with a
  period.
- **Empty Filename**: When the target filename is empty.
- **Overwriting New Path**: When two or more files are renamed to the same name.

If any of these issues are detected, a summary of problematic files is provided
for user review. The renaming operation will not be carried out until all
conflicts are addressed.

## Examples of Common Issues

### 1. Renaming Two Files to the Same Path

When two files are renamed to the same destination, it results in a conflict:

```bash
f2 -f 'a|b' -r 'c'
```

Output:

```text
*——————————*—————————*——————————————————————*
| ORIGINAL | RENAMED |        STATUS        |
*——————————*—————————*——————————————————————*
| a.txt    | c.txt   | ok                   |
| b.txt    | c.txt   | overwriting new path |
*——————————*—————————*——————————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

### 2. Renaming to an Empty Filename

If no replacement is provided or the result of the renaming is empty, an error
is raised:

```bash
f2 -f "a.txt"
```

Output:

```text
*——————————*—————————*————————————————*
| ORIGINAL | RENAMED |     STATUS     |
*——————————*—————————*————————————————*
| a.txt    |         | empty filename |
*——————————*—————————*————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

## Automatically Fixing Conflicts

To help you save time when dealing with conflicts, F2 provides the
`--fix-conflicts/-F` flag, which can be used to resolve all conflicts
automatically.

Here's how F2 resolves each type of conflict:

### 1. Existing Target Path

When attempting to rename a file to a path that already exists:

```bash
f2 -f 'a' -r 'b'
```

Output:

```text
*——————————*—————————*———————————————*
| ORIGINAL | RENAMED |    STATUS     |
*——————————*—————————*———————————————*
| a.txt    | b.txt   | target exists |
*——————————*—————————*———————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

This conflict is resolved by appending a numerical suffix to the new name:

```bash
f2 -f "a" -r "b" -F
```

Output:

```text
*——————————*——————————*————————*
| ORIGINAL | RENAMED  | STATUS |
*——————————*——————————*————————*
| a.txt    | b(1).txt | ok     |
*——————————*——————————*————————*
```

You can also use the
[--fix-conflicts-pattern](#conflict-resolution-with-a-custom-pattern) flag to
specify a custom pattern when fixing such conflicts.

### 2. Conflicting Rename Paths (Multiple Files to Same Target)

If multiple files are renamed to the same target:

```bash
f2 -f 'a|b' -r 'c'
```

Output:

```text
*——————————*—————————*——————————————————————*
| ORIGINAL | RENAMED |        STATUS        |
*——————————*—————————*——————————————————————*
| a.txt    | c.txt   | ok                   |
| b.txt    | c.txt   | overwriting new path |
*——————————*—————————*——————————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

This conflict is resolved by appending a numerical suffix to differentiate the
filenames:

```bash
f2 -f 'a|b' -r 'c' -F
```

Output:

```text
*——————————*——————————*————————*
| ORIGINAL | RENAMED  | STATUS |
*——————————*——————————*————————*
| a.txt    | c.txt    | ok     |
| b.txt    | c(1).txt | ok     |
*——————————*——————————*————————*
```

### 3. Empty Filename

When a renaming operation results in an empty filename:

```bash
f2 -f 'a.txt'
```

Output:

```text
*——————————*—————————*————————————————*
| ORIGINAL | RENAMED |     STATUS     |
*——————————*—————————*————————————————*
| a.txt    |         | empty filename |
*——————————*—————————*————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

F2 will leave the filename unchanged to resolve this conflict:

```bash
f2 -f 'a.txt' -F
```

Output:

```text
*——————————*—————————*———————————*
| ORIGINAL | RENAMED |  STATUS   |
*——————————*—————————*———————————*
| a.txt    | a.txt   | unchanged |
*——————————*—————————*———————————*
```

### 4. Forbidden Characters in Target Path

If the target path contains
[characters that are invalid](/reference/os-differences) for the current
operating system:

```bash
f2 -f 'a' -r 'c:' # : is invalid in macOS
```

Output:

```text
*——————————*—————————*——————————————————————————————*
| ORIGINAL | RENAMED |            STATUS            |
*——————————*—————————*——————————————————————————————*
| a.txt    | c:.txt  | forbidden characters present |
*——————————*—————————*——————————————————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

F2 resolves this by removing the offending characters:

```bash
f2 -f 'a' -r 'c:' -F
```

Output:

```text
*——————————*—————————*————————*
| ORIGINAL | RENAMED | STATUS |
*——————————*—————————*————————*
| a.txt    | c.txt   | ok     |
*——————————*—————————*————————*
```

### 5. Trailing Periods (Windows Only)

Windows does not allow path names to end with periods. This issue is detected
and flagged:

```bash
f2 -f 'a' -r 'new../a'
```

Output:

```text
*——————————*—————————————*——————————————————————————*
| ORIGINAL |   RENAMED   |          STATUS          |
*——————————*—————————————*——————————————————————————*
| a.txt    | new../a.txt | trailing periods present |
*——————————*—————————————*——————————————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

F2 automatically removes trailing periods to resolve this:

```bash
f2 -f 'a' -r 'new../a' -F
```

Output:

```text
*——————————*———————————*————————*
| ORIGINAL |  RENAMED  | STATUS |
*——————————*———————————*————————*
| a.txt    | new/a.txt | ok     |
*——————————*———————————*————————*
```

### 6. Source File Not Found

In rare cases when the file to be renamed has been deleted or moved (such as
when undoing a renaming operation), you'll also get a conflict:

```bash
f2 -u
```

Output:

```text
*——————————*—————————*——————————————————*
| ORIGINAL | RENAMED |      STATUS      |
*——————————*—————————*——————————————————*
| d.txt    | c.txt   | source not found |
*——————————*—————————*——————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```

In such cases, F2 will mark the file as `ignored`:

```bash
f2 -u -F
```

Output:

```text
*——————————*—————————*—————————*
| ORIGINAL | RENAMED | STATUS  |
*——————————*—————————*—————————*
| d.txt    | c.txt   | ignored |
*——————————*—————————*—————————*
```

### 7. Maximum Allowed Length Exceeded

If the new filename exceeds the maximum length allowed by the operating system
(255 characters for Windows, 255 bytes for Unix), F2 will fix it by trimming
characters from the end of the filename until it meets the required length.

## Conflict Resolution with a Custom Pattern

The `--fix-conflicts-pattern` flag allows you to specify a custom pattern for
renaming files when naming conflicts occur during the renaming process.

The custom pattern must be a valid Go format string, and it should include a
single integer verb placeholder (`%d`), which represents the conflict index.
This index will be automatically incremented for each conflicting file.

If no custom pattern is provided with the `-F/--fix-conflicts` flag, F2 will use
the default pattern `(%d)` which generates filenames like:

```text
file(1).txt, file(2).txt, file(3).txt, etc.
```

However, if you provide a custom pattern with:

```bash
f2 ... -F --fix-conflicts-pattern "_%02d"
```

The conflicts will be resolved with a two-digit zero-padded suffix, such as:

```text
file_01.txt, file_02.txt, file_03.txt, etc.
```

The custom pattern can be adjusted to fit various formats depending on your
requirements. Some other examples include:

- `-%d`: Adds a simple dash followed by the conflict index (`file-1.txt`,
  `file-2.txt`).
- `_v%d`: Appends a version-style suffix (`file_v1.txt`, `file_v2.txt`).
- `-%03d`: Adds a three-digit conflict index with zero-padding (`file-001.txt`,
  `file-002.txt`).

By customizing the conflict pattern, you can ensure that files are renamed
consistently in a way that fits your naming conventions and preferences.

## Overwriting Existing Files

To permit overwriting of existing files, use the `--allow-overwrites` option. In
dry-run mode, you’ll see a preview of which files will be overwritten:

```bash
f2 -f 'a' -r 'c' --allow-overwrites
```

Output:

```text
*——————————*—————————*—————————————*
| ORIGINAL | RENAMED |   STATUS    |
*——————————*—————————*—————————————*
| a.txt    | c.txt   | overwriting |
*——————————*—————————*—————————————*
```

If you confirm the changes, `c.txt` will be overwritten, and using `--undo` will
not recover any files that have been overwritten.

Keep in mind that this option only affects the
[existing target path conflict](#1-existing-target-path). It does not allow
multiple files to be renamed to the same name:

```bash
f2 -f 'a|b' -r 'c' --allow-overwrites
```

Output:

```text
*——————————*—————————*——————————————————————*
| ORIGINAL | RENAMED |        STATUS        |
*——————————*—————————*——————————————————————*
| a.txt    | c.txt   | overwriting          |
| b.txt    | c.txt   | overwriting new path |
*——————————*—————————*——————————————————————*
conflict: resolve manually or use -F/--fix-conflicts
```
