# ID3 Metadata Variables

<!-- prettier-ignore-start -->
::: tip
The [Exiftool integration](/guide/exiftool-variables) provides a more comprehensive way to access file
attributes.
:::
<!-- prettier-ignore-end -->

[ID3 metadata tags](https://en.wikipedia.org/wiki/ID3) are commonly embedded in
audio files such as MP3, FLAC, OGG, M4A, AAC, and other formats to store
information about the audio content.

## Supported Attributes

Below are the main ID3 attributes that can be accessed:

- `title`: The title of the track.
- `artist`: The artist who performed the track.
- `album_artist`: The primary artist for the album), used when different tracks
  may have different artists.
- `album`: The name of the album the track is part of.
- `format`: The specific file format and version.
- `type`: The audio file type.
- `year`: The release year of the track or album.
- `track`: The track number within the album.
- `total_tracks`: The total number of tracks on the album.
- `disc`: The disc number if the album is part of a multi-disc set.
- `total_discs`: The total number of discs in the set.

When reading audio file metadata using these variables, missing attributes will
be replaced with an empty string to ensure the renaming process continues
smoothly even if some details are incomplete.

## A Practical Example

The following example demonstrates how to use ID3 attributes to automatically
rename and organize audio files into a specific folder structure. In this case,
the folder structure follows the format `artist/album/title`, with the filenames
including the track number:

```bash
f2 -f '(\d+).*' -r '{id3.artist}/{id3.album}/${1}_{id3.title}{ext}'
```

In this example:

- `{id3.artist}` retrieves the artist's name.
- `{id3.album}` fetches the album name.
- `{id3.title}` gets the track title.
- `${1}` is a reference to the extracted track number from the original
  filename.
- `{ext}` keeps the original file extension (e.g., `.flac`).

After running the command, here's how the files might be organized and renamed:

```text
*———————————————————————————————*——————————————————————————————————————————————————————*————————*
|           ORIGINAL            |                       RENAMED                        | STATUS |
*———————————————————————————————*——————————————————————————————————————————————————————*————————*
| 01 - Jumpsuit.flac            | Twenty One Pilots/Trench/01_Jumpsuit.flac            | ok     |
| 02 - Levitate.flac            | Twenty One Pilots/Trench/02_Levitate.flac            | ok     |
| 03 - Morph.flac               | Twenty One Pilots/Trench/03_Morph.flac               | ok     |
| 04 - My Blood.flac            | Twenty One Pilots/Trench/04_My Blood.flac            | ok     |
| 05 - Chlorine.flac            | Twenty One Pilots/Trench/05_Chlorine.flac            | ok     |
| 06 - Smithereens.flac         | Twenty One Pilots/Trench/06_Smithereens.flac         | ok     |
| 07 - Neon Gravestones.flac    | Twenty One Pilots/Trench/07_Neon Gravestones.flac    | ok     |
| 08 - The Hype.flac            | Twenty One Pilots/Trench/08_The Hype.flac            | ok     |
| 09 - Nico and the Niners.flac | Twenty One Pilots/Trench/09_Nico and the Niners.flac | ok     |
| 10 - Cut My Lip.flac          | Twenty One Pilots/Trench/10_Cut My Lip.flac          | ok     |
| 11 - Bandito.flac             | Twenty One Pilots/Trench/11_Bandito.flac             | ok     |
| 12 - Pet Cheetah.flac         | Twenty One Pilots/Trench/12_Pet Cheetah.flac         | ok     |
| 13 - Legend.flac              | Twenty One Pilots/Trench/13_Legend.flac              | ok     |
| 14 - Leave the City.flac      | Twenty One Pilots/Trench/14_Leave the City.flac      | ok     |
*———————————————————————————————*——————————————————————————————————————————————————————*————————*
```
