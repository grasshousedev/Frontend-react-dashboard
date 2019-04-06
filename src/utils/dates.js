import moment from 'moment';

export function dateToUI(date) {
    if (!date) return '';

    return moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY');
}