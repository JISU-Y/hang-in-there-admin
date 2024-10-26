import * as z from 'zod';

import { memberFormSchema } from '../constants/formSchema';

export type MemberFormSchemaType = z.infer<typeof memberFormSchema>;
