# Exif Variables

<!-- prettier-ignore-start -->
::: tip
The [Exiftool integration](/guide/exiftool-variables) provides a more comprehensive way to access file
attributes.
:::
<!-- prettier-ignore-end -->

F2 supports the use of Exif metadata during the image renaming process, allowing
for highly customizable renaming of image files based on embedded camera and
image data.

Exif metadata includes a wide array of attributes related to the image, such as
camera settings, lens information, image dimensions, and geolocation data.

By accessing these attributes, you can create meaningful and informative file
names that provide context about each image.

## How to Use Exif Variables

Exif variables can be incorporated into your renaming template using either
`{x.<var>}` or `{exif.<var>}`. For example:

- `{exif.iso}` or `{x.iso}`: Inserts the ISO value of the image.
- `{exif.make}` or `{x.make}`: Inserts the camera manufacturer.

If an image lacks a particular Exif attribute, F2 will replace the variable with
an empty string in the file name, ensuring the renaming process is not
interrupted.

It's important to note that Exif variables are only available for image files
like JPEG, DNG, and most RAW formats (e.g., CR2, NEF, RAF, ARW). At this time,
Exif metadata is not supported for HEIC/HEIF image formats.

## Supported Exif Variables

Below is a list of the Exif variables currently supported by F2. These cover a
broad range of camera settings and image attributes:

- `iso`: The ISO sensitivity used to capture the image.
- `w`: The width of the image in pixels.
- `h`: The height of the image in pixels.
- `model`: The camera model (e.g., Canon EOS 5D Mark III).
- `make`: The camera manufacturer (e.g., Canon, Nikon, Sony).
- `lens`: The model of the lens used to capture the image.
- `et`: The exposure time, typically represented as a fraction (e.g., 1/400),
  displayed as 1_400.
- `wh`: The image dimensions in the format width x height (e.g., 4032x3024).
- `fnum`: The aperture value (e.g., f/1.6).
- `fl`: The focal length of the lens in millimeters (e.g., 52mm).
- `soft`: The software used to process or edit the image (e.g., Adobe
  Lightroom).
- `fl35`: The 35mm equivalent focal length, useful when comparing different
  sensor sizes.
- `lat`: The latitude at which the image was captured, if GPS data is available.
- `lon`: The longitude at which the image was captured, if GPS data is
  available.
- `cdt`: The original creation date of the image, also known as
  DateTimeOriginal. This must be combined with a
  [date token](/guide/date-variables.html#date-tokens) to customize the date
  format (e.g., `{x.cdt.YYYY}` for the year).

## Usage Examples

To rename image files based on the camera model, focal length, ISO, and
manufacturer, you could use a command like this:

```bash
f2 -r '{x.model}-{x.fl}mm-ISO{x.iso}-{x.make}-{f}{ext}'
```

When applied to a set of image files, the renaming operation will produce the
following results:

```text
+------------------------------------------------------------------------------------+
| ORIGINAL        | RENAMED                                                 | STATUS |
+------------------------------------------------------------------------------------+
| bike.jpeg       | SM-G975F-4.32mm-ISO50-samsung-bike.jpeg                 | ok     |
| proraw.dng      | iPhone 12 Pro Max-5.1mm-ISO32-Apple-proraw.dng          | ok     |
| tractor-raw.cr2 | Canon EOS 5D Mark III-24mm-ISO200-Canon-tractor-raw.cr2 | ok     |
+------------------------------------------------------------------------------------+
```

## Additional Options with Exiftool Integration

If the built-in Exif variables do not provide all the details you need, F2 also
supports integration with [ExifTool](https://exiftool.org/), a powerful tool for
reading and writing all kinds of file metadata.

You can explore our ExifTool integration in the
[ExifTool variables page](/guide/exiftool-variables) for further customization
possibilities.
