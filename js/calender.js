// 달력 변수
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "1월", "2월", "3월",
  "4월", "5월", "6월",
  "7월", "8월", "9월",
  "10월", "11월", "12월"
];

// 지금 년도와 달 가져오기
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();



// Local Storage emote
function setEmote(day, emote) {
  const emotes = JSON.parse(localStorage.getItem("emotes")) || {};
  emotes[day] = emote;
  localStorage.setItem("emotes", JSON.stringify(emotes));
}

function getEmote(day) {
  const emotes = JSON.parse(localStorage.getItem("emotes")) || {};
  return emotes[day] || "😶"; // emote[day] or 기본
}



// Local Storage todo
function setToDo(day, tasks) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};
  todos[day] = tasks;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getToDo(day) {
  const todos = JSON.parse(localStorage.getItem("todos")) || {};
  return todos[day] || [];// todos[day] or 기본
}


// To-Do 만들기
function createToDoItem(task, dayKey, todoList) {
    const li = document.createElement("li");
    li.textContent = task;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    
    deleteButton.addEventListener("click", function () {
      const updatedTasks = todoList.filter(function (x) {return x !== task;});
      setToDo(dayKey, updatedTasks);
      renderCalendar(currentYear, currentMonth);
    });
    li.appendChild(deleteButton);
  
    return li;
  }



  
// 달력 만들기 메인 함수
function renderCalendar(year, month) {
  const calendar = document.querySelector(".calendar");
  const currentMonthTitle = document.querySelector(".current-month-title");

  // 초기화
  calendar.innerHTML = "";

  // 현재 날짜 표시 타이틀
  currentMonthTitle.textContent = year + " " + monthNames[month];

  // 요일 생성
  weekdays.forEach(function (weekday) {
    const weekdayDiv = document.createElement("div");
    weekdayDiv.className = "day weekday";
    weekdayDiv.textContent = weekday;
    calendar.appendChild(weekdayDiv);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month + 1, 0).getDay();

  // 시작 빈칸 생성
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "day emptyDiv";
    calendar.appendChild(emptyDiv);
  }

  // 날짜 생성
  for (let date = 1; date <= lastDate; date++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "day";
    calendar.appendChild(dateDiv);

    const dateHeader = document.createElement("h1");
    dateHeader.className = "dateHeader";
    dateHeader.textContent = date;
    dateDiv.appendChild(dateHeader);

    const writeDiv = document.createElement("div");
    writeDiv.className = "writeDiv";
    dateDiv.appendChild(writeDiv);

    const dayKey = year + "-" + (month + 1) + "-" + date;




    // Emote 추가
    const emote = document.createElement("div");
    emote.className = "emote";

    const currentEmote = getEmote(dayKey);
    if (currentEmote === "😶") {
      emote.innerHTML = '<span style="filter: grayscale(1);">' + currentEmote + "</span>";
    } else {
      emote.innerHTML = "<span>" + currentEmote + "</span>";
    }

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip hidden";
    tooltip.innerHTML = `
      <span>😊</span>
      <span>😢</span>
      <span>😍</span>
      <span>👍</span>
      <span>👎</span>
    `;
    emote.appendChild(tooltip);
    writeDiv.appendChild(emote);

    // Emote 클릭 핸들러
    emote.addEventListener("click", function (event) {
      event.stopPropagation();
      tooltip.classList.toggle("hidden");
    });

    tooltip.addEventListener("click", function (event) {
      if (event.target.tagName === "SPAN") {
        const selectedEmote = event.target.textContent;

        if (selectedEmote === "😶") {
          emote.innerHTML = '<span style="filter: grayscale(1);">' + selectedEmote + "</span>";
        } else {
          emote.innerHTML = "<span>" + selectedEmote + "</span>";
        }

        emote.appendChild(tooltip);
        setEmote(dayKey, selectedEmote);
        tooltip.classList.add("hidden");
        tooltip.classList.toggle("hidden");
      }
    });


    // To-Do List 추가
    const todoList = getToDo(dayKey); // Local Storage에서 To-Do 불러오기

    const todoContainer = document.createElement("ul");
    todoContainer.className = "todoContainer";
    writeDiv.appendChild(todoContainer);

    // 기존 To-Do 표시
    for (let i = 0; i < todoList.length; i++) {
      const li = createToDoItem(todoList[i], dayKey, todoList);
      todoContainer.appendChild(li);
    }

    // To-Do 입력
    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.maxLength="8";
    todoInput.placeholder = "일정 추가하기";
    todoInput.className = "todoInput";

    // 입력창 숨기기 조건
    if (todoList.length >= 4) {
      todoInput.style.display = "none";
    }
    writeDiv.appendChild(todoInput);

    todoInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        const task = todoInput.value.trim();
        if (task) {
          todoList.push(task);
          setToDo(dayKey, todoList);

          // Hide the input if tasks reach 4
          if (todoList.length >= 4) {
            todoInput.style.display = "none";
          }

          renderCalendar(currentYear, currentMonth);
        }
      }
    });
  }

  // 마지막 빈칸 생성
  const remainingDays = 6 - lastDay;
  for (let i = 0; i <= remainingDays - 1; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "day emptyDiv";
    calendar.appendChild(emptyDiv);
  }
}


// 왼쪽, 오른쪽 버튼
const prevButton = document.querySelector(".prev-month");
const nextButton = document.querySelector(".next-month");

prevButton.addEventListener("click", function () {
  changeMonth(-1);
});
nextButton.addEventListener("click", function () {
  changeMonth(1);
});

// 월 변경 함수
function changeMonth(monthPlusMinus) {
  currentMonth += monthPlusMinus;

  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear += 1;
  }

  renderCalendar(currentYear, currentMonth);
}

// 초기 렌더링
renderCalendar(currentYear, currentMonth);
