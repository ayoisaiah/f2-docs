# Renaming with a CSV File

F2 allows you to rename files based on the contents of a CSV file, offering a
great deal of flexibility. The CSV file must contain at least one column, and if
it has more than one column, the column separator must be a comma (,).

## Basic Usage

The first column of the CSV should contain either absolute or relative paths to
the source files, and the second column (optional) should contain the new names.
To use a CSV file for renaming, pass it with the `--csv` option.

Sample CSV (`input.csv`):

```csv
proraw.dng,apple-iphone-12raw.dng
bike.jpeg,dawes-bicycle.jpg
```

Command:

```bash
f2 --csv 'input.csv'
```

Output:

```text
+------------+------------------------+--------+
|   INPUT    |         OUTPUT         | STATUS |
+------------+------------------------+--------+
| proraw.dng | apple-iphone-12raw.dng | ok     |
| bike.jpeg  | dawes-bicycle.jpg      | ok     |
+------------+------------------------+--------+
```

In the example above, F2 assumes the source files are relative to the path of
the `input.csv` file.

## Example with Absolute Paths

```csv
/home/ayo/proraw.dng,apple-iphone-12raw.dng
/home/ayo/pics/bike.jpeg,dawes-bicycle.jpg
```

Command:

```bash
f2 --csv 'file.csv'
```

Output:

```text
*——————————————————————————*——————————————————————————————————*————————*
|         ORIGINAL         |             RENAMED              | STATUS |
*——————————————————————————*——————————————————————————————————*————————*
| /home/ayo/proraw.dng     | /home/ayo/apple-iphone-12raw.dng | ok     |
| /home/ayo/pics/bike.jpeg | /home/ayo/pics/dawes-bicycle.jpg | ok     |
*——————————————————————————*——————————————————————————————————*————————*
```

If the second column contains relative paths, the result will be relative to the
source path. Directories that do not exist will be automatically created.

```csv
/home/ayo/proraw.dng,pics/apple-iphone-12raw.dng
/home/ayo/pics/bike.jpeg,../dawes-bicycle.jpg
```

Output:

```text
*——————————————————————————*———————————————————————————————————————*————————*
|         ORIGINAL         |                RENAMED                | STATUS |
*——————————————————————————*———————————————————————————————————————*————————*
| /home/ayo/proraw.dng     | /home/ayo/pics/apple-iphone-12raw.dng | ok     |
| /home/ayo/pics/bike.jpeg | /home/ayo/dawes-bicycle.jpg           | ok     |
*——————————————————————————*———————————————————————————————————————*————————*
```

## Example with Variables

You can also use [built-in variables](/guide/how-variables-work) and indexing
schemes in the second column for further customization.

```csv
proraw.dng,%03d_{{xt.ImageWidth}}x{{xt.ImageHeight}}_{{xt.Model}}.dng
bike.jpeg,{{exif.model}}_{{exif.make}}{{ext}}
```

Command:

```bash
f2 --csv 'input.csv'
```

Output:

```text
+------------+-------------------------------------+--------+
|   INPUT    |               OUTPUT                | STATUS |
+------------+-------------------------------------+--------+
| proraw.dng | 001_4032x3024_iPhone 12 Pro Max.dng | ok     |
| bike.jpeg  | SM-G975F_samsung.jpeg               | ok     |
+------------+-------------------------------------+--------+
```

## Single-Column Example

If the CSV file contains only one column, or you don’t want to use the contents
of other columns, you can use the `-f` and `-r` flags.

```text
proraw.dng
bike.jpeg
```

Usage with `-f` and `-r`:

```bash
f2 --csv 'input.csv' -r '%03d{ext}'
```

Output:

```text
+------------+----------+--------+
|   INPUT    |  OUTPUT  | STATUS |
+------------+----------+--------+
| proraw.dng | 001.dng  | ok     |
| bike.jpeg  | 002.jpeg | ok     |
+------------+----------+--------+
```

You can also match a specific file using the `-f` option:

```bash
f2 --csv 'input.csv' -f 'bike.jpeg' -r '%03d{ext}'
```

Output:

```text
+-----------+----------+--------+
|   INPUT   |  OUTPUT  | STATUS |
+-----------+----------+--------+
| bike.jpeg | 001.jpeg | ok     |
+-----------+----------+--------+
```

## Missing Source File Handling

If a source file in the CSV file cannot be found, that row will be skipped.

```csv
/path/to/non-existent/file.png,404.png
/home/ayo/proraw.dng,pics/apple-iphone-12raw.dng
/home/ayo/pics/bike.jpeg,../dawes-bicycle.jpg
```

The first row in the above CSV document will be skipped:

```text
f2 --csv 'input.csv' --verbose
```

Output:

```text
skipping non existent source file at row 1: /path/to/non-existent/file.png
*——————————————————————————*——————————————————————————————————*————————*
|         ORIGINAL         |             RENAMED              | STATUS |
*——————————————————————————*——————————————————————————————————*————————*
| /home/ayo/proraw.dng     | /home/ayo/apple-iphone-12raw.dng | ok     |
| /home/ayo/pics/bike.jpeg | /home/ayo/pics/dawes-bicycle.jpg | ok     |
*——————————————————————————*——————————————————————————————————*————————*
```

## Using CSV Variables

F2 provides CSV variables that can be used in renaming operations. The syntax is
`{csv.<column number>}`. If the column exists, the value is used; if not, an
empty string is substituted.

```csv
Filename,Podcast name,Description,Date,Duration
episode-001.mp3,History on Steroids,The story of WW2,27-Aug-2006,2hrs47mins
S04E23.m4a,Premier League Show,Where will Sancho fit in at United,31-July-2021,30mins
```

Renaming using CSV variables:

```bash
f2 --csv 'input.csv' -r '{csv.2} - {csv.3} ({csv.5})'
```

Output:

```text
+-----------------+-------------------------------------------------------------------+--------+
|      INPUT      |                              OUTPUT                               | STATUS |
+-----------------+-------------------------------------------------------------------+--------+
| episode-001.mp3 | History on Steroids - The story of WW2 (2hrs47mins)               | ok     |
| S04E23.m4a      | Premier League Show - Where will Sancho fit in at United (30mins) | ok     |
+-----------------+-------------------------------------------------------------------+--------+
```

You can also use CSV variables in the second column of the CSV file:

```csv
Filename,Replacement,Podcast name,Description,Date,Duration
episode-001.mp3,{csv.3} - {csv.4} ({csv.6}),History on Steroids,The story of WW2,27-Aug-2006,2hrs47mins
S04E23.m4a,{csv.4} ({csv.5}),Premier League Show,Where will Sancho fit in at United,31-July-2021,30mins
```

Command:

```bash
f2 --csv 'input.csv'
```

Output:

```text
+-----------------+-----------------------------------------------------+--------+
|      INPUT      |                       OUTPUT                        | STATUS |
+-----------------+-----------------------------------------------------+--------+
| episode-001.mp3 | History on Steroids - The story of WW2 (2hrs47mins) | ok     |
| S04E23.m4a      | Where will Sancho fit in at United (31-July-2021)   | ok     |
+-----------------+-----------------------------------------------------+--------+
```
