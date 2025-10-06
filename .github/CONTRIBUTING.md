# Best Practices

## Styles & Coding

- JavaScript follows the [AirBnB Style Guide](https://github.com/airbnb/javascript) conventions;

Please be sure to check and follow them before attempt any modification to the sources, in order to preserve the general integrity of the project patterns.
Third-party linter plugins like ESLint, Prettier or any other similar resource are welcome (configuration files of the mentioned ones are already present).

**Note**: To run the linters properly, modify your IDE configuration (_VSCode_ recommended\*) as folllows - if needed:

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.alwaysShowStatus": true,
  "eslint.validate": ["javascript"],
  "prettier.stylelintIntegration": true,
  "prettier.disableLanguages": ["js"]
}
```

\*Assumuning all relative extensions installed

## Version Control

### Branches

Contributions implement the [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) framework. Please read about its specifications before commit on any branch.

Additionally, in order to allow the CI/CD pipelines to work properly, be sure to stricktly name branches as follows:

- **[feature_api|feature|hotfix]\_[subject]**

```bash
# i.e.

feature_api_something-new
feature_some-new-feat
hotfix_some-bug
```

### Security

For any sensitive data referred to the project - i.e. keys, password, secret settings, etc. - please make sure to set them in a local `.env*.*` file as expected and then list it in the `.gitignore`.
To make known their presence to other contributors, add them to the `.env.dist` file as a placeholder.

### Commits

Official Udacity Git commit message style guide is used. Please [consult the docs](http://udacity.github.io/git-styleguide/) for details.

## Releases

Currently, the release is automatically managed via Git Hooks.

The releasing process follows the [SemVer](https://semver.org/) specification. Please read about its guidelines before draft any release manually.
