export const setElementText = (el, text) => {
  if (el) {
    el.innerHTML = text;
  }
};

export const appendElementText = (el, { className, text, tag = "span" }) => {
  if (el) {
    let newElement;
    if (className) {
      newElement = document.createElement(tag);
      newElement.innerHTML = text;
      newElement.classList.add(className);
    } else {
      newElement = document.createTextNode(text);
    }

    el.appendChild(newElement);
  }
};

export const getCheckedTextBySelector = (selector) => {
  const result = [];

  document.querySelectorAll(selector).forEach(({ innerText }) => {
    result.push(innerText);
  });

  return result;
};
