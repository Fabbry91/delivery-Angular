import { User } from "../../../Interfaces/user";
export class RoleValidaitor {
    isAdmin(user: User): boolean {
        return user.role === 'admin';
    }
    isCliente(user: User): boolean {
        return user.role === 'clientes';
    }
    isCocinero(user: User): boolean {
        return user.role === 'cocina';
    }
}