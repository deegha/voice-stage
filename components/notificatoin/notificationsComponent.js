import { NotificationManager} from 'react-notifications'


export const CreateNotification = (type, message) => {
  return () => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message', message);
        break;
      case 'success':
        NotificationManager.success('Success message', message, 3000);
        break;
      case 'warning':
        NotificationManager.warning('Warning message', message, 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', message, 3000);
        break;
    }
  };
};