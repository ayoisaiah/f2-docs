# ExifTool Variables

In addition to its built-in variables, F2 integrates seamlessly with
[ExifTool](https://exiftool.org/), a widely-used program for reading and writing
file metadata.

With ExifTool, you gain access to over 25,000 unique metadata tags across a wide
range of file formats, including images, videos, documents, and more.

## Installing and Using ExifTool

Before you can take advantage of ExifTool variables within F2, you need to
ensure that
[ExifTool is installed on your system](https://exiftool.org/install.html). Once
installed, you can easily reference file metadata in F2 by using the
`{xt.<tag>}` variable, where `<tag>` is the desired metadata tag you want to
include in your renaming operation.

To explore the available tags for a specific file, use the following ExifTool
command in your terminal or command line interface:

```bash
exiftool -j </path/to/file>
```

As in:

```bash
exiftool -j 1984-george-orwell.epub
```

This command will output metadata for the file in JSON format, which will look
like this:

```json
[
  {
    "SourceFile": "/mnt/c/Users/gt/MEGA/books/Fiction/1984-george-orwell.epub",
    "ExifToolVersion": 11.88,
    "FileName": "1984-george-orwell.epub",
    "Directory": "/mnt/c/Users/gt/MEGA/books/Fiction",
    "FileSize": "285 kB",
    "FileModifyDate": "2020:03:20 18:32:42+01:00",
    "FileAccessDate": "2021:04:27 09:49:19+01:00",
    "FileInodeChangeDate": "2020:10:21 00:43:56+01:00",
    "FilePermissions": "rwxrwxrwx",
    "FileType": "EPUB",
    "FileTypeExtension": "epub",
    "MIMEType": "application/epub+zip",
    "Creator": "George Orwell",
    "Date": 1948,
    "Title": "1984 George Orwell",
    "Language": "en",
    "Subject": ["1984", "George Orwell", "Dystopian", "Totalitarianism"]
  }
]
```

In this output, each entry represents a metadata tag, such as `FileName`,
`FileSize`, `Creator`, `Title`, and `Date`. These tags can then be referenced in
your F2 renaming operations with `{xt.FileSize}`, `{xt.Creator}`, etc.

## Example Usage of ExifTool Variables

Let's walk through an example where you use ExifTool variables to rename a
collection of books based on their metadata.

If you wanted to rename your the files using the format:

```text
<Title> - <Author>.epub
```

You would write the following F2 command:

```bash
f2 -r '{xt.Title} - {xt.Creator}{ext}'
```

This command instructs F2 to replace the filename with the `Title` and `Creator`
metadata tags for each file, followed by the file extension (`{ext}`). The
result will be a standardized and clean naming convention for your files. Here's
what the output would look like:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                  | RENAMED                                            | STATUS |
| ******************************************************************************************************* |
| 1984-george-orwell.epub                   | 1984 George Orwell - George Orwell.epub            | ok     |
| bunyan-pilgrim-s-progress.epub            | The Pilgrim's Progress - John Bunyan.epub          | ok     |
| Dracula.epub                              | Dracula - Bram Stoker.epub                         | ok     |
| Emma - Austen Jane.epub                   | Emma - Jane Austen.epub                            | ok     |
| Friend Island.epub                        | Friend Island - Francis Stevens.epub               | ok     |
| hill-think-and-grow-rich.epub             | Think and Grow Rich - Napoleon Hill.epub           | ok     |
| Leviathan by Thomas Hobbes.epub           | Leviathan - Thomas Hobbes.epub                     | ok     |
| The Lost World by Arthur Conan Doyle.epub | The Lost World - Arthur Conan Doyle.epub           | ok     |
| The Mysteries of Udolpho.epub             | The Mysteries of Udolpho - Ann Ward Radcliffe.epub | ok     |
| The Night Land.epub                       | The Night Land - William Hope Hodgson.epub         | ok     |
| The Parasite.epub                         | The Parasite: A Story - Arthur Conan Doyle.epub    | ok     |
| The Raven.epub                            | The Raven - Edgar Allan Poe.epub                   | ok     |
| The Trial.epub                            | The Trial - Franz Kafka.epub                       | ok     |
| the-shunned-house.epub                    | The Shunned House - H. P. Lovecraft.epub           | ok     |
| Ulysses by James Joyce.epub               | Ulysses - James Joyce.epub                         | ok     |
| War and Peace by Graf Leo Tolstoy.epub    | War and Peace - Graf Leo Tolstoy.epub              | ok     |
└─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## ExifTool Options

You can customize the output of ExifTool variables through `--exiftool-opts`.
The following options are supported:

```text
--api
--charset
--coordFormat
--dateFormat
--extractEmbedded
```

You need to see the
[ExifTool docs](https://exiftool.org/exiftool_pod.html#Option-Overview) to learn
what each option does.

Here's how to use it:

```bash
f2 -r '{xt.GPSDateTime}' --exiftool-opts '--dateFormat %Y-%m-%d'
```

Output:

```text
*——————————*————————————*————————*
| ORIGINAL |  RENAMED   | STATUS |
*——————————*————————————*————————*
| gps.jpg  | 2008-10-23 | ok     |
*——————————*————————————*————————*
```

Without the `--exiftool-opts`, the output will be:

```bash
f2 -r '{xt.GPSDateTime}' gps.jpg
```

Output:

```text
*——————————*—————————————————————————*————————*
| ORIGINAL |         RENAMED         | STATUS |
*——————————*—————————————————————————*————————*
| gps.jpg  | 2008:10:23 14:27:07.24Z | ok     |
*——————————*—————————————————————————*————————*
```

## Special Considerations

While using ExifTool variables in your renaming patterns, be aware that certain
characters, like forward slashes (`/)` or backward slashes (`\`) in the new
filename triggers the creation of a directory.

F2 automatically replaces these characters with an underscore (`_`) to avoid
unexpected results. For example, if a tag value contains `application/epub+zip`,
it will be transformed into `application_epub+zip` in the output.
