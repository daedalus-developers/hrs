import { Session, User } from "lucia"

export type ContextVars = {
  user: User | null,
  session: Session | null
}
