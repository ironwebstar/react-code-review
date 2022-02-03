# Overview
## Design pattern
The project is structured in a layered architecture that conforms to an `eslint` dependency rule, whereby source code dependencies can only point to their immediate descendant. i.e; the `App` layer has no knowledge of `Data`, it can only interact with `Domain`.

```
┌───────────────┐
│ App           │
└───────┬───────┘
        │
┌───────▼───────┐
│ Domain        │
└───────┬───────┘
        │
┌───────▼───────┐
│ Data          │
└───────────────┘
```
### Data layer
The Data layer contains the openapi generated axios client.

### Domain layer
The Domain layer is responsibile for calling the api requests from the `Data` layer, the api responses are sanitised into domain model objects that are consumed by the rendering components in the App layer. In the case of complex screens that require multiple api requests, the Domain layer must aggregate the responses into a single coehesive object.

### App layer
The React application responsible for rendering the webapp components.

# Getting Started
## Prerequities
- NodeJS (v16 or higher)

### Update openapi spec submodule
```
git submodule update --init --recursive
```

### Yarn
```
npm install --global yarn
```
### Typescript
```
yarn global add typescript
```

## Build, run, lint
### Install dependencies
```
yarn install
```

### Start dev
```
yarn start
```

### Build & Package
```
yarn build
```

## Lint
```
yarn lint
```

### Lint fix
```
yarn lint:fix
```

## More
### Swiss IBAN sample
```
CH93 0076 2011 6238 5295 7
```

## TODO
- Session timeout should reset all reducers to their initial state
- A configurable skeleton for loading detail views
- Spike prices in edit price packages
- Style the tabs with secondary color and thicker bottom border
- error message translations
- breadcrumb 
- app back button
- consistent detail/list view redirects 
- app font
- pdf download in all participants billing