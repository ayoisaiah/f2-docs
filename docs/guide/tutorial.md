# F2 Tutorial

Below is a detailed guide to using F2 for a variety of renaming tasks.

## Important Note for Windows Users

- Always use double quotes (") when passing arguments to any flag in Command
  Prompt (CMD).
- PowerShell users may use single or double quotes.

## General Usage

```text
f2 FLAGS [OPTIONS] [PATHS TO FILES OR DIRECTORIES...]
```

### Things to Note

- You must provide one of the `-f`, `-u`, `-r`, or `--csv` flags to perform an
  operation.
- If no paths are provided, F2 will default to searching the current directory.
- You can provide multiple paths, which can be absolute or relative, to specify
  files or directories.

```bash
f2 -f 'a' -r 'b' path/to/dir path/to/file.txt
```

- Hidden files are excluded by default unless you specify `-H` to include them.
- F2 runs in dry-run mode by default. You must use `-x/--exec` to apply the
  changes.

## Basic Find and Replace

```bash
f2 -f '[ ]{1,}' -r '_'
```

Output:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                                           | STATUS |
| ************************************************************************************************************** |
| Screenshot from 2022-04-12 14:37:35.png           | Screenshot_from_2022-04-12_14:37:35.png           | ok     |
| Screenshot from 2022-04-12 15:58:55.png           | Screenshot_from_2022-04-12_15:58:55.png           | ok     |
| Screenshot from 2022-06-03 11:29:16.png           | Screenshot_from_2022-06-03_11:29:16.png           | ok     |
| Screenshot from 2022-09-26 21:19:15.png           | Screenshot_from_2022-09-26_21:19:15.png           | ok     |
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Arguments to `-f` are treated as
[regular expressions](https://github.com/ayoisaiah/f2/wiki/Regular-expressions)
by default. When you need to rename files containing regex special characters
(such as . + ? ^ { } and others), you may escape the characters by prefixing
them with a backslash:

```bash
f2 -f '\(2021\)' -r '[2022]'
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                             | RENAMED                              | STATUS |
| ************************************************************************************ |
| No Pressure (2021) S01.E01.2160p.mp4 | No Pressure [2022] S01.E01.2160p.mp4 | ok     |
| No Pressure (2021) S01.E02.2160p.mp4 | No Pressure [2022] S01.E02.2160p.mp4 | ok     |
| No Pressure (2021) S01.E03.2160p.mp4 | No Pressure [2022] S01.E03.2160p.mp4 | ok     |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

Or treat the search string as a literal using `-s`:

```bash
f2 -f '(2021)' -r '[2022]' -s
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                             | RENAMED                              | STATUS |
| ************************************************************************************ |
| No Pressure (2021) S01.E01.2160p.mp4 | No Pressure [2022] S01.E01.2160p.mp4 | ok     |
| No Pressure (2021) S01.E02.2160p.mp4 | No Pressure [2022] S01.E02.2160p.mp4 | ok     |
| No Pressure (2021) S01.E03.2160p.mp4 | No Pressure [2022] S01.E03.2160p.mp4 | ok     |
└──────────────────────────────────────────────────────────────────────────────────────┘
```

```bash
f2 -f '(2021)' -r '[2022]' -s
```

## Limiting the Number of Replacements

By default, F2 replaces all matches in a filename. However, there are times when
you might want to limit the number of replacements, and for this, the
`-l/--replace-limit` option can be used.

To replace only the first occurrence of a match in each filename, use:

```bash
f2 -f 'abc' -r '123' -l 1
```

Output:

```text
┌────────────────────────────────────────────┐
| ORIGINAL        | RENAMED         | STATUS |
| ****************************************** |
| abc.txt         | 123.txt         | ok     |
| abc_abc.txt     | 123_abc.txt     | ok     |
| abc_abc_abc.txt | 123_abc_abc.txt | ok     |
└────────────────────────────────────────────┘
```

In this example, only one occurrence of `abc` is replaced in each filename.

You can also replace from the end of the file with a negative number:

```bash
f2 -f 'abc' -r '123' -l -1
```

Output:

```text
┌────────────────────────────────────────────┐
| ORIGINAL        | RENAMED         | STATUS |
| ****************************************** |
| abc.txt         | 123.txt         | ok     |
| abc_abc.txt     | 123_abc.txt     | ok     |
| abc_abc_abc.txt | abc_abc_123.txt | ok     |
└────────────────────────────────────────────┘
```

## Renaming Files Recursively

To rename files recursively in a directory and all its subdirectories, use the
`-R/--recursive` option. This allows F2 to search through all levels of
directories without imposing a depth limit unless specified otherwise.

Here's an example that replaces all instances of `js` to `ts` in the current
directory and all sub directories.

```bash
f2 -f 'js' -r 'ts' -R
```

Output:

```text
┌────────────────────────────────────────────────────┐
| ORIGINAL            | RENAMED             | STATUS |
| ************************************************** |
| index-01.js         | index-01.ts         | ok     |
| index-02.js         | index-02.ts         | ok     |
| one/index-03.js     | one/index-03.ts     | ok     |
| one/index-04.js     | one/index-04.ts     | ok     |
| one/two/index-05.js | one/two/index-05.ts | ok     |
| one/two/index-06.js | one/two/index-06.ts | ok     |
└────────────────────────────────────────────────────┘
```

You can control how many levels of subdirectories F2 searches by using the
`-m/--max-depth` option. For example, to limit the renaming operation to the
first level of subdirectories:

```bash
f2 -f 'js' -r 'ts' -R -m 1
```

Output:

```text
┌────────────────────────────────────────────┐
| ORIGINAL        | RENAMED         | STATUS |
| ****************************************** |
| index-01.js     | index-01.ts     | ok     |
| index-02.js     | index-02.ts     | ok     |
| one/index-03.js | one/index-03.ts | ok     |
| one/index-04.js | one/index-04.ts | ok     |
└────────────────────────────────────────────┘
```

You can also use the `--exclude-dir` option to prevent recursing into a specific
directory.

## Renaming Directories

Directories are exempted from the renaming operation by default. Use the
`-d/--include-dir` flag to include them.

_Original tree_:

```plaintext
.
├── pic1.jpg
├── pic2.png
└── pics
    ├── pic3.webp
    └── pic4.avif
```

```bash
f2 -f 'pic' -r 'image'
```

Notice that the `pics` directory is exempt here:

```text
┌────────────────────────────────┐
| ORIGINAL | RENAMED    | STATUS |
| ****************************** |
| pic1.jpg | image1.jpg | ok     |
| pic2.png | image2.png | ok     |
└────────────────────────────────┘
```

It is included when you add the `-d` flag:

```bash
f2 -f 'pic' -r 'image' -d
```

Output:

```text
┌────────────────────────────────┐
| ORIGINAL | RENAMED    | STATUS |
| ****************************** |
| pic2.png | image2.png | ok     |
| pic1.jpg | image1.jpg | ok     |
| pics     | images     | ok     |
└────────────────────────────────┘
```

If you want to rename the directory alone, you can use the `-D/--only-dir` flag
instead:

```bash
f2 -f 'pic' -r 'image' -D
```

Output:

```text
┌─────────────────────────────┐
| ORIGINAL | RENAMED | STATUS |
| *************************** |
| pics     | images  | ok     |
└─────────────────────────────┘
```

## Ignoring File Extensions

F2 matches the file extension by default, but if this behaviour is not desired,
you can use the `-e/--ignore-ext` flag.

**Without the `-e` flag**

```bash
f2 -f 'jpeg' -r 'jpg'
```

Output:

```text
┌────────────────────────────────────────────┐
| ORIGINAL         | RENAMED        | STATUS |
| ****************************************** |
| a-jpeg-file.jpeg | a-jpg-file.jpg | ok     |
| file.jpeg        | file.jpg       | ok     |
└────────────────────────────────────────────┘
```

**With the `-e` flag**

```bash
f2 -f 'jpeg' -r 'jpg' -e
```

Output:

```text
┌─────────────────────────────────────────────┐
| ORIGINAL         | RENAMED         | STATUS |
| ******************************************* |
| a-jpeg-file.jpeg | a-jpg-file.jpeg | ok     |
└─────────────────────────────────────────────┘
```

## Stripping Unwanted Text

You can strip out text by leaving out the `-r/--replace` flag. Here's an example
that removes `-unsplash` from the end of some image files:

```bash
f2 -f '-unsplash'
```

Output:

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                          | RENAMED                                  | STATUS |
| ***************************************************************************************************** |
| nathan-anderson-7TGVEgcTKlY-unsplash.jpg          | nathan-anderson-7TGVEgcTKlY.jpg          | ok     |
| pang-yuhao-WxREM3u9ytk-unsplash.jpg               | pang-yuhao-WxREM3u9ytk.jpg               | ok     |
| rich-hay-PQzlMO1ifPA-unsplash.jpg                 | rich-hay-PQzlMO1ifPA.jpg                 | ok     |
| samuele-errico-piccarini-t4OxCpKie70-unsplash.jpg | samuele-errico-piccarini-t4OxCpKie70.jpg | ok     |
| valentin-salja-VMroCCpP648-unsplash.jpg           | valentin-salja-VMroCCpP648.jpg           | ok     |
| vimal-s-GBg3jyGS-Ug-unsplash.jpg                  | vimal-s-GBg3jyGS-Ug.jpg                  | ok     |
└───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Renaming with an Index

You can specify an
[auto incrementing integer](https://github.com/ayoisaiah/f2/wiki/Indexing) in
the replacement string using the format below:

- `%d`: 1,2,3 e.t.c
- `%02d`: 01, 02, 03, e.t.c.
- `%03d`: 001, 002, 003, e.t.c.

...and so on.

```bash
f2 -f '.*\.' -r '{%03d}.'
```

Output:

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                                                       | RENAMED | STATUS |
| ************************************************************************************************* |
| Screenshot 2022-06-18 at 11-31-43 https __vale.dev.png                         | 001.png | ok     |
| Screenshot 2022-06-18 at 11-39-27 Ante.png                                     | 002.png | ok     |
| Screenshot 2022-06-18 at 13-49-10 redbean zip listing.png                      | 003.png | ok     |
| Screenshot 2022-06-18 at 13-50-03 redbean zip listing.png                      | 004.png | ok     |
| Screenshot 2022-06-24 at 20-50-50 Should You Get a Ceiling or Standing Fan.png | 005.png | ok     |
| Screenshot 2022-07-19 at 08-59-59 Green Africa - Itinerary.png                 | 006.png | ok     |
└───────────────────────────────────────────────────────────────────────────────────────────────────┘
```

[Learn more about indexing here](/guide/indexing).

## Ignoring Cases

F2 is case sensitive by default, but the `-i/--ignore-case` flag can be used to
make it insensitive to letter cases:

```bash
f2 -f 'jpeg' -r 'jpg' -i
```

```text
┌─────────────────────────────┐
| ORIGINAL | RENAMED | STATUS |
| *************************** |
| a.JPEG   | a.jpg   | ok     |
| b.jpeg   | b.jpg   | ok     |
| c.jPEg   | c.jpg   | ok     |
└─────────────────────────────┘
```

## Using Regex Capture Variables

[Regex](/reference/regex) capture variables are also supported in the
replacement string. It can come in handy when you want to base the new filenames
on elements in the existing names:

```bash
f2 -f '.*-(.*)_(.*)' -r '$1. $2' -e
```

Output:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                               | RENAMED                            | STATUS |
| **************************************************************************************************** |
| The Weeknd_Dawn FM_1-01_Dawn FM.flac                   | 01. Dawn FM.flac                   | ok     |
| The Weeknd_Dawn FM_1-02_Gasoline.flac                  | 02. Gasoline.flac                  | ok     |
| The Weeknd_Dawn FM_1-03_How Do I Make You Love Me.flac | 03. How Do I Make You Love Me.flac | ok     |
| The Weeknd_Dawn FM_1-04_Take My Breath.flac            | 04. Take My Breath.flac            | ok     |
| The Weeknd_Dawn FM_1-05_Sacrifice.flac                 | 05. Sacrifice.flac                 | ok     |
| The Weeknd_Dawn FM_1-06_A Tale by Quincy.flac          | 06. A Tale by Quincy.flac          | ok     |
| The Weeknd_Dawn FM_1-07_Out of Time.flac               | 07. Out of Time.flac               | ok     |
| The Weeknd_Dawn FM_1-08_Here We Go… Again.flac         | 08. Here We Go… Again.flac         | ok     |
| The Weeknd_Dawn FM_1-09_Best Friends.flac              | 09. Best Friends.flac              | ok     |
| The Weeknd_Dawn FM_1-10_Is There Someone Else.flac     | 10. Is There Someone Else.flac     | ok     |
| The Weeknd_Dawn FM_1-11_Starry Eyes.flac               | 11. Starry Eyes.flac               | ok     |
| The Weeknd_Dawn FM_1-12_Every Angel Is Terrifying.flac | 12. Every Angel Is Terrifying.flac | ok     |
| The Weeknd_Dawn FM_1-13_Don’t Break My Heart.flac      | 13. Don’t Break My Heart.flac      | ok     |
| The Weeknd_Dawn FM_1-14_I Heard You’re Married.flac    | 14. I Heard You’re Married.flac    | ok     |
| The Weeknd_Dawn FM_1-15_Less Than Zero.flac            | 15. Less Than Zero.flac            | ok     |
| The Weeknd_Dawn FM_1-16_Phantom Regret by Jim.flac     | 16. Phantom Regret by Jim.flac     | ok     |
└──────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Changing the Directory Structure

If a path separator (`/` in all OSes and `\` in Windows only) is present in the
replacement argument, it will be treated as a path with the last portion being
the file or directory name.

Assuming you want to organize some files by categorizing them into subfolders,
you only need to add a forward slash in the replacement string such as in the
example below:

```bash
f2 -f '[^a-zA-Z]*([^(]*) \(([^)]*)\).*\.iso$' -r 'Games/$2/$1{ext}'
```

Output:

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                                         | RENAMED                                           | STATUS |
| ***************************************************************************************************************************** |
| 0956 - Call of Duty - Roads to Victory (Germany) (v1.01) [b].iso | Games/Germany/Call of Duty - Roads to Victory.iso | ok     |
| 1925 - Gran Turismo (USA) (En,Fr,Es).iso                         | Games/USA/Gran Turismo.iso                        | ok     |
| 2233 - Metal Gear Solid - Peace Walker (USA) (v1.01).iso         | Games/USA/Metal Gear Solid - Peace Walker.iso     | ok     |
| 3185 - Pro Evolution Soccer 2014 (Europe) (It,El).iso            | Games/Europe/Pro Evolution Soccer 2014.iso        | ok     |
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

When executing the operation above, F2 will create the path directories where
necessary.

## Filtering out Matches

F2 provides the `-E/--exclude` flag for the excluding files that would have been
matched through the find pattern. This allows you to drill down your search to
be specific as possible.

Assuming you want to rename some Webp files, you can do something like this:

```bash
f2 -f '.*\.webp' -r '%03d{ext}'
```

Output:

```text
┌───────────────────────────────────────────────────────────────────┐
| ORIGINAL                                      | RENAMED  | STATUS |
| ***************************************************************** |
| 34e7dcd7.webp                                 | 001.webp | ok     |
| 3a2107b350fe4173f09a38deebd715bc.webp         | 002.webp | ok     |
| 7ukau2yqm8y91.webp                            | 003.webp | ok     |
| 7zwffegy91871.webp                            | 004.webp | ok     |
| 9ru90wxqm8y91.webp                            | 005.webp | ok     |
| alan_p.webp                                   | 006.webp | ok     |
| bgtqgsxqm8y91.webp                            | 007.webp | ok     |
| dashboard5.webp                               | 008.webp | ok     |
| eiuz4tzc2le71.webp                            | 009.webp | ok     |
| image-2-1.webp                                | 010.webp | ok     |
| qeila4tnvr971.webp                            | 011.webp | ok     |
| sa3a4zxqm8y91.webp                            | 012.webp | ok     |
└───────────────────────────────────────────────────────────────────┘
```

Let's say you want to exclude files that contain the number 9, you can do
something like this:

```bash
f2 -f '.*\.webp' -r '%03d{ext}' -E '9'
```

Output:

```text
┌───────────────────────────────────────────────────────────────────┐
| ORIGINAL                                      | RENAMED  | STATUS |
| ***************************************************************** |
| 34e7dcd7.webp                                 | 001.webp | ok     |
| alan_p.webp                                   | 002.webp | ok     |
| dashboard5.webp                               | 003.webp | ok     |
| eiuz4tzc2le71.webp                            | 004.webp | ok     |
| image-2-1.webp                                | 005.webp | ok     |
| splunk-log-observer-hero-dashboard-plain.webp | 006.webp | ok     |
└───────────────────────────────────────────────────────────────────┘
```

## Targeting Specific Files

Another way to narrow down the find and replace operation to specific files is
to list the paths to the desired file directly after all the command line
options. Assuming the following directory:

```text
sample_flac.flac sample_mp3.mp3 sample_ogg.ogg
```

Suppose you want to rename `sample` to `example` but only on the
`sample_flac.flac` and `sample_mp3.mp3` files, you can specify the files that
should be matched directly:

```bash
f2 -f "sample" -r "example" sample_flac.flac sample_mp3.mp3
```

Output:

```text
┌───────────────────────────────────────────────┐
| ORIGINAL         | RENAMED           | STATUS |
| ********************************************* |
| sample_flac.flac | example_flac.flac | ok     |
| sample_mp3.mp3   | example_mp3.mp3   | ok     |
└───────────────────────────────────────────────┘
```

Notice that the `sample_ogg.ogg` file isn't included even though it matches the
find pattern. When you specify a set of files as above, only those files will be
searched for matches even if other files would ordinarily be matched.

## Chaining Renaming Operations

With F2, you can chain as many renaming operations as you want in a single
command. This makes it easy to selectively replace different aspects of file
names.

The first combination selects the pool of files that will be worked on, while
subsequent ones act on the results of the previous one. If this concept sounds
confusing, this example below should make it clearer:

```bash
f2 -f '[^a-zA-Z]*([^(]*) \\(([^)]*)\\).*\\.iso$' -r 'Games/$2/$1{ext}' -f ' - ([^.]*)' -r ' ({<$1>.up})'
```

```text
┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                                                         | RENAMED                                           | STATUS |
| ***************************************************************************************************************************** |
| 0956 - Call of Duty - Roads to Victory (Germany) (v1.01) [b].iso | Games/Germany/Call of Duty (ROADS TO VICTORY).iso | ok     |
| 1925 - Gran Turismo (USA) (En,Fr,Es).iso                         | Games/USA/Gran Turismo.iso                        | ok     |
| 2233 - Metal Gear Solid - Peace Walker (USA) (v1.01).iso         | Games/USA/Metal Gear Solid (PEACE WALKER).iso     | ok     |
| 3185 - Pro Evolution Soccer 2014 (Europe) (It,El).iso            | Games/Europe/Pro Evolution Soccer 2014.iso        | ok     |
└───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Notice how the `-f` and `-r` flags can be used multiple times in a single
renaming operation. The first combination
(`-f '[^a-zA-Z]*([^(]*) \\(([^)]*)\\).*\\.iso$' -r 'Games/$2/$1{ext}'`) yields
the following intermediate result:

```text
Games/Germany/Call of Duty - Roads to Victory.iso
Games/USA/Gran Turismo.iso
Games/USA/Metal Gear Solid - Peace Walker.iso
Games/Europe/Pro Evolution Soccer 2014.iso
```

Afterward, the next combination targets the characters after hypen, uppercases
them and places them in parenthesis in the new name thus yielding the final
result.

Let's say you then decide to remove the "2014" from "Pro Evolution Soccer
2014.iso", you only need to append one more `-f` and leave out the corresponding
`-r` flag to remove the specified characters:

```bash
f2 -f '[^a-zA-Z]*([^(]*) \\(([^)]*)\\).*\\.iso$' -r 'Games/$2/$1{ext}' -f ' - ([^.]*)' -r ' ({<$1>.up})' -f ' \d+'
```

Result:

```text
*——————————————————————————————————————————————————————————————————*———————————————————————————————————————————————————*————————*
|                             ORIGINAL                             |                      RENAMED                      | STATUS |
*——————————————————————————————————————————————————————————————————*———————————————————————————————————————————————————*————————*
| 0956 - Call of Duty - Roads to Victory (Germany) (v1.01) [b].iso | Games/Germany/Call of Duty (ROADS TO VICTORY).iso | ok     |
| 1925 - Gran Turismo (USA) (En,Fr,Es).iso                         | Games/USA/Gran Turismo.iso                        | ok     |
| 2233 - Metal Gear Solid - Peace Walker (USA) (v1.01).iso         | Games/USA/Metal Gear Solid (PEACE WALKER).iso     | ok     |
| 3185 - Pro Evolution Soccer 2014 (Europe) (It,El).iso            | Games/Europe/Pro Evolution Soccer.iso             | ok     |
*——————————————————————————————————————————————————————————————————*———————————————————————————————————————————————————*————————*
```

## Integration with Other Programs

You can combine F2 with other tools using pipes to pass file arguments. Here's
an example that finds files modified before the last 30 days and renames them:

```bash
find -type f -mtime +30 | f2 -r '{mtime.YYYY}-{mtime.MM}-{mtime.DD}_{f}{ext}'
```

Output:

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
| ORIGINAL                             | RENAMED                                         | STATUS |
| *********************************************************************************************** |
| upload-files-go.md                   | 2022-10-23_upload-files-go.md                   | ok     |
| windows-terminal.md                  | 2022-10-23_windows-terminal.md                  | ok     |
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```
