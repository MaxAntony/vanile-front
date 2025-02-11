/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ZtestImport } from ./routes/z_testest'
import { Route as ProductsImport } from './routes/z_products'
import { Route as PosImport } from './routes/pos'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as PosIndexImport } from './routes/pos.index'
import { Route as DashboardIndexImport } from './routes/dashboard.index'
import { Route as DashboardSalesImport } from './routes/dashboard.sales'
import { Route as DashboardProductsImport } from './routes/dashboard.products'
import { Route as AuthRegisterImport } from './routes/_auth.register'
import { Route as AuthLoginImport } from './routes/_auth.login'

// Create/Update Routes

const ZtestRoute = ZtestImport.update({
  id: '/z_test',
  path: '/z_test',
  getParentRoute: () => rootRoute,
} as any)

const ProductsRoute = ProductsImport.update({
  id: '/products',
  path: '/products',
  getParentRoute: () => rootRoute,
} as any)

const PosRoute = PosImport.update({
  id: '/pos',
  path: '/pos',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PosIndexRoute = PosIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PosRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardSalesRoute = DashboardSalesImport.update({
  id: '/sales',
  path: '/sales',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardProductsRoute = DashboardProductsImport.update({
  id: '/products',
  path: '/products',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
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
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/pos': {
      id: '/pos'
      path: '/pos'
      fullPath: '/pos'
      preLoaderRoute: typeof PosImport
      parentRoute: typeof rootRoute
    }
    '/products': {
      id: '/products'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsImport
      parentRoute: typeof rootRoute
    }
    '/z_test': {
      id: '/z_test'
      path: '/z_test'
      fullPath: '/z_test'
      preLoaderRoute: typeof ZtestImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/dashboard/products': {
      id: '/dashboard/products'
      path: '/products'
      fullPath: '/dashboard/products'
      preLoaderRoute: typeof DashboardProductsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/sales': {
      id: '/dashboard/sales'
      path: '/sales'
      fullPath: '/dashboard/sales'
      preLoaderRoute: typeof DashboardSalesImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof DashboardImport
    }
    '/pos/': {
      id: '/pos/'
      path: '/'
      fullPath: '/pos/'
      preLoaderRoute: typeof PosIndexImport
      parentRoute: typeof PosImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface DashboardRouteChildren {
  DashboardProductsRoute: typeof DashboardProductsRoute
  DashboardSalesRoute: typeof DashboardSalesRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardProductsRoute: DashboardProductsRoute,
  DashboardSalesRoute: DashboardSalesRoute,
  DashboardIndexRoute: DashboardIndexRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

interface PosRouteChildren {
  PosIndexRoute: typeof PosIndexRoute
}

const PosRouteChildren: PosRouteChildren = {
  PosIndexRoute: PosIndexRoute,
}

const PosRouteWithChildren = PosRoute._addFileChildren(PosRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/dashboard': typeof DashboardRouteWithChildren
  '/pos': typeof PosRouteWithChildren
  '/products': typeof ProductsRoute
  '/z_test': typeof ZtestRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/dashboard/products': typeof DashboardProductsRoute
  '/dashboard/sales': typeof DashboardSalesRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/pos/': typeof PosIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/products': typeof ProductsRoute
  '/z_test': typeof ZtestRoute
  '/login': typeof AuthLoginRoute
  '/register': typeof AuthRegisterRoute
  '/dashboard/products': typeof DashboardProductsRoute
  '/dashboard/sales': typeof DashboardSalesRoute
  '/dashboard': typeof DashboardIndexRoute
  '/pos': typeof PosIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/dashboard': typeof DashboardRouteWithChildren
  '/pos': typeof PosRouteWithChildren
  '/products': typeof ProductsRoute
  '/z_test': typeof ZtestRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/register': typeof AuthRegisterRoute
  '/dashboard/products': typeof DashboardProductsRoute
  '/dashboard/sales': typeof DashboardSalesRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/pos/': typeof PosIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/pos'
    | '/products'
    | '/z_test'
    | '/login'
    | '/register'
    | '/dashboard/products'
    | '/dashboard/sales'
    | '/dashboard/'
    | '/pos/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/products'
    | '/z_test'
    | '/login'
    | '/register'
    | '/dashboard/products'
    | '/dashboard/sales'
    | '/dashboard'
    | '/pos'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/dashboard'
    | '/pos'
    | '/products'
    | '/z_test'
    | '/_auth/login'
    | '/_auth/register'
    | '/dashboard/products'
    | '/dashboard/sales'
    | '/dashboard/'
    | '/pos/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  DashboardRoute: typeof DashboardRouteWithChildren
  PosRoute: typeof PosRouteWithChildren
  ProductsRoute: typeof ProductsRoute
  ZtestRoute: typeof ZtestRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  DashboardRoute: DashboardRouteWithChildren,
  PosRoute: PosRouteWithChildren,
  ProductsRoute: ProductsRoute,
  ZtestRoute: ZtestRoute,
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
        "/_auth",
        "/dashboard",
        "/pos",
        "/products",
        "/z_test"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/products",
        "/dashboard/sales",
        "/dashboard/"
      ]
    },
    "/pos": {
      "filePath": "pos.tsx",
      "children": [
        "/pos/"
      ]
    },
    "/products": {
      "filePath": "products.tsx"
    },
    "/z_test": {
      "filePath": "z_test.tsx"
    },
    "/_auth/login": {
      "filePath": "_auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth.register.tsx",
      "parent": "/_auth"
    },
    "/dashboard/products": {
      "filePath": "dashboard.products.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/sales": {
      "filePath": "dashboard.sales.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/": {
      "filePath": "dashboard.index.tsx",
      "parent": "/dashboard"
    },
    "/pos/": {
      "filePath": "pos.index.tsx",
      "parent": "/pos"
    }
  }
}
ROUTE_MANIFEST_END */
