export const extractDateFromString = (date: string | null): string => {
    if (!date) return '—';

    const day = date.slice(0, 2);
    const month = date.slice(2, 4);
    const year = date.slice(4, 8);
    return `${day}/${month}/${year}`;
}