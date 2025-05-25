# Reverting a Renaming Operation

F2 makes it straightforward to undo a renaming operation, ensuring that if
mistakes were made, they can be easily corrected.

A backup file is automatically generated for each renaming task, allowing for a
smooth reversion process. This backup is stored in a platform-specific directory
and can be used to restore the original filenames.

## Backup File Locations

After each renaming operation, a backup file is created in the following
locations depending on the operating system (`/tmp/f2/backups` on Linux).

The backup file is named based on the directory where the operation was
performed, ensuring it is easily identifiable.

## Example Renaming Operation

This command below renames a series of image files with zero-padded numbers:

```bash
f2 -f '.*' -r "unsplash-image-%03d" -e
```

Output:

```text
┌─────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                | STATUS |
| *********************************************************************************** |
| kevin-wong-tt7aK2yV7xo-unsplash.jpg               | unsplash-image-001.jpg | ok     |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | unsplash-image-002.jpg | ok     |
| photo-1434907652076-85f8401482c3.jpg              | unsplash-image-003.jpg | ok     |
| photo-1510272839903-5112a2e44bc6.jpg              | unsplash-image-004.jpg | ok     |
| photo-1521579971123-1192931a1452.jpg              | unsplash-image-005.jpg | ok     |
| samuele-errico-piccarini-t4OxCpKie70-unsplash.jpg | unsplash-image-006.jpg | ok     |
| valentin-salja-VMroCCpP648-unsplash.jpg           | unsplash-image-007.jpg | ok     |
└─────────────────────────────────────────────────────────────────────────────────────┘
```

Once this operation is performed, a backup file is automatically created:

```bash
ls /tmp/f2/backups # On Linux
```

The backup file is an MD5 hash of the absolute path for the current working
directory:

```text
2b24e38a2a6ba0ee9023bc9b4c2efc19.json
```

This JSON backup file contains the mapping of the original filenames to their
renamed versions, which allows the operation to be undone later.

## Reverting the Renaming Operation

To revert the renaming operation, use the `--undo` or `-u` flag. **Note that you
must run the undo command in the same directory where the renaming took place**.

You can perform a dry-run first to preview the changes before executing the
actual reversion:

```bash
f2 -u # dry-run
```

Output:

```text
┌─────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL               | RENAMED                                           | STATUS |
| *********************************************************************************** |
| unsplash-image-007.jpg | valentin-salja-VMroCCpP648-unsplash.jpg           | ok     |
| unsplash-image-006.jpg | samuele-errico-piccarini-t4OxCpKie70-unsplash.jpg | ok     |
| unsplash-image-005.jpg | photo-1521579971123-1192931a1452.jpg              | ok     |
| unsplash-image-004.jpg | photo-1510272839903-5112a2e44bc6.jpg              | ok     |
| unsplash-image-003.jpg | photo-1434907652076-85f8401482c3.jpg              | ok     |
| unsplash-image-002.jpg | nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | ok     |
| unsplash-image-001.jpg | kevin-wong-tt7aK2yV7xo-unsplash.jpg               | ok     |
└─────────────────────────────────────────────────────────────────────────────────────┘
```

To actually revert the renaming operation, use:

```bash
f2 -ux
```

This command will revert the changes and delete the backup file after a
successful reversion.

## Important Notes

- The backup file is tied to the directory where the operation was executed.
  Each time you rename files in that directory, the backup is overwritten.

- In the case of CSV files, the backup file is tied to the directory of the CSV
  file not the current working directory.

- The backup file is automatically deleted after the reversion is successfully
  completed. If there's an error, the backup file will be retained.

- If there are errors during the renaming process, a backup file is still
  created to assist in recovering from the failure. See
  [recovering from failures](/guide/recovering-from-failures) for more details.

- If any of the renamed files are altered by another program between the
  renaming and the reversion, F2 may be unable to revert those files and you
  will likely see a
  [source not found conflict](/guide/conflict-detection.html#_6-source-file-not-found).

- Any directories created during a renaming operation will remain intact after a
  reversion and must be remove manually. Undo does not support `--clean` at this
  time.
