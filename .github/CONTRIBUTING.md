<h2 align="center" style="color:red;font-weight:bold;font-size:30px;">UNDER REVIEW AND REVISION</h2>

# Contributing to the Team Project

#### Table of Contents

[Reporting Bugs](#reporting-bugs)
* [How do I Submit A (Good) Bug Report?](#how-do-i-submit-a-good-bug-report)


[Pull Requests](#pull-requests)

[Styleguides](#styleguides)
* [Git Commit Messages](#git-commit-messages)
* [JavaScript Styleguide](#javascript-styleguide)
* [TypeScript Styleguide](#typescript-styleguide)

## Reporting Bugs
This section is a guide to submitting bugs and issues with the website. Please follow these guidelines to help us understand your report, reproduce the behavior, and find related problems.

Before creating a report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report), and fill out [the required template](ISSUE_TEMPLATE.md), as this information helps us resolve issues faster.
> **Note:** If you find a **Closed** issue that looks like the same thing you're experiencing, open a new issue and include a link to the original issue in your new one.

### How do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). To create an issue, provide teh following information by filling in [the template](ISSUE_TEMPLATE.md).

Explain the problem and include additional details to help us reproduce the problems.

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you openned the site, e.g. which web browser were you in, and how did you get there. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you filled out a form, explain if you used the mouse, or a keyboard shortcut, and if so which one?
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context 

## Pull Requests

* Fill in [the required template](PULL_REQUEST_TEMPLATE.md)
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the [JavaScript](#javascript-styleguide) and [TypesScript](#typescript-styleguide) styleguides.
* Include thoughtfully-worded, well-structured [Jasmine](https://jasmine.github.io/) specs in the `./spec` folder. Run them using `npm run test`. See the [Specs Styleguide](#specs-styleguide) below.
* End all files with a newline
* Place requires in the following order:
    * Built in Node Modules (such as `path`)
    * Local Modules (using relative paths)
* Place class properties in the following order:
    * Class methods and properties (methods starting with a `@` in TypeScript or `static` in JavaScript)
    * Instance methods and properties
<!-- * Document new code based on the [Documentation Styleguide](#documentation-styleguide) -->

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :non-potable_water: `:non-potable_water:` when plugging memory leaks
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

### TypeScript Styleguide

*Include TypeScript Formating*

### Specs Styleguide

- Include thoughtfully-worded, well-structured [Jasmine](https://jasmine.github.io/) specs in the `./spec` folder.
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.

#### Example

```ts
describe('a dog', () => {
	it('barks', () => {
	#spec here
	})
 describe('when the dog is happy', () => {
	it('wags its tail', () => {
	# spec here
  })
 })
})
```
