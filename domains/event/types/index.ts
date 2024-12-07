import * as z from 'zod';

import { updateEventFormSchema } from '../constants/formSchema';

export type UpdateEventFormSchemaType = z.infer<typeof updateEventFormSchema>;
