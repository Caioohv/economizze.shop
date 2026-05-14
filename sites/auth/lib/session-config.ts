export const COOKIE = 'eco_session'

export function secret(): Uint8Array {
  return new TextEncoder().encode(process.env.JWT_SECRET!)
}
