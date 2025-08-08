export enum UserRoles {
  Client = "client",
  Admin = "admin",
  SubClient = "subclient",

  // for app
  Fixer = "fixer",
  Customer = "customer",
}

export enum FixerStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export enum AuthErrors {
  LogOut = "Session Expired, Loging Out!",
  LoginNeeded = "Previous Session Expired, Please login Again!",
}
export enum Environment {
  Production = "production",
  Development = "development",
  Testing = "testing",
}

export interface ISearchParams {
  page: number;
  pageSize: number;
  searchString?: string;
}

export enum InputLength {
  // commons
  DYNAMIC_INPUTS_LENGTH = 400,
  EMAIL_LENGTH = 100,
  USERNAME_LENGTH = 100,
  FIRST_LAST_NAME_LENGTH = 30,
  ADDRESS_LENGTH = 100,
  PASSWORD_LENGTH = 100,
  TABLE_TOOLBAR_SEARCH_LENGTH = 100,

  // admin
}
