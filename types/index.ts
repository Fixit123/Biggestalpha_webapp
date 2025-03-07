export interface Service {
  id: number
  name: string
  description: string
  image: string
  category: string
  featured: boolean
}

export const deviceTypes = ['Smartphone', 'Laptop', 'Smartwatch', 'Tablet', 'Other'] as const
export type DeviceType = typeof deviceTypes[number] 