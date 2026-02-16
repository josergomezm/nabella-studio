import { z } from 'zod'

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  duration: z.string(),
  description: z.string(),
  image: z.string().optional(),
  perArea: z.boolean().default(false),
  units: z.string().optional(),
  sessions: z.number().int().positive().optional(),
})

export type Service = z.infer<typeof ServiceSchema>

export const ServiceCategorySchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  description: z.string(),
  services: z.array(ServiceSchema).min(1),
})

export type ServiceCategory = z.infer<typeof ServiceCategorySchema>

export const HighlightSchema = z.object({
  icon: z.string(),
  label: z.string(),
})

export type Highlight = z.infer<typeof HighlightSchema>

export const ContactDetailsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  notes: z.string().optional(),
})

export type ContactDetails = z.infer<typeof ContactDetailsSchema>

export const BookingSchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
}).merge(ContactDetailsSchema)

export type Booking = z.infer<typeof BookingSchema>
