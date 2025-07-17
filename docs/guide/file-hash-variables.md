# Utilizing File Hashes in Renaming

F2 provides the functionality to incorporate file hashes directly into the new
filename during the renaming process.

This can be especially useful for generating unique, fingerprint-based names for
files, which can help prevent conflicts or ensure that file names are based on
their actual content.

To include a file hash in the replacement string, use the pattern
`{hash.<function>}`, where `<function>` represents the desired hash algorithm.
Supported hash functions include:

- `md5`: Produces a 128-bit hash, commonly used for checksums.
- `sha1`: Generates a 160-bit hash.
- `sha256`: Produces a more secure 256-bit hash.
- `sha512`: Generates a 512-bit hash, offering the highest level of uniqueness
  and security among these options.
- `xxh32`: Generates a 32-bit fast hash value, suitable for checksums and quick uniqueness identification. It offers high performance but has a slightly higher collision probability compared to cryptographic hash functions. See [Any known xxHash collision so far? #165](https://github.com/Cyan4973/xxHash/issues/165 ) for details on collision resistance and real-world reports.
- `xxh64`: Produces a 64-bit fast hash value, providing better uniqueness guarantees than `xxh32` and is suitable for scenarios requiring a larger hash space.

## Example

Below is an example that illustrates how you can rename files using their MD5
hash as the new filename:

```bash
f2 -f '^(1|2)\.mkv' -r '{hash.md5}{ext}'
```

In this command:

- `-f '^(1|2)\.mkv'` selects files named `1.mkv` or `2.mkv`.
- `-r '{hash.md5}{ext}'` replaces the filename with its MD5 hash, while keeping
  the original file extension (`.mkv`).

After executing the command, you will see a summary of the changes:

```text
┌──────────────────────────────────────────────────────────┐
| ORIGINAL | RENAMED                              | STATUS |
| ******************************************************** |
| 1.mkv    | d41d8cd98f00b204e9800998ecf8427e.mkv | ok     |
| 2.mkv    | ddd5752b5fe66fd98fb9dcdee48b4473.mkv | ok     |
└──────────────────────────────────────────────────────────┘
```
