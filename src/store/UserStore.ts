type User = { id: string; name: string; email: string; role?: "admin" | "user"; createdAt?: number };
type CreateUser = Omit<User, "id" | "role" | "createdAt">;

function withDefaults<T extends (...args: any[]) => any>(fn: T) {
  // Decorador que agrega propiedades por defecto al create
  return ((...args: any[]) => {
    const payload = args[0];
    const enriched = { ...payload, role: "user", createdAt: Date.now() };
    return fn(enriched);
  }) as T;
}

export class UserStore {
  private users: User[] = [];

  list() {
    console.log("[HTTP GET] /users");
    return this.users;
  }

  findByName(name: string) {
    console.log("[HTTP GET] /users?name=" + name);
    return this.users.find(u => u.name.toLowerCase() === name.toLowerCase());
  }

  @withDefaults
  create(u: CreateUser & { role?: "admin" | "user"; createdAt?: number }) {
    console.log("[HTTP POST] /users");
    const id = (Math.random()*1e6).toFixed(0);
    const user: User = { id, ...u };
    this.users.push(user);
    return user;
  }

  update(id: string, patch: Partial<User>) {
    console.log("[HTTP PATCH] /users/" + id);
    const i = this.users.findIndex(u => u.id === id);
    if (i === -1) throw new Error("Usuario no encontrado");
    this.users[i] = { ...this.users[i], ...patch };
    return this.users[i];
  }

  remove(id: string) {
    console.log("[HTTP DELETE] /users/" + id);
    const before = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return before !== this.users.length;
  }
}
