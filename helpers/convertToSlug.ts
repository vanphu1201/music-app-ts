import unidecode from 'unidecode';

export const converToSlug = (text: string): string => {
    const unidecodetext = unidecode(text.trim());
    const slug: string = unidecodetext.replace(/\s+/g, "-");
    return slug;
} 