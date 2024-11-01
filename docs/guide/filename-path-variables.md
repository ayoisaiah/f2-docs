# Filename and Path Variables

Filename and path variables are essential when you want to reference elements of
the original file's location during a renaming operation. These variables allow
you to extract the filename, directory structure, and extension of each file or
directory being processed.

## 1. The Original Filename — `{f}`

`{f}` refers to the original filename without its extension. This variable
allows you to retain or modify the base name of the file while excluding the
file type (extension).

**Example**: For a file named `document.txt`, `{f}` would output `document`.

## 2. The Original File Extension — `{ext}`

`{ext}` denotes the file extension, including the period. It is useful when you
want to retain or alter the file type as part of the renaming operation. You can
also use `{2ext}` to includes multiple levels in the extension (useful for files
with compound extensions, like archives).

**Examples**:

- For `document.txt`, `{ext}` would output `.txt`.
- For `document.tar.gz`, `{2ext}` would output `.tar.gz`.

## 3. A Parent Directory — `{p}`

`{p}` represents a directory within the file's path. By default, `{p}` refers to
the immediate parent directory of the file. You can prefix `{p}` with a number
to access higher-level directories in the path.

**Example**: If the file path is `/home/user/projects/docs/file.txt`, `{p}` (or
`{1p})` would give `docs`, `{2p}` would give `projects`, and so on.

## Special Considerations for Directories

Since directories do not have file extensions, `{f}` will correspond to the full
directory name, and `{ext}` will always be an empty string, regardless of
whether the directory name contains periods.

**Example**: For a directory named `backup.folder`, `{f}` would return
`backup.folder`, and `{ext}` would return an empty string.

## Usage Examples

### 1. Basic Renaming

To rename files by combining the parent directory, filename, and extension:

```bash
f2 -r "{p}_{f}{ext}"
```

This command will rename a file located at `/home/user/docs/document.txt` to:

```text
docs_document.txt
```

### 2. Accessing Higher-Level Directories

If you want to incorporate the name of a directory two levels up in the file's
path:

```bash
f2 -r "{2p}_{f}{ext}"
```

For a file located at `/home/user/projects/docs/file.txt`, this would produce:

```text
projects_file.txt
```

### 3. Customizing File Extensions

You can change the file extension while preserving the original filename:

```bash
f2 -r "{f}.bak"
```

For `document.txt`, the output would be:

```text
document.bak
```
