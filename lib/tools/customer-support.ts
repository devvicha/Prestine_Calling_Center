/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { FunctionResponseScheduling } from '@google/genai';
import { FunctionCall } from '../state';

export const customerSupportTools: FunctionCall[] = [
  // Car Wash Booking Tools
  {
    name: 'book_car_wash',
    description: 'ගෙදර ඇවිත් කරන mobile car wash service එකක් සදහා වේලාවක් හා දිනයක් වෙන් කරයි. පාරිභෝගිකයාගේ ස්ථානයට අපේ කණ්ඩායම පැමිණෙනවා.',
    parameters: {
      type: 'OBJECT',
      properties: {
        customer_name: {
          type: 'STRING',
          description: 'පාරිභෝගිකයාගේ නම.',
        },
        customer_phone: {
          type: 'STRING',
          description: 'පාරිභෝගිකයාගේ දුරකථන අංකය.',
        },
        service_address: {
          type: 'STRING',
          description: 'car wash service එක කරන්න ඕන ස්ථානය (පාරිභෝගිකයාගේ ලිපිනය).',
        },
        preferred_date: {
          type: 'STRING',
          description: 'service එකට කැමති දිනය.',
        },
        preferred_time: {
          type: 'STRING',
          description: 'service එකට කැමති වේලාව.',
        },
        package_type: {
          type: 'STRING',
          description: 'තෝරා ගත් package වර්ගය (Standard or AutoGlym).',
        },
        service_name: {
          type: 'STRING',
          description: 'තෝරා ගත් service එකේ නම (උදා: Wash and Vacuum, Interior Detail, Full Detail).',
        },
        vehicle_type: {
          type: 'STRING',
          description: 'වාහන වර්ගය (Car/Mini Van, Crossover, SUV, or Van).',
        },
        total_price: {
          type: 'NUMBER',
          description: 'මුළු මිල (LKR).',
        },
      },
      required: ['customer_name', 'customer_phone', 'service_address', 'preferred_date', 'preferred_time', 'package_type', 'service_name', 'vehicle_type', 'total_price'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
  // General Service Tools
  {
    name: 'log_complaint',
    description: 'පාරිභෝගික පැමිණිල්ලක් පද්ධතියේ සටහන් කර ඒ සඳහා පැමිණිලි අංකයක් ජනනය කරයි.',
    parameters: {
      type: 'OBJECT',
      properties: {
        complaint_details: {
          type: 'STRING',
          description: 'පැමිණිල්ලේ සම්පූර්ණ විස්තරය.',
        },
        customer_contact: {
          type: 'STRING',
          description: 'පාරිභෝගිකයා සම්බන්ධ කර ගත හැකි දුරකථන අංකයක් හෝ විද්‍යුත් තැපැල් ලිපිනයක්.',
        },
      },
      required: ['complaint_details', 'customer_contact'],
    },
    isEnabled: true,
    scheduling: FunctionResponseScheduling.INTERRUPT,
  },
];