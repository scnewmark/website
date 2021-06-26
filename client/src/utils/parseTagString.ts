const parseTagString = (tags: string) => tags.trim().replace(/,$/g, '').split(',').map(tag => tag.trim());

export default parseTagString;
