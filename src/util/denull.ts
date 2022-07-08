export function deNull<T>(input: T | null | undefined, defaultValue: T): T
{
    if(input === null || input ===undefined)
    {
        return defaultValue
    }

    return input
}