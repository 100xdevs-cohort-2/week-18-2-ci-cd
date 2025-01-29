# CI/CD

- Fork - `https://github.com/100xdevs-cohort-2/week-18-2-ci-cd`

- Then clone the forked repo

  ```
  git clone https://github.com/ajaydewangan1100/week-18-2-ci-cd.git
  ```

- `npm install`

- Go to `packages/db`

  - `npx prisma generate`

- `npm run build`

## Steps -

- adding a build pipeline for our repo -

  (Anytime a user creates a PR, we need to run npm run build and only if it succeeds should the workflow succeed)

  Add `.github/workflows/build.yml` in the root folder

  ```
    name: Build Success on PR

    on:
    pull request:
        branches:
        - master
        # - main

    jobs:
    build:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/checkout@v3
        - name: Use node.js
            uses: actions/setup-node@v3
            with:
            node-version: "20"

        - name: Install Dependencies
            run: npm install

        # - name: Generate prisma client
        #   run: cd packages/db && npx prisma generate && cd ../..

        - name: Build the project
            run: npm run build

  ```

- Push this to master branch

