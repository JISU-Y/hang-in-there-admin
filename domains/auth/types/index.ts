import * as z from 'zod';

import { signinFormSchema } from '../constants/formSchema';

export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;
