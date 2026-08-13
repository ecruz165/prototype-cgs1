import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.string(),
  icon: z.string(),
  iconTone: z.enum(['danger', 'warning', 'accent', 'jira']),
  title: z.string(),
  sub: z.string(),
  tag: z.enum(['HEALTH', 'JIRA']).nullable(),
  action: z.string(),
  actionTone: z.enum(['accent', 'secondary']),
  // Job section the action navigates to, when it targets the app.
  target: z.object({ jobId: z.string(), section: z.string() }).nullable(),
});
export type AppNotification = z.infer<typeof NotificationSchema>;

export const NotificationsSchema = z.object({
  countLabel: z.string(),
  sections: z
    .object({ label: z.string(), items: NotificationSchema.array() })
    .array(),
});
export type Notifications = z.infer<typeof NotificationsSchema>;
