import { toast as sonnerToast } from 'sonner';

export function useToast() {
  return {
    toast: ({ title, description, type = 'default' }) => {
      const options = {
        description,
        className: 'font-sans',
      };

      switch (type) {
        case 'success':
          sonnerToast.success(title, options);
          break;
        case 'error':
          sonnerToast.error(title, options);
          break;
        case 'warning':
          sonnerToast.warning(title, options);
          break;
        default:
          sonnerToast(title, options);
      }
    },
  };
}
