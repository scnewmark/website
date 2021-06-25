const stopWords = [
	'A', 'ABOUT', 'ACTUALLY', 'ALMOST', 'ALSO', 'ALTHOUGH', 'ALWAYS', 'AM', 'AN', 'AND', 'ANY', 'ARE', 'AS',
	'AT', 'BE', 'BECAME', 'BECOME', 'BUT', 'BY', 'CAN', 'COULD', 'DID', 'DO', 'DOES', 'EACH', 'EITHER', 'ELSE',
	'FOR', 'FROM', 'HAD', 'HAS', 'HAVE', 'HENCE', 'HOW', 'I', 'IF', 'IN', 'IS', 'IT', 'ITS', 'JUST', 'MAY', 'MAYBE',
	'ME', 'MIGHT', 'MINE', 'MUST', 'MY', 'MINE', 'MUST', 'MY', 'NEITHER', 'NOR', 'NOT', 'OF', 'OH', 'OK', 'WHEN',
	'WHERE', 'WHEREAS', 'WHEREVER', 'WHENEVER', 'WHETHER', 'WHICH', 'WHILE', 'WHO', 'WHOM', 'WHOEVER', 'WHOSE',
	'WHY', 'WILL', 'WITH', 'WITHIN', 'WITHOUT', 'WOULD', 'YES', 'YET', 'YOU', 'YOUR'];

const normalizeTitle = (title: string): string => title.split(' ').filter(word => !stopWords.includes(word.toUpperCase())).join(' ').toLowerCase().replace(/\s/g, '-').replace(/[.,]/g, '');

export default normalizeTitle;
