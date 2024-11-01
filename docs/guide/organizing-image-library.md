# Organizing an Image Library

A useful approach to organizing image libraries is to arrange files by their
capture date. This lets you navigate through folders by events or timelines,
making it easier to find specific memories like birthdays, weddings, or
vacations.

Assuming your photos are currently organized like this:

```text
.
├── birthday-2024
│   ├── _DSC0430.ARW
│   ├── _DSC0430.JPG
│   ├── _DSC0431.ARW
│   └── _DSC0431.JPG
├── _DSC0560.ARW
├── _DSC0560.JPG
├── _DSC0561.ARW
├── _DSC0561.JPG
├── family trip - berlin
│   ├── _DSC1767.ARW
│   ├── _DSC1767.JPG
│   ├── _DSC1769.ARW
│   ├── _DSC1769.JPG
│   ├── _DSC1770.ARW
│   └── _DSC1770.JPG
├── family trip - london
│   ├── _DSC0090.ARW
│   ├── _DSC0090.JPG
│   ├── _DSC0091.ARW
│   └── _DSC0091.JPG
└── my-wedding
    ├── DSC05194.ARW
    ├── DSC05194.JPG
    ├── DSC05195.ARW
    └── DSC05195.JPG
```

You may decide to organize them in a date-based folder structure like
`Year/Month/Day/filename`. For example:

```text
2024
├── 05-May
│   └── 2024-05-30
│       ├── 001.ARW
│       ├── 001.JPG
│       └── 002.JPG
└── 06-Jun
    ├── 2024-06-27
    │   ├── 001.JPG
    │   └── 001.ARW
```

<!-- prettier-ignore-start -->
::: tip NOTE
This example is somewhat contrived to show as many options as possible, giving
you an idea of how they can fit in your file renaming strategy.
:::
<!-- prettier-ignore-end -->

To achieve this with F2, you can use use [Exif data](/guide/exif-variables) in
combination with custom folder structures and file naming conventions.

The following command extracts the creation date from metadata and organizes
files into a nested date-based folder structure:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{f}{ext}' -R
```

This produces a structure like:

```text
——————————————————*————————*
|             ORIGINAL              |                         RENAMED                          | STATUS |
*———————————————————————————————————*——————————————————————————————————————————————————————————*————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/_DSC0560.ARW                      | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/_DSC0560.JPG                      | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/_DSC0561.ARW                      | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/_DSC0561.JPG                      | ok     |
| birthday-2024/_DSC0430.ARW        | birthday-2024/2024/06-Jun/2024-06-28/_DSC0430.ARW        | ok     |
| birthday-2024/_DSC0430.JPG        | birthday-2024/2024/06-Jun/2024-06-28/_DSC0430.JPG        | ok     |
| birthday-2024/_DSC0431.ARW        | birthday-2024/2024/06-Jun/2024-06-28/_DSC0431.ARW        | ok     |
| birthday-2024/_DSC0431.JPG        | birthday-2024/2024/06-Jun/2024-06-28/_DSC0431.JPG        | ok     |
| family trip - berlin/_DSC1767.ARW | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1767.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1767.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1769.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1769.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1770.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | family trip - berlin/2024/06-Jun/2024-06-27/_DSC1770.JPG | ok     |
| family trip - london/_DSC0090.ARW | family trip - london/2024/05-May/2024-05-30/_DSC0090.ARW | ok     |
| family trip - london/_DSC0090.JPG | family trip - london/2024/05-May/2024-05-30/_DSC0090.JPG | ok     |
| family trip - london/_DSC0091.ARW | family trip - london/2024/05-May/2024-05-30/_DSC0091.ARW | ok     |
| family trip - london/_DSC0091.JPG | family trip - london/2024/05-May/2024-05-30/_DSC0091.JPG | ok     |
| my-wedding/DSC05194.ARW           | my-wedding/2024/07-Jul/2024-07-02/DSC05194.ARW           | ok     |
| my-wedding/DSC05194.JPG           | my-wedding/2024/07-Jul/2024-07-02/DSC05194.JPG           | ok     |
| my-wedding/DSC05195.ARW           | my-wedding/2024/07-Jul/2024-07-02/DSC05195.ARW           | ok     |
| my-wedding/DSC05195.JPG           | my-wedding/2024/07-Jul/2024-07-02/DSC05195.JPG           | ok     |
*———————————————————————————————————*——————————————————————————————————————————————————————————*————————*
```

To avoid nesting the new structure inside existing folders, specify a root
directory with the `--target-dir` flag:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{f}{ext}' -R --target-dir .
```

This produces:

```text
*———————————————————————————————————*—————————————————————————————————————*————————*
|             ORIGINAL              |               RENAMED               | STATUS |
*———————————————————————————————————*—————————————————————————————————————*————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/_DSC0560.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/_DSC0560.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/_DSC0561.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/_DSC0561.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/_DSC0430.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/_DSC0430.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/_DSC0431.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/_DSC0431.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/_DSC1767.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/_DSC1767.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/_DSC1769.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/_DSC1769.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/_DSC1770.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/_DSC1770.JPG | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/_DSC0090.ARW | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/_DSC0090.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/_DSC0091.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/_DSC0091.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/DSC05194.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/DSC05194.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/DSC05195.ARW | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/DSC05195.JPG | ok     |
*———————————————————————————————————*—————————————————————————————————————*————————*
```

To provide a unique, consistent naming scheme, use an auto-incremented index for
each file in each date-based folder:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}{ext}' -R --target-dir .
```

This produces files with an auto-incrementing number:

```text
*———————————————————————————————————*————————————————————————————————*————————*
|             ORIGINAL              |            RENAMED             | STATUS |
*———————————————————————————————————*————————————————————————————————*————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/001.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/002.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/003.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/004.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/005.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/006.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/007.ARW | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/008.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/009.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/010.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/011.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/012.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/013.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/014.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/015.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/016.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/017.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/018.JPG | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/019.ARW | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/020.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/021.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/022.JPG | ok     |
*———————————————————————————————————*————————————————————————————————*————————*
```

However, this is probably not what you want as the ARW/JPG file pairings have
been lost in the renaming process due to the auto-incrementing index variable.

To fix this, use the `--pair` option and remove the `{ext}` variable since
pairing always retains the file extension.

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair
```

This yields:

```text
*———————————————————————————————————*————————————————————————————————*————————*
|             ORIGINAL              |            RENAMED             | STATUS |
*———————————————————————————————————*————————————————————————————————*————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/001.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/001.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/002.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/002.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/003.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/003.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/004.ARW | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/004.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/005.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/005.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/006.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/006.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/007.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/007.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/008.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/008.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/009.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/009.JPG | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/010.ARW | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/010.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/011.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/011.JPG | ok     |
*———————————————————————————————————*————————————————————————————————*————————*
```

Now the file pairings are correctly detected and maintained throughout the
operation. However, there's still one issue: the numbering continues across
directories instead of resetting. To achieve more intuitive numbering, we need
the count to reset in each new directory.

Luckily, F2 provides an easy way to do this with `--reset-index-per-dir`:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir
```

This produces:

```text
*———————————————————————————————————*————————————————————————————————*——————————————————————*
|             ORIGINAL              |            RENAMED             |        STATUS        |
*———————————————————————————————————*————————————————————————————————*——————————————————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/001.ARW | ok                   |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/001.JPG | ok                   |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/002.ARW | ok                   |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/002.JPG | ok                   |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/001.ARW | ok                   |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/001.JPG | ok                   |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/002.ARW | ok                   |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/002.JPG | ok                   |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/001.ARW | overwriting new path |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/001.JPG | overwriting new path |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/002.ARW | overwriting new path |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/002.JPG | overwriting new path |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/001.ARW | ok                   |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/001.JPG | ok                   |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/002.ARW | ok                   |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/002.JPG | ok                   |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/003.ARW | ok                   |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/003.JPG | ok                   |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/001.ARW | ok                   |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/001.JPG | ok                   |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/002.ARW | ok                   |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/002.JPG | ok                   |
*———————————————————————————————————*————————————————————————————————*——————————————————————*
conflict: resolve manually or use -F/--fix-conflict
```

The indexes now reset in each directory, but this creates a conflict when
multiple files are renamed to the same name. You can resolve these conflicts
automatically using the `-F` flag:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir -F
```

Output:

```text
*———————————————————————————————————*———————————————————————————————————*————————*
|             ORIGINAL              |              RENAMED              | STATUS |
*———————————————————————————————————*———————————————————————————————————*————————*
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/001.ARW    | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/001.JPG    | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/002.ARW    | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/002.JPG    | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/001.ARW    | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/001.JPG    | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/002.ARW    | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/002.JPG    | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/001(1).ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/001(1).JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/002(1).ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/002(1).JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/001.ARW    | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/001.JPG    | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/002.ARW    | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/002.JPG    | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/003.ARW    | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/003.JPG    | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/001.ARW    | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/001.JPG    | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/002.ARW    | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/002.JPG    | ok     |
*———————————————————————————————————*———————————————————————————————————*————————*
```

By default, a number is appended to each affected file to resolve conflicts, but
this disrupts the intended naming convention. A better solution is to increment
the index to the next available number. You can accomplish this by using a
custom `--fix-conflicts-pattern` like this:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir -F --fix-conflicts-pattern '%03d'
```

Output:

```text
*———————————————————————————————————*————————————————————————————————*————————*
|             ORIGINAL              |            RENAMED             | STATUS |
*———————————————————————————————————*————————————————————————————————*————————*
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/001.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/001.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/002.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/002.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/001.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/001.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/002.JPG | ok     |
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/002.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/003.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/003.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/004.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/004.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/001.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/001.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/002.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/002.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/003.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/003.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/001.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/001.ARW | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/002.JPG | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/002.ARW | ok     |
*———————————————————————————————————*————————————————————————————————*————————*
```

The conflicts are resolved correctly, and each file now shows a status of `ok`.
Next, let's ensure the image files are sorted by their `DateTimeOriginal`
attribute:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir -F --fix-conflicts-pattern '%03d' --sort 'time_var' --sort-var '{x.cdt}'
```

The images are now sorted in ascending order according to their time of
creation:

```text
*———————————————————————————————————*————————————————————————————————*————————*
|             ORIGINAL              |            RENAMED             | STATUS |
*———————————————————————————————————*————————————————————————————————*————————*
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/001.JPG | ok     |
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/001.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/002.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/002.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/001.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/001.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/002.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/002.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/003.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/003.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/001.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/001.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/002.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/002.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/003.JPG | ok     |
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/003.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/004.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/004.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/001.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/001.ARW | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/002.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/002.ARW | ok     |
*———————————————————————————————————*————————————————————————————————*————————
```

Notice that the JPG files currently appear before the ARW files in each pair. If
you prefer the ARW files to appear first, you can adjust the order using the
`--pair-order` option:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir -F --fix-conflicts-pattern '%03d' --sort 'time_var' --sort-var '{x.cdt}' --pair-order 'arw,jpg'
```

Output:

```text
*———————————————————————————————————*————————————————————————————————*————————*
|             ORIGINAL              |            RENAMED             | STATUS |
*———————————————————————————————————*————————————————————————————————*————————*
| family trip - london/_DSC0090.ARW | 2024/05-May/2024-05-30/001.ARW | ok     |
| family trip - london/_DSC0090.JPG | 2024/05-May/2024-05-30/001.JPG | ok     |
| family trip - london/_DSC0091.ARW | 2024/05-May/2024-05-30/002.ARW | ok     |
| family trip - london/_DSC0091.JPG | 2024/05-May/2024-05-30/002.JPG | ok     |
| family trip - berlin/_DSC1767.ARW | 2024/06-Jun/2024-06-27/001.ARW | ok     |
| family trip - berlin/_DSC1767.JPG | 2024/06-Jun/2024-06-27/001.JPG | ok     |
| family trip - berlin/_DSC1769.ARW | 2024/06-Jun/2024-06-27/002.ARW | ok     |
| family trip - berlin/_DSC1769.JPG | 2024/06-Jun/2024-06-27/002.JPG | ok     |
| family trip - berlin/_DSC1770.ARW | 2024/06-Jun/2024-06-27/003.ARW | ok     |
| family trip - berlin/_DSC1770.JPG | 2024/06-Jun/2024-06-27/003.JPG | ok     |
| birthday-2024/_DSC0430.ARW        | 2024/06-Jun/2024-06-28/001.ARW | ok     |
| birthday-2024/_DSC0430.JPG        | 2024/06-Jun/2024-06-28/001.JPG | ok     |
| birthday-2024/_DSC0431.ARW        | 2024/06-Jun/2024-06-28/002.ARW | ok     |
| birthday-2024/_DSC0431.JPG        | 2024/06-Jun/2024-06-28/002.JPG | ok     |
| _DSC0560.ARW                      | 2024/06-Jun/2024-06-28/003.ARW | ok     |
| _DSC0560.JPG                      | 2024/06-Jun/2024-06-28/003.JPG | ok     |
| _DSC0561.ARW                      | 2024/06-Jun/2024-06-28/004.ARW | ok     |
| _DSC0561.JPG                      | 2024/06-Jun/2024-06-28/004.JPG | ok     |
| my-wedding/DSC05194.ARW           | 2024/07-Jul/2024-07-02/001.ARW | ok     |
| my-wedding/DSC05194.JPG           | 2024/07-Jul/2024-07-02/001.JPG | ok     |
| my-wedding/DSC05195.ARW           | 2024/07-Jul/2024-07-02/002.ARW | ok     |
| my-wedding/DSC05195.JPG           | 2024/07-Jul/2024-07-02/002.JPG | ok     |
*———————————————————————————————————*————————————————————————————————*————————*
```

To finalize the renaming process, add `-x` to execute and `--clean` to remove
any empty directories:

```bash
f2 -r '{x.cdt.YYYY}/{x.cdt.MM}-{x.cdt.MMM}/{x.cdt.YYYY}-{x.cdt.MM}-{x.cdt.DD}/{%03d}' -R --target-dir . --pair --reset-index-per-dir -F --fix-conflicts-pattern '%03d' --sort 'time_var' --sort-var '{x.cdt}' --pair-order 'arw,jpg' -x --clean
```

The final organized structure will look like this:

```text
└── 2024
    ├── 05-May
    │   └── 2024-05-30
    │       ├── 001.ARW
    │       ├── 001.JPG
    │       ├── 002.ARW
    │       └── 002.JPG
    ├── 06-Jun
    │   ├── 2024-06-27
    │   │   ├── 001.ARW
    │   │   ├── 001.JPG
    │   │   ├── 002.ARW
    │   │   ├── 002.JPG
    │   │   ├── 003.ARW
    │   │   └── 003.JPG
    │   └── 2024-06-28
    │       ├── 001.ARW
    │       ├── 001.JPG
    │       ├── 002.ARW
    │       ├── 002.JPG
    │       ├── 003.ARW
    │       ├── 003.JPG
    │       ├── 004.ARW
    │       └── 004.JPG
    └── 07-Jul
        └── 2024-07-02
            ├── 001.ARW
            ├── 001.JPG
            ├── 002.ARW
            └── 002.JPG
```
