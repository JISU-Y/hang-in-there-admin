import * as z from 'zod';

import { createBannerFormSchema } from '../constants/formSchema';

export type CreateBannerFormSchemaType = z.infer<typeof createBannerFormSchema>;
