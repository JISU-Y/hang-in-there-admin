import z, { object, string, array, coerce, infer } from 'zod';

export const profileSchema = object({
  firstname: string().min(3, {
    message: 'Product Name must be at least 3 characters'
  }),
  lastname: string().min(3, {
    message: 'Product Name must be at least 3 characters'
  }),
  email: string().email({
    message: 'Product Name must be at least 3 characters'
  }),
  contactno: coerce.number(),
  country: string().min(1, { message: 'Please select a category' }),
  city: string().min(1, { message: 'Please select a category' }),
  // jobs array is for the dynamic fields
  jobs: array(
    object({
      jobcountry: string().min(1, { message: 'Please select a category' }),
      jobcity: string().min(1, { message: 'Please select a category' }),
      jobtitle: string().min(3, {
        message: 'Product Name must be at least 3 characters'
      }),
      employer: string().min(3, {
        message: 'Product Name must be at least 3 characters'
      }),
      startdate: string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Start date should be in the format YYYY-MM-DD'
      }),
      enddate: string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'End date should be in the format YYYY-MM-DD'
      })
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
