export function generateTags(string) {
    const tags = string.toLowerCase().split(' ');
    tags.push(string.toLowerCase());
    tags.push(string.split(' ').map(part => part[0]).join('').toLowerCase());
    return tags;
}

export function hasTag(tags, tag) {
    const trimmedTag = tag.trim();
    for (let i=0; i<tags.length; i++) {
        if (tags[i].toLowerCase().indexOf(trimmedTag.toLowerCase()) >= 0) return true;
    }
    return false;
}
