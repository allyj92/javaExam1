const category = document.querySelector('#category');
const bookName = document.querySelector("#bookname");
const bookPriceInput = document.querySelector("#bookprice");
const registerContainer = document.querySelector("#book-list-tbody");
const sortSelect = document.querySelector('#sort-select');

let categoryValue = "";
let bookNameValue = "";
let bookPrice = "";

let count = 1; 

// 버튼
const registerBtn = document.querySelector('#register');

// 카테고리 값 추출하기
const categoryHandler = (e) => {
  categoryValue = e.target.value;
  console.log(categoryValue);
};

category.addEventListener("change", categoryHandler);

// 도서명 값 추출하기
const bookNameHandler = (e) => {
  bookNameValue = e.target.value;
};

bookName.addEventListener("input", bookNameHandler); // "change" 대신 "input" 이벤트 사용

// 가격 값 추출하기
const bookPriceHandler = (e) => {
  bookPrice = e.target.value;
  console.log(bookPrice);
};

bookPriceInput.addEventListener("input", bookPriceHandler); // "change" 대신 "input" 이벤트 사용

// 도서 등록 핸들러
const registerBtnHandler = () => {
  // 필수 값 확인
  if (categoryValue === "" || bookNameValue === "" || bookPrice === "") {
    alert("모든 항목을 입력해 주세요");
    return;
  }

  // 카테고리와 도서명이 동일한 도서가 이미 목록에 있는지 확인
  const existingBooks = Array.from(registerContainer.querySelectorAll('tr')).some(row => {
    const cells = row.querySelectorAll('td');
    return cells[1].textContent === categoryValue && cells[2].textContent === bookNameValue;
  });

  if (existingBooks) {
    alert("같은 카테고리 안에 동일한 책이 중복되어 있습니다.");
    return;
  }

 
  alert("도서가 성공적으로 등록되었습니다.");

  // 새로운 행 추가
  let newTr = document.createElement("tr");
  let newDeleteBtn = document.createElement("button");
  newDeleteBtn.type = "button";
  newDeleteBtn.textContent = "삭제";
  newDeleteBtn.classList.add('deleteBtn');

  let newTd1 = document.createElement("td");
  let newTd2 = document.createElement("td");
  let newTd3 = document.createElement("td");
  let newTd4 = document.createElement("td");

  newTd1.textContent = count++; // 도서번호는 1씩 증가
  newTd2.textContent = categoryValue;
  newTd3.textContent = bookNameValue;
  newTd4.textContent = bookPrice;

  newTr.append(newTd1, newTd2, newTd3, newTd4, newDeleteBtn);
  registerContainer.append(newTr);

  // 삭제 버튼 핸들러
  newDeleteBtn.addEventListener("click", () => {
    if (confirm("삭제하시겠습니까?")) {
      newTr.remove();
    }
  });
};

registerBtn.addEventListener("click", registerBtnHandler);

// 도서 목록 정렬 핸들러

