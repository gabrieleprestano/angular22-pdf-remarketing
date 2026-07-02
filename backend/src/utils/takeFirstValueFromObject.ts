export const takeFirstValueFromObject = (obj: string | number): string => {
    const firstKey = Object.values(obj)[0];
    return firstKey ? String(firstKey) : '—';
}