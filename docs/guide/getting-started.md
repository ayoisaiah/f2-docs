# Getting Started

F2 is
[distributed as a standalone binary](https://github.com/ayoisaiah/f2/releases),
making it easy to install and use without requiring any external dependencies or
special permissions. Once downloaded, simply place the binary in your `$PATH`,
and you're ready to start renaming files efficiently.

However, in addition to downloading the binary directly, several other
installation methods are provided to simplify the process, such as managing
updates, installing the companion man page, or setting up shell completion
files. You can even choose to build the program from the source if you prefer.

## Install with Go

If you have Go installed, you can easily install F2 using the `go install`
command (requires v1.23 or later):

```bash
go install github.com/ayoisaiah/f2/v2/cmd/f2@latest
```

## Install via NPM

If you have Node.js installed,
[the F2 package](https://www.npmjs.com/package/@ayoisaiah/f2) can be installed
through `npm`:

```bash [npm]
npm i @ayoisaiah/f2 -g
```

Note that other package managers are not guaranteed to work.

## Install on Linux

### Binary Downloads

You can download the binary directly from the
[F2 releases page](https://github.com/ayoisaiah/f2/releases). Simply download
the archive that matches your system's architecture, extract it, and move it to
your `$PATH` to make it accessible from the command line.

```bash
# Download the archive
curl -LO https://github.com/ayoisaiah/f2/releases/download/v2.0.3/f2_2.0.3_linux_amd64.tar.gz

# Extract the contents
tar -xvzf f2_2.0.3_linux_amd64.tar.gz

# Make the binary executable
chmod +x f2

# Move the binary to a directory in your $PATH
sudo mv f2 /usr/local/bin
```

### Arch Linux

For Arch Linux users, F2 is available via the
[Arch User Repository (AUR)](https://aur.archlinux.org/packages/f2-bin/). Use
the following command to install F2 via `yay` or similar tools:

```bash
yay -S f2-bin
```

### Debian / Ubuntu (and derivatives)

Debian and Ubuntu users can download and install the .deb package for their
system directly from the releases page:

```bash
# Download the deb package
curl -LO https://github.com/ayoisaiah/f2/releases/download/v2.0.3/f2_2.0.3_linux_amd64.deb

# Install the package
sudo dpkg -i f2_2.0.3_linux_amd64.deb
```

### Fedora / CentOS

For Fedora or CentOS users, you can install F2 using the .rpm package from the
releases page:

```bash
# Download the rpm package
curl -LO https://github.com/ayoisaiah/f2/releases/download/v2.0.3/f2_2.0.3_linux_amd64.rpm

# Install the package
sudo rpm -i f2_2.0.3_linux_amd64.rpm
```

## Install on macOS

### Binary Downloads

macOS users can also download F2 from the
[releases page](https://github.com/ayoisaiah/f2/releases). After downloading the
correct binary for your architecture, follow these steps:

```bash
# Download the archive
curl -LO https://github.com/ayoisaiah/f2/releases/download/v2.0.3/f2_2.0.3_darwin_amd64.tar.gz

# Extract the contents
tar -xvzf f2_2.0.3_darwin_amd64.tar.gz

# Make the binary executable
chmod +x f2

# Move the binary to your PATH
sudo mv f2 /usr/local/bin
```

## Install on Windows

### Binary Downloads

You can download the appropriate F2 binary for Windows from the
[releases page](https://github.com/ayoisaiah/f2/releases), extract it, and add
it to your system's `PATH` to use it from the command line:

```sh
# Download the archive
curl.exe -LO https://github.com/ayoisaiah/f2/releases/download/v2.0.3/f2_2.0.3_windows_amd64.tar.gz

# Extract the contents
tar -xvzf f2_2.0.3_windows_amd64.tar.gz

# Move the binary to a directory in your PATH
move f2.exe C:\Users\<user>\.bin
```

### Winget

The native Windows Package Manager can be used to install F2 directly:

```sh
winget install ayoisaiah.f2
```

### Scoop

You can also install F2 using [Scoop](https://scoop.sh/), a popular package
manager for Windows:

```sh
scoop bucket add ayoisaiah-scoop-bucket https://github.com/ayoisaiah/scoop-bucket
```

```sh
scoop install f2
```

### Chocolatey

To install F2 with [Chocolatey](https://community.chocolatey.org/packages/f2),
run the following command from the command line or PowerShell:

```sh
choco install f2
```

## Development Build

If you prefer to be on the bleeding edge, F2 provides a
[development build](https://github.com/ayoisaiah/f2/releases/tag/nightly) that
allows you to use the latest features and bug fixes directly from the `master`
branch.
