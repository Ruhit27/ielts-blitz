// Browser-only. localStorage is shared by everyone using this browser, so each signed-in
// user gets their own keys. Signed-out use keeps the original unscoped keys.
let user: string | null = null;
let resolved = false;

export const getUser = () => user;
/** False until Clerk has said who (if anyone) is signed in; stores show nothing until then. */
export const isResolved = () => resolved;
export const scoped = (base: string) => (user ? `${base}:${user}` : base);

export function setUser(id: string | null) {
  user = id;
  resolved = true;
}
