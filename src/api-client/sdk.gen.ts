// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options, formDataBodySerializer } from '@hey-api/client-fetch';
import type { UserFindAllData, UserCreateData, UserCreateResponse, UserFindOneData, UserRemoveData, UserRemoveResponse, UserUpdateData, UserUpdateResponse, ItemFindAllData, ItemFindAllResponse, ItemCreateData, ItemSearchData, ItemSearchResponse, ItemRemoveData, ItemFindOneData, ItemUpdateData, OrderFindAllData, OrderFindAllResponse, OrderCreateData, OrderCreateResponse, OrderRemoveData, OrderRemoveResponse, OrderFindOneData, OrderFindOneResponse, OrderUpdateData, OrderUpdateResponse, AuthSignInData, AuthSignInResponse2, AuthGetProfileData, AuthGetProfileResponse, CashRegisterGetOpenCashRegisterData, CashRegisterGetOpenCashRegisterResponse, CashRegisterOpenData, CashRegisterCloseData, CashRegisterRegisterTransactionData } from './types.gen';

export const client = createClient(createConfig());

export const userFindAll = <ThrowOnError extends boolean = false>(options?: Options<UserFindAllData, ThrowOnError>) => {
    return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
        url: '/user',
        ...options
    });
};

export const userCreate = <ThrowOnError extends boolean = false>(options: Options<UserCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<UserCreateResponse, unknown, ThrowOnError>({
        url: '/user',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const userFindOne = <ThrowOnError extends boolean = false>(options: Options<UserFindOneData, ThrowOnError>) => {
    return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
        url: '/user/{email}',
        ...options
    });
};

export const userRemove = <ThrowOnError extends boolean = false>(options: Options<UserRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<UserRemoveResponse, unknown, ThrowOnError>({
        url: '/user/{id}',
        ...options
    });
};

export const userUpdate = <ThrowOnError extends boolean = false>(options: Options<UserUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<UserUpdateResponse, unknown, ThrowOnError>({
        url: '/user/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const itemFindAll = <ThrowOnError extends boolean = false>(options?: Options<ItemFindAllData, ThrowOnError>) => {
    return (options?.client ?? client).get<ItemFindAllResponse, unknown, ThrowOnError>({
        url: '/item',
        ...options
    });
};

/**
 * Create a new product with an image
 */
export const itemCreate = <ThrowOnError extends boolean = false>(options: Options<ItemCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
        ...formDataBodySerializer,
        url: '/item',
        ...options,
        headers: {
            'Content-Type': null,
            ...options?.headers
        }
    });
};

export const itemSearch = <ThrowOnError extends boolean = false>(options?: Options<ItemSearchData, ThrowOnError>) => {
    return (options?.client ?? client).get<ItemSearchResponse, unknown, ThrowOnError>({
        url: '/item/search',
        ...options
    });
};

export const itemRemove = <ThrowOnError extends boolean = false>(options: Options<ItemRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<unknown, unknown, ThrowOnError>({
        url: '/item/{id}',
        ...options
    });
};

export const itemFindOne = <ThrowOnError extends boolean = false>(options: Options<ItemFindOneData, ThrowOnError>) => {
    return (options?.client ?? client).get<unknown, unknown, ThrowOnError>({
        url: '/item/{id}',
        ...options
    });
};

export const itemUpdate = <ThrowOnError extends boolean = false>(options: Options<ItemUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<unknown, unknown, ThrowOnError>({
        url: '/item/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const orderFindAll = <ThrowOnError extends boolean = false>(options?: Options<OrderFindAllData, ThrowOnError>) => {
    return (options?.client ?? client).get<OrderFindAllResponse, unknown, ThrowOnError>({
        url: '/order',
        ...options
    });
};

export const orderCreate = <ThrowOnError extends boolean = false>(options: Options<OrderCreateData, ThrowOnError>) => {
    return (options?.client ?? client).post<OrderCreateResponse, unknown, ThrowOnError>({
        url: '/order',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const orderRemove = <ThrowOnError extends boolean = false>(options: Options<OrderRemoveData, ThrowOnError>) => {
    return (options?.client ?? client).delete<OrderRemoveResponse, unknown, ThrowOnError>({
        url: '/order/{id}',
        ...options
    });
};

export const orderFindOne = <ThrowOnError extends boolean = false>(options: Options<OrderFindOneData, ThrowOnError>) => {
    return (options?.client ?? client).get<OrderFindOneResponse, unknown, ThrowOnError>({
        url: '/order/{id}',
        ...options
    });
};

export const orderUpdate = <ThrowOnError extends boolean = false>(options: Options<OrderUpdateData, ThrowOnError>) => {
    return (options?.client ?? client).patch<OrderUpdateResponse, unknown, ThrowOnError>({
        url: '/order/{id}',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const authSignIn = <ThrowOnError extends boolean = false>(options: Options<AuthSignInData, ThrowOnError>) => {
    return (options?.client ?? client).post<AuthSignInResponse2, unknown, ThrowOnError>({
        url: '/auth/login',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const authGetProfile = <ThrowOnError extends boolean = false>(options?: Options<AuthGetProfileData, ThrowOnError>) => {
    return (options?.client ?? client).get<AuthGetProfileResponse, unknown, ThrowOnError>({
        url: '/auth/profile',
        ...options
    });
};

export const cashRegisterGetOpenCashRegister = <ThrowOnError extends boolean = false>(options: Options<CashRegisterGetOpenCashRegisterData, ThrowOnError>) => {
    return (options?.client ?? client).get<CashRegisterGetOpenCashRegisterResponse, unknown, ThrowOnError>({
        url: '/cash-register/open/{userId}',
        ...options
    });
};

export const cashRegisterOpen = <ThrowOnError extends boolean = false>(options: Options<CashRegisterOpenData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
        url: '/cash-register/open',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const cashRegisterClose = <ThrowOnError extends boolean = false>(options: Options<CashRegisterCloseData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
        url: '/cash-register/close',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};

export const cashRegisterRegisterTransaction = <ThrowOnError extends boolean = false>(options: Options<CashRegisterRegisterTransactionData, ThrowOnError>) => {
    return (options?.client ?? client).post<unknown, unknown, ThrowOnError>({
        url: '/cash-register/transaction',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        }
    });
};