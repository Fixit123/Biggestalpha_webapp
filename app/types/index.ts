export const deviceTypes = [
  'Smartphone',  // Exactly as in database
  'Tablet',
  'Laptop',
  'Desktop Computer',
  'Gaming Console',
  'Smart Watch',
] as const

export type DeviceType = typeof deviceTypes[number] 