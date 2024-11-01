# Recovering from Renaming Failures

[F2's conflict detection](/guide/conflict-detection) helps prevent most common
renaming issues. However, there are still some cases where renaming a file or
directory may fail due to external factors. These include:

- The source file is being used by another program.
- The source file has been moved or modified by another program.
- You do not have the necessary permissions to rename the file.

When a renaming operation fails for any file, **F2 does not halt the entire
process**. Instead, it skips to the next file in the list.

At the end of the renaming process, it will display a summary of the files that
failed to be renamed along with the reasons why.

## Example Renaming Operation with Failures

In the following example, we will attempt to rename several JPEG files in a
directory. Some of these files will be made immutable using the `chattr` command
on Linux, causing the renaming operation to fail for those files.

Here's the directory structure before renaming:

```text
├── kevin-wong-tt7aK2yV7xo-unsplash.jpg
├── nathan-anderson-7TGVEgcTKlY-unsplash.jpg
├── photo-1434907652076-85f8401482c3.jpg
├── photo-1510272839903-5112a2e44bc6.jpg
├── photo-1521579971123-1192931a1452.jpg
├── samuele-errico-piccarini-t4OxCpKie70-unsplash.jpg
└── valentin-salja-VMroCCpP648-unsplash.jpg
```

Use the following command to make some of the files immutable:

```bash
sudo chattr +i kevin-wong-tt7aK2yV7xo-unsplash.jpg nathan-anderson-7TGVEgcTKlY-unsplash.jpg valentin-salja-VMroCCpP648-unsplash.jpg
```

Now, attempt to rename the files using F2:

```bash
f2 -r "unsplash-image-%03d" -ex
```

Output:

```text
error: rename kevin-wong-tt7aK2yV7xo-unsplash.jpg unsplash-image-001.jpg: operation not permitted
error: rename nathan-anderson-7TGVEgcTKlY-unsplash.jpg unsplash-image-002.jpg: operation not permitted
error: rename valentin-salja-VMroCCpP648-unsplash.jpg unsplash-image-007.jpg: operation not permitted
error: some files could not be renamed
```

In this output, the renaming operation was successful for some files but failed
for the immutable files.

Here's the current directory structure after renaming

```text
├── kevin-wong-tt7aK2yV7xo-unsplash.jpg
├── nathan-anderson-7TGVEgcTKlY-unsplash.jpg
├── unsplash-image-003.jpg
├── unsplash-image-004.jpg
├── unsplash-image-005.jpg
├── unsplash-image-006.jpg
└── valentin-salja-VMroCCpP648-unsplash.jpg
```

The immutable files were not renamed, but the rest were successfully renamed as
per the command.

## Reverting the Changes

If you wish to revert the changes that were successful, you can use the
`--undo/-u` flag. First, perform a dry-run to preview the changes, and then
execute the actual reversion.

```bash
f2 -u # dry-run
```

```text
f2 -ux # revert the changes
```

After running the revert command, all files will be restored to their original
state, allowing you to fix the issues (e.g., removing the immutable attribute)
before attempting to rename the files again.

[You can learn more about how undo works here](/guide/undoing-mistakes).
