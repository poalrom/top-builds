export function withDefaultConfig<T, R>(defaultConfig: T, func: (config: T) => R) {
    return (partialConfig?: Partial<T>) => {
        return func({...defaultConfig, ...partialConfig});
    };
}