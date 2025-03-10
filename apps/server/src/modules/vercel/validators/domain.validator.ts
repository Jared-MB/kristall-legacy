import { z } from 'zod';

export const domainSchema = z.string().includes('kristall.app').endsWith('kristall.app')