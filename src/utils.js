export function isValid(value) {
    return value.length >= 10

}

export function modalWindow(title, content) {
    let modalEl = document.createElement('div');

    modalEl.classList.add("modal")

    modalEl.innerHTML = `
<h1>${title}</h1>
<div class="modalContent">${content}</div>
`;

    mui.overlay('on', modalEl)

}
