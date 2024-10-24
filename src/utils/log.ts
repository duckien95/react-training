export function log(...args: unknown[]) {
    if (window.location.search.includes('log')) {
        console.log(...args)
    }
}