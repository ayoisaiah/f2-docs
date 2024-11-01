---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'F2'
  tagline: The batch renaming tool you'll actually enjoy using.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/ayoisaiah/f2

features:
  - title: Batch File Renaming
    details:
      F2 allows you to organize your filesystem through bulk renaming, ensuring
      your files and directories follow a consistent naming scheme.
    icon: 🗂
  - title: Flexible Renaming Options
    details:
      Offers a wide range of renaming operations, from simple string
      replacements to advanced transformations using regular expressions.
    icon: 🔄
  - title: Conflict Resolution
    details:
      Ensures renaming operations are error-free by running validations and
      automatically resolving conflicts before execution.
    icon: ⚠️
    link: /guide/conflict-detection
    linkText: Learn More
  - title: Standard Renaming Recipes
    details:
      Supports renaming operations like string replacement, text insertion
      (prefix/suffix), character stripping, case changing, and more.
    link: /guide/tutorial
    linkText: See Tutorial
    icon: 📜
  - title: Built-in Variables
    details:
      Use file attributes such as Exif data for images or ID3 tags for audio
      files to enhance renaming. Also supports exiftool tags.
    icon: 🏷
    link: /guide/how-variables-work
    linkText: Learn More
  - title: High Performance
    details:
      F2 is extremely fast even with a large amout of files, ensuring minimal
      delays during renaming tasks.
    link: /reference/benchmarks
    linkText: See Benchmarks
    icon: ⚡
  - title: Undo Functionality
    details:
      You can revert any renaming operation, giving you peace of mind by
      allowing easy restoration of the previous state.
    icon: ⏪
    link: /guide/undoing-mistakes
    linkText: Learn More
  - title: Cross-Platform Support
    details:
      F2 is well-tested on Linux, Windows, and macOS, ensuring consistent
      functionality across all platforms.
    icon: 💻
    link: /guide/getting-started
    linkText: See Downloads
  - title: Extensive Documentation
    details:
      F2 is well-documented with numerous practical examples, making it easy to
      understand and use.
    icon: 📖
---
