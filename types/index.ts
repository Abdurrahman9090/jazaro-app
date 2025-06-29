export enum UserRoles {
  Client = "client",
  Admin = "admin",
  SubClient = "subclient",

  // for app
  Fixer = "fixer",
  Customer = "customer",
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
