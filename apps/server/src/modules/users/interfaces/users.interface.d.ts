// export interface FindAllUsersQuery {
//     username?: string;
//     name?: string;
//     role?: string;
// }
export type AllowedQueries = 'username' | 'name' | 'role' | 'email'

export type FindAllUsersQuery = Record<AllowedQueries, string>

export type FindAllUsersOptions = Record<AllowedQueries, boolean>
