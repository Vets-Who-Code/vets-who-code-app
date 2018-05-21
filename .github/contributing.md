# Contributing

These are just guidelines, not rules, use your best judgment and feel free to propose changes to this document in a pull request.

## What should I know before I get started?

### Code of Conduct

This project adheres to the Contributor Covenant [code of conduct](https://github.com/Vets-Who-Code/vwc-site/blob/master/.github/code-of-conduct.md).
By participating, you are expected to uphold this code.
Please report unacceptable behavior to [admin](mailto:admin@vetswhocode.io).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for Censible. Following these guidelines helps maintainers understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). If you'd like, you can use [this template](#template-for-submitting-bug-reports) to structure the information.

#### Before Submitting A Bug Report

* **Perform a [cursory search](https://github.com/issues?q=+is%3Aissue+user%3AVets-Who-Code)** to see if the problem has already been reported. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/).  Please submit [here](https://github.com/Vets-Who-Code/vwc-site/issues)

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started Atom, e.g. which command exactly you used in the terminal, or how you started Atom otherwise. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you moved the cursor to the end of a line, explain if you used the mouse, or a keyboard shortcut or an Atom command, and if so which one?
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](http://www.cockos.com/licecap/) to record GIFs on OSX and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.
* If the problem is related to working with files (e.g. opening and editing files), **does the problem happen for all files and projects or only some?** Does the problem happen only when working with local or remote files (e.g. on network drives), with files of a specific type (e.g. only JavaScript or Pug files), with large files or files with very long lines, or with files in a specific encoding? Is there anything else special about the files you are using?

### Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [Airbnb](https://github.com/airbnb/javascript) styleguide.
* Include thoughtfully-worded, well-structured [Jest](https://facebook.github.io/jest/) tests in the `./__tests__` folder if applicable. Run them using `npm test`.

### Branch Naming Convention

Slash Notation with the following prefixes:

* feature
* refactor
* bug

e.g.
```
feature/something
refactor/something
bug/something
```

You are not limited to these three, but most changes can be standardized to fit within them.
