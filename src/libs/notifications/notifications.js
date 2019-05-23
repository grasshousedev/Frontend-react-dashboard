import { toast } from 'react-toastify';


export function notification(content, options = {}) {
    toast(content, options);
}

export function notificationInfo(content, options = {}) {
    notification(content, { type: toast.TYPE.INFO, ...options });
}

export function notificationSuccess(content, options = {}) {
    notification(content, { type: toast.TYPE.SUCCESS, ...options });
}

export function notificationWarning(content, options = {}) {
    notification(content, { type: toast.TYPE.WARNING, ...options });
}

export function notificationError(content, options = {}) {
    notification(content, { type: toast.TYPE.ERROR, ...options });
}

export const notify = {
    notify: notification,
    info: notificationInfo,
    success: notificationSuccess,
    warning: notificationWarning,
    error: notificationError,
};
