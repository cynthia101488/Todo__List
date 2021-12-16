const elemAdd = document.querySelector('#Add');
const elemList = document.querySelector('#List');
const elemText = document.querySelector('#Input');
const elemNone = document.querySelector('#None');
let data = JSON.parse(localStorage.getItem('todoList'));

setEvent();

if (data) {
  setTemplate();
} else {
  data = [];
  elemList.classList.add('content-none');
  elemNone.classList.remove('content-none');
}

function setEvent() {
  elemText.focus();
  elemAdd.addEventListener('click', addList);
  elemText.addEventListener('keyup', addList);
  elemList.addEventListener('click', delList);
}

function addList(e) {
  if (e.keyCode === 13 || e.type === 'click') {
    if (elemText.value) {
      data.push(elemText.value);
      localStorage.setItem('todoList', JSON.stringify(data));
      setTemplate();
    }
  }
}

function delList(e) {
  const self = e.target;
  if (self.nodeName === 'BUTTON') {
    const rowIndex = self.dataset.id;
    data.splice(rowIndex, 1);
    localStorage.setItem('todoList', JSON.stringify(data));
    setTemplate();
    if (data.length === 0) {
      localStorage.removeItem('todoList');
      elemList.classList.add('content-none');
      elemNone.classList.remove('content-none');
    }
  }
}

function setTemplate() {
  elemList.classList.remove('content-none');
  elemNone.classList.add('content-none');
  let str = '';
  data.forEach((item, index) => {
    str += `<li class="content__item">
              <span class="content__body">${item}</span>
              <button class="content__btn" data-id="${index}">X</button>
            </li>`
  });
  elemList.innerHTML = str;
}