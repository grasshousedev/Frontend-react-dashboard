export function preload() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}