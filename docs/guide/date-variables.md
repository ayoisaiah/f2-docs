# Date Variables

F2 allows you to use file date and time attributes as part of the file renaming
process, providing flexible options for organizing and managing files based on
their timestamps.

This includes accessing key file properties like creation, modification, and
access times, among others.

Here are the available date-related variables:

- `ctime`: The time when the file's metadata was last changed (i.e., when the
  file permissions or ownership were modified).
- `btime`: The file's creation or birth time (available only on Windows and
  macOS systems).
- `atime`: The last time the file was accessed or read.
- `mtime`: The last time the file's contents were modified.
- `now`: The current system time, which can be useful for including the time of
  renaming in the new file name.

These variables **must** be combined with specific date tokens to customize the
format of the dates in the file names.

## Date tokens

| Token | Explanation                                                   | Output                                 |
| ----- | ------------------------------------------------------------- | -------------------------------------- |
| YYYY  | Year represented by a full four digits                        | 1970 1971 ... 2029 2030                |
| YY    | Year represented only by the last two digits                  | 70 71 ... 29 30                        |
| MMMM  | Name of the month                                             | January February ... November December |
| MMM   | Abbreviated name of the month                                 | Jan Feb ... Nov Dec                    |
| MM    | Month as digits with leading zeros for single-digit months    | 01 02 ... 11 12                        |
| M     | Month as digits without leading zeros for single-digit months | 1 2 ... 11 12                          |
| DDDD  | Name of the day of the week                                   | Monday Tuesday ... Saturday Sunday     |
| DDD   | Abbreviated name of the day of the week                       | Mon Tue ... Sat Sun                    |
| DD    | Day of the month as digit with leading zeros                  | 01 02 ... 30 31                        |
| D     | Day of the month as digit without leading zeros               | 1 2 ... 30 31                          |
| H     | 24 Hours clock                                                | 01 02 ... 22 23                        |
| hh    | Hours with leading zeros for single-digit hours               | 01 02 ... 11 12                        |
| h     | Hours without leading zeros for single-digit hours            | 1 2 ... 11 12                          |
| mm    | Minutes with leading zeros for single-digit minutes           | 01 02 ... 58 59                        |
| m     | Minutes without leading zeros for single-digit minutes        | 1 2 ... 58 59                          |
| ss    | Seconds with leading zeros for single-digit seconds           | 01 02 ... 58 59                        |
| s     | Seconds without leading zeros for single-digit seconds        | 1 2 ... 58 59                          |
| A     | AM PM                                                         | AM PM                                  |
| a     | am pm                                                         | am pm                                  |

## Usage Examples

To demonstrate how to use these variables and tokens, let's look at an example
where we rename `.webp` image files based on the time they were last modified.

```bash
f2 -f '.*webp$' -r '{mtime.MMM}-{mtime.DD}-{mtime.YYYY}_image{%003d}{ext}'
```

In this example:

- `{mtime.MMM}` takes the abbreviated month name of the last modification date.
- `{mtime.DD}` takes the day of the month, zero-padded.
- `{mtime.YYYY}` takes the full four-digit year of the last modification date.
- `_image{%003d}` appends a sequentially numbered suffix (e.g., image001,
  image002) to the file name.
- `{ext}` preserves the original file extension.

Running this command on a set of `.webp` files would produce the following
result:

```text
*---------------------------------------------------------*
| ORIGINAL           | RENAMED                   | STATUS |
*---------------------------------------------------------*
| 34e7dcd7.webp      | Jun-18-2022_image001.webp | ok     |
| 7zwffegy91871.webp | Jun-03-2022_image002.webp | ok     |
| alan_p.webp        | May-29-2022_image003.webp | ok     |
| eiuz4tzc2le71.webp | Jun-03-2022_image004.webp | ok     |
| image-2-1.webp     | Apr-23-2022_image005.webp | ok     |
| qeila4tnvr971.webp | Jun-03-2022_image006.webp | ok     |
*---------------------------------------------------------*
```
