# TJK Hallinta

TJK-paikkojen hallinta ohjelmisto

Mindmap that includes the Database Table Structure and a Sitemap is available [here](https://whimsical.com/9A6EXPAhwpPPrJHCRbYosA).

- [TJK Hallinta](#tjk-hallinta)
  - [Tooling](#tooling)
  - [Packages / Apps / Services](#packages--apps--services)
    - [API](#api)
    - [Web](#web)
  - [Building & Running](#building--running)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)

## Tooling

| Name:       | Description:                                     |
| ----------- | ------------------------------------------------ |
| Typescript  | Superset of Javascript with typings added on top |
| Yarn        | Package Manager                                  |
| ESLint      | Javascript Linter                                |
| Prettier    | Code Formatter                                   |
| Commitlint  | Commit message linter                            |
| Husky       | Git Hooks                                        |
| lint-staged | Lint staged files                                |

## Packages / Apps / Services

| Name: | Info:       |
| ----- | ----------- |
| API   | GraphQL API |
| Web   | Website     |

### API

Packages Used:

| Package Name:         | Description:                                                             |
| --------------------- | ------------------------------------------------------------------------ |
| express               | Web server framework                                                     |
| apollo-server-express | GraphQL middleware for Express                                           |
| type-graphql          | Easy way to write GraphQL with Typescript                                |
| typeorm               | Easy way to write database entities and manage connections in Typescript |
| dataloader            | Easy way to load the same data only once per request                     |

### Web

Packages Used:

| Package Name:       | Description:                         |
| ------------------- | ------------------------------------ |
| react               | UI Library                           |
| react-dom           | React mappings for Web               |
| apollo-boost        | Quickstart for Apollo Client         |
| create-react-app    | Starter kit for React                |
| @material-ui/core   | Material Design components for React |
| @material-ui/icons  | Material Design icons for React      |
| @apollo/react-hooks | React hooks for Apollo Client        |
| @reach/router       | Router for React                     |

## Building & Running

Requirements:

- Node.js v12.x
- Yarn v1.x

Clone this repository and run `yarn` in the repository root

### Development Mode

Run `yarn dev:api` and `yarn dev:web`

### Production Build

Run `yarn build:api` and `yarn build:web`

And then serve the static web files on a static file host
And run `yarn start:api` on a server to start the API Server
