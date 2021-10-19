# licence-scan-js

## Step-by-step Instructions

The plan is to create the GitHub action to this repository and then use it from another repository [hello-react-ts](https://github.com/lauravuo/hello-react-ts). We will improve the functionality incrementally, and test the changes along the way. Let's release a new version of the action each time a PR is merged so that changes can be tested from the test project.

1. **Fork this repository and create a new feature-branch**

1. **Create a skeleton for [Javascript action](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) to your feature-branch.** You can use the placeholder texts from the instructions for now:

   1. [Create an action metadata file](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-an-action-metadata-file)
   1. [Write the action code](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#writing-the-action-code)
   1. Commit and push the changes. _Note! node_modules-directory is included in the version control on purpose!_
   1. Create PR and ask the maintainer to release a new version of the action once the PR is merged.

   You should have added following files to the root of this repository:

   ```bash
   action.yml
   index.js
   ```

1. **Fork the test repository [hello-react-ts](https://github.com/lauravuo/hello-react-ts) and create a new feature-branch**

1. **[Add a new job](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#example-using-a-public-action) to the hello-react-ts project [test workflow](https://github.com/lauravuo/hello-react-ts/blob/main/.github/workflows/test.yml) where you test the new GitHub Action you created in step 2.**
   1. Edit the file `test.yml`accordingly
   1. Commit and push changes. See the logs for your added job in Actions tab and check does the job succeed. (_Note: if the maintainer has not released yet the action, it cannot be run._)
   1. Create PR for the change.
1. **Add actual license checks using js-green-licenses.**
   1. Create new feature-branch for your _licence-scan-js_-fork.
   1. Introduce a new depedency to the project: `npm install js-green-licenses`
   1. Copy content from [this gist](https://gist.github.com/lauravuo/587e44c99dad95663875a41d0eec9a3f):
      - Replace contents of `index.js`
   1. Commit and push the changes. _Note! node_modules-directory is included in the version control on purpose!_
   1. Create PR and ask the maintainer to release a new version of the action once the PR is merged.
1. **Update the action version in the test project**
   1. Create new feature-branch for your _hello-react-ts_-fork.
   1. Edit the new job that was added in step 4 so that it uses the latest version of the scan action. Commit and push changes, and check the job logs and that the job succeeds.
   1. Create PR.
1. **Continue with further enhancements to the licence-scan-js action**:
   - Update [the action metadata](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions) with correct information
   - [Update README](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-a-readme) with usage instructions
   - Make license list configurable, so that the action user could define the allowed licenses.
   - Figure out what are the arguments that the license checker script takes and add support to those to metadata and README.
   - Add argument to action that would export all used licenses as a list and store it as [an artifact](https://docs.github.com/en/actions/advanced-guides/storing-workflow-data-as-artifacts) after the workflow is run.
   - Checkout [the actions toolkit](https://github.com/actions/toolkit) and see if this project would benefit from using that.
   - How about adding some GitHub actions to this project? What kind of automated checks/tests would be beneficial for this GitHub Action project?
