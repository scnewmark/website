const update = (matches: boolean) => {
	const els = document.getElementsByClassName('view-count');
	if (matches) {
		for (let i = 0; i < els.length; i++) {
			const el = els.item(i);
			el?.classList.remove('has-text-right');
			el?.classList.add('has-text-left');
		}
	} else {
		for (let i = 0; i < els.length; i++) {
			const el = els.item(i);
			el?.classList.add('has-text-right');
			el?.classList.remove('has-text-left');
		}
	}
};

const updateViewCount = () => {
	const maxWidth = window.matchMedia('(max-width: 760px)');
	if (maxWidth.matches) update(true);

	maxWidth.addEventListener('change', (ev) => update(ev.matches));
};

export default updateViewCount;
