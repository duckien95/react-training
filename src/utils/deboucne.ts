
export const debounce = (callback: Function, wait: number) => {
    let timeoutId: number = 0;
    return (...args: unknown[]) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args);
        }, wait);
    };
}