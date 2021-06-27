import { INotificationContext } from '@/types';
import { createContext } from 'react';

export const NotificationContext = createContext<INotificationContext>({
	notifications: [],
	createNotification: () => null,
	deleteNotification: () => null
});
