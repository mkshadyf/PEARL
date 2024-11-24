import { useNotificationStore } from '../../stores/notificationStore';
import Notification from './Notification';
import type { Notification as NotificationType } from '../../types';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification: NotificationType) => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          isVisible={true}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
} 