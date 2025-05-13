let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let autoSlide = setInterval(nextSlide, 3000); 

function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}


document.querySelector('.slider-container').addEventListener('mouseover', () => {
    clearInterval(autoSlide);
});


document.querySelector('.slider-container').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3000);
});

  
  

function refreshPage() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert("Поле не должно быть пустым.");
    } else {
        alert("Сообщение доставлено.");
      
    }

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

}


const bookedDates = [
    '2024-06-15',
    '2024-06-18',
    '2024-06-21',
    '2024-06-23',
    '2024-06-26'
  ];

  // Массив дат, которые нужно исключить (не показывать вообще)
  const excludedDates = [
    '2024-06-17',
    '2024-06-20',
    '2024-06-25'
  ];

  // Функция генерации 14 ближайших дат от сегодня
  function generateUpcomingDates() {
    const dates = [];
    const today = new Date();
    today.setHours(0,0,0,0);
    for(let i=0; i<14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const y = date.getFullYear();
      const m = (date.getMonth()+1).toString().padStart(2,'0');
      const d = date.getDate().toString().padStart(2,'0');
      const dateStr = `${y}-${m}-${d}`;
      // Пропускаем даты из excludedDates
      if(!excludedDates.includes(dateStr)){
        dates.push(dateStr);
      }
    }
    return dates;
  }

  // Форматирование даты в читаемый вид "15 Июня"
  function formatDateToReadable(dateStr) {
    const months = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря'];
    const date = new Date(dateStr + 'T00:00:00');
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  const dateListEl = document.getElementById('dateList');
  const selectedDateInput = document.getElementById('selectedDate');
  const messageEl = document.getElementById('message');

  const upcomingDates = generateUpcomingDates();

  function renderDateOptions() {
    dateListEl.innerHTML = '';
    upcomingDates.forEach(date => {
      const div = document.createElement('div');
      div.classList.add('date-item');
      div.textContent = formatDateToReadable(date);

      if(bookedDates.includes(date)) {
        div.classList.add('unavailable');
      } else {
        div.tabIndex = 0;
        div.setAttribute('role', 'button');
        div.setAttribute('aria-pressed', 'false');
        div.addEventListener('click', () => selectDate(div, date));
        div.addEventListener('keydown', e => {
          if(e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            selectDate(div, date);
          }
        });
      }

      dateListEl.appendChild(div);
    });
  }

  function selectDate(divEl, date) {
    if(divEl.classList.contains('unavailable')) return;

    let prevSelected = dateListEl.querySelector('.date-item.selected');
    if(prevSelected) {
      prevSelected.classList.remove('selected');
      prevSelected.setAttribute('aria-pressed', 'false');
    }
    divEl.classList.add('selected');
    divEl.setAttribute('aria-pressed', 'true');
    selectedDateInput.value = date;
  }

  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if(!selectedDateInput.value) {
      alert('Пожалуйста, выберите дату записи');
      return;
    }

    const name = this.name.value.trim();
    if(name.length < 2) {
      alert('Пожалуйста, введите корректное имя');
      return;
    }

    const email = this.email.value.trim();
    if(!email || !email.includes('@')) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    messageEl.style.display = 'block';
    messageEl.textContent = `Спасибо, ${name}! Ваша запись на ${formatDateToReadable(selectedDateInput.value)} принята.`;
    
    this.querySelector('button').disabled = true;

    bookedDates.push(selectedDateInput.value);

    renderDateOptions();

    selectedDateInput.value = '';
  });

  renderDateOptions();



  

