// This file is auto-generated by @hey-api/openapi-ts

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type UpdateUserDto = {
  [key: string]: unknown;
};

export type CreateItemDto = {
  /**
   * Name of the product
   */
  name: string;
  /**
   * Price of the product
   */
  price: number;
  /**
   * Product image file
   */
  image: Blob | File;
};

export type Item = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type UpdateItemDto = {
  /**
   * Name of the product
   */
  name?: string;
  /**
   * Price of the product
   */
  price?: number;
  /**
   * Product image file
   */
  image?: Blob | File;
};

export type OrderItem = {
  id: number;
  quantity: number;
};

export type CreateOrderDto = {
  totalAmount: number;
  items: Array<OrderItem>;
};

export type ItemResponse = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type OrderItemResponse = {
  item: ItemResponse;
  quantity: number;
};

export type GetOrder = {
  totalAmount: number;
  createdAt: string;
  items: Array<OrderItemResponse>;
};

export type UpdateOrderDto = {
  totalAmount?: number;
  items?: Array<OrderItem>;
};

export type SignInDto = {
  email: string;
  password: string;
};

export type AuthSignInResponse = {
  access_token: string;
};

export type AuthProfileResponse = {
  id: number;
  name: string;
  email: string;
};

export type CashRegister = {
  status: 'OPEN' | 'CLOSE';
  id: number;
  userId: number;
  openDate: string;
  closeDate?: string;
  initialAmount: number;
  finalAmount?: number;
};

export type OpenCashRegisterDto = {
  userId: number;
  initialAmount: number;
};

export type CloseCashRegisterDto = {
  userId: number;
  finalAmount: number;
};

export type RegisterTransactionDto = {
  type: 'INCOME' | 'EXPENSE';
  userId: number;
  amount: number;
  description: string;
};

export type UserFindAllData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/user';
};

export type UserFindAllResponses = {
  200: Array<User>;
};

export type UserFindAllResponse = UserFindAllResponses[keyof UserFindAllResponses];

export type UserCreateData = {
  body: CreateUserDto;
  path?: never;
  query?: never;
  url: '/user';
};

export type UserCreateResponses = {
  201: string;
};

export type UserCreateResponse = UserCreateResponses[keyof UserCreateResponses];

export type UserFindOneData = {
  body?: never;
  path: {
    email: string;
  };
  query?: never;
  url: '/user/{email}';
};

export type UserFindOneResponses = {
  200: unknown;
};

export type UserRemoveData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/user/{id}';
};

export type UserRemoveResponses = {
  200: string;
};

export type UserRemoveResponse = UserRemoveResponses[keyof UserRemoveResponses];

export type UserUpdateData = {
  body: UpdateUserDto;
  path: {
    id: string;
  };
  query?: never;
  url: '/user/{id}';
};

export type UserUpdateResponses = {
  200: string;
};

export type UserUpdateResponse = UserUpdateResponses[keyof UserUpdateResponses];

export type ItemFindAllData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/item';
};

export type ItemFindAllResponses = {
  200: Array<Item>;
};

export type ItemFindAllResponse = ItemFindAllResponses[keyof ItemFindAllResponses];

export type ItemCreateData = {
  /**
   * Form data for creating a product
   */
  body: CreateItemDto;
  path?: never;
  query?: never;
  url: '/item';
};

export type ItemCreateErrors = {
  /**
   * Invalid input data.
   */
  400: unknown;
};

export type ItemCreateResponses = {
  201: unknown;
};

export type ItemSearchData = {
  body?: never;
  path?: never;
  query?: {
    /**
     * Texto para buscar items por nombre
     */
    query?: string;
  };
  url: '/item/search';
};

export type ItemSearchResponses = {
  200: Array<Item>;
};

export type ItemSearchResponse = ItemSearchResponses[keyof ItemSearchResponses];

export type ItemRemoveData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/item/{id}';
};

export type ItemRemoveResponses = {
  200: unknown;
};

export type ItemFindOneData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/item/{id}';
};

export type ItemFindOneResponses = {
  200: unknown;
};

export type ItemUpdateData = {
  body: UpdateItemDto;
  path: {
    id: string;
  };
  query?: never;
  url: '/item/{id}';
};

export type ItemUpdateResponses = {
  200: unknown;
};

export type OrderFindAllData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/order';
};

export type OrderFindAllResponses = {
  200: Array<GetOrder>;
};

export type OrderFindAllResponse = OrderFindAllResponses[keyof OrderFindAllResponses];

export type OrderCreateData = {
  body: CreateOrderDto;
  path?: never;
  query?: never;
  url: '/order';
};

export type OrderCreateResponses = {
  201: {
    [key: string]: unknown;
  };
};

export type OrderCreateResponse = OrderCreateResponses[keyof OrderCreateResponses];

export type OrderRemoveData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/order/{id}';
};

export type OrderRemoveResponses = {
  200: string;
};

export type OrderRemoveResponse = OrderRemoveResponses[keyof OrderRemoveResponses];

export type OrderFindOneData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: '/order/{id}';
};

export type OrderFindOneResponses = {
  200: string;
};

export type OrderFindOneResponse = OrderFindOneResponses[keyof OrderFindOneResponses];

export type OrderUpdateData = {
  body: UpdateOrderDto;
  path: {
    id: string;
  };
  query?: never;
  url: '/order/{id}';
};

export type OrderUpdateResponses = {
  200: string;
};

export type OrderUpdateResponse = OrderUpdateResponses[keyof OrderUpdateResponses];

export type AuthSignInData = {
  body: SignInDto;
  path?: never;
  query?: never;
  url: '/auth/login';
};

export type AuthSignInResponses = {
  200: AuthSignInResponse;
};

export type AuthSignInResponse2 = AuthSignInResponses[keyof AuthSignInResponses];

export type AuthGetProfileData = {
  body?: never;
  path?: never;
  query?: never;
  url: '/auth/profile';
};

export type AuthGetProfileResponses = {
  200: AuthProfileResponse;
};

export type AuthGetProfileResponse = AuthGetProfileResponses[keyof AuthGetProfileResponses];

export type CashRegisterGetOpenCashRegisterData = {
  body?: never;
  path: {
    userId: number;
  };
  query?: never;
  url: '/cash-register/open/{userId}';
};

export type CashRegisterGetOpenCashRegisterResponses = {
  200: CashRegister;
};

export type CashRegisterGetOpenCashRegisterResponse = CashRegisterGetOpenCashRegisterResponses[keyof CashRegisterGetOpenCashRegisterResponses];

export type CashRegisterOpenData = {
  body: OpenCashRegisterDto;
  path?: never;
  query?: never;
  url: '/cash-register/open';
};

export type CashRegisterOpenResponses = {
  201: unknown;
};

export type CashRegisterCloseData = {
  body: CloseCashRegisterDto;
  path?: never;
  query?: never;
  url: '/cash-register/close';
};

export type CashRegisterCloseResponses = {
  201: unknown;
};

export type CashRegisterRegisterTransactionData = {
  body: RegisterTransactionDto;
  path?: never;
  query?: never;
  url: '/cash-register/transaction';
};

export type CashRegisterRegisterTransactionResponses = {
  201: unknown;
};

export type ClientOptions = {
  baseUrl: string;
};
