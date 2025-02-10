/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestImport } from './routes/test'
import { Route as ProductsImport } from './routes/products'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AuthLayoutImport } from './routes/_auth/_layout'
import { Route as AuthLayoutRegisterImport } from './routes/_auth/_layout/register'
import { Route as AuthLayoutLoginImport } from './routes/_auth/_layout/login'

// Create/Update Routes

const TestRoute = TestImport.update({
  id: '/test',
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const ProductsRoute = ProductsImport.update({
  id: '/products',
  path: '/products',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_auth/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AuthLayoutRegisterRoute = AuthLayoutRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutLoginRoute = AuthLayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/products': {
      id: '/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      id: '/test'
      path: '/test'
      fullPath: '/test'
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout': {
      id: '/_auth/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_layout/login': {
      id: '/_auth/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLayoutLoginImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_auth/_layout/register': {
      id: '/_auth/_layout/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthLayoutRegisterImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthLayoutLoginRoute: typeof AuthLayoutLoginRoute
  AuthLayoutRegisterRoute: typeof AuthLayoutRegisterRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutLoginRoute: AuthLayoutLoginRoute,
  AuthLayoutRegisterRoute: AuthLayoutRegisterRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products': typeof ProductsRoute
  '/test': typeof TestRoute
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products': typeof ProductsRoute
  '/test': typeof TestRoute
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/products': typeof ProductsRoute
  '/test': typeof TestRoute
  '/_auth/_layout': typeof AuthLayoutRouteWithChildren
  '/_auth/_layout/login': typeof AuthLayoutLoginRoute
  '/_auth/_layout/register': typeof AuthLayoutRegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/products'
    | '/test'
    | ''
    | '/login'
    | '/register'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/products' | '/test' | '' | '/login' | '/register'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/products'
    | '/test'
    | '/_auth/_layout'
    | '/_auth/_layout/login'
    | '/_auth/_layout/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  ProductsRoute: typeof ProductsRoute
  TestRoute: typeof TestRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  ProductsRoute: ProductsRoute,
  TestRoute: TestRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/products",
        "/test",
        "/_auth/_layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/products": {
      "filePath": "products.tsx"
    },
    "/test": {
      "filePath": "test.tsx"
    },
    "/_auth/_layout": {
      "filePath": "_auth/_layout.tsx",
      "children": [
        "/_auth/_layout/login",
        "/_auth/_layout/register"
      ]
    },
    "/_auth/_layout/login": {
      "filePath": "_auth/_layout/login.tsx",
      "parent": "/_auth/_layout"
    },
    "/_auth/_layout/register": {
      "filePath": "_auth/_layout/register.tsx",
      "parent": "/_auth/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
