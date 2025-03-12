const theme = localStorage.getItem('theme') || 'light';
if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.getElementById('theme-toggle-btn').classList.add('dark-button');
    document.getElementById('theme-toggle-btn').classList.remove('light-button');
    document.getElementById('theme-toggle-btn').textContent = 'Switch to Light Mode';
    document.getElementById('timer').classList.add('dark-mode');
    updateButtonStyles('dark');
} else {
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    document.getElementById('theme-toggle-btn').classList.add('light-button');
    document.getElementById('theme-toggle-btn').classList.remove('dark-button');
    document.getElementById('theme-toggle-btn').textContent = 'Switch to Dark Mode';
    document.getElementById('timer').classList.add('light-mode');
    updateButtonStyles('light');
}

document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        document.getElementById('theme-toggle-btn').classList.add('dark-button');
        document.getElementById('theme-toggle-btn').classList.remove('light-button');
        document.getElementById('theme-toggle-btn').textContent = 'Switch to Light Mode';
        document.getElementById('timer').classList.add('dark-mode');
        document.getElementById('timer').classList.remove('light-mode');
        updateButtonStyles('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        document.getElementById('theme-toggle-btn').classList.add('light-button');
        document.getElementById('theme-toggle-btn').classList.remove('dark-button');
        document.getElementById('theme-toggle-btn').textContent = 'Switch to Dark Mode';
        document.getElementById('timer').classList.add('light-mode');
        document.getElementById('timer').classList.remove('dark-mode');
        updateButtonStyles('light');
        localStorage.setItem('theme', 'light');
    }
});

function updateButtonStyles(mode) {
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    if (mode === 'dark') {
        startBtn.classList.add('dark-mode');
        startBtn.classList.remove('light-mode');
        pauseBtn.classList.add('dark-mode');
        pauseBtn.classList.remove('light-mode');
        resetBtn.classList.add('dark-mode');
        resetBtn.classList.remove('light-mode');
    } else {
        startBtn.classList.add('light-mode');
        startBtn.classList.remove('dark-mode');
        pauseBtn.classList.add('light-mode');
        pauseBtn.classList.remove('dark-mode');
        resetBtn.classList.add('light-mode');
        resetBtn.classList.remove('dark-mode');
    }
}

let countdown;
let timeLeft = 0;
let timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const inputSeconds = document.getElementById('input-seconds');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft > 10) {
        document.body.style.backgroundColor = 'green';
    } else if (timeLeft <= 10 && timeLeft > 5) {
        document.body.style.backgroundColor = 'yellow';
    } else {
        document.body.style.backgroundColor = 'red';
    }
}

startBtn.addEventListener('click', () => {
    timeLeft = parseInt(inputSeconds.value, 10);
    if (isNaN(timeLeft) || timeLeft <= 0) return;

    updateTimerDisplay();

    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
        }
    }, 1000);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    clearInterval(countdown);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener('click', () => {
    clearInterval(countdown);
    timeLeft = 0;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
});

document.getElementById('change-style-btn').addEventListener('click', () => {
    document.getElementById('timer').style.backgroundColor = 'pink';
});

document.getElementById('sort-btn').addEventListener('click', () => {
    let list = Array.from(document.getElementById('item-list').children);
    list.sort((a, b) => a.textContent.localeCompare(b.textContent));
    document.getElementById('item-list').innerHTML = '';
    list.forEach(item => document.getElementById('item-list').appendChild(item));
});

document.getElementById('filter-btn').addEventListener('click', () => {
    let items = Array.from(document.getElementById('item-list').children);
    let uniqueItems = Array.from(new Set(items.map(item => item.textContent)))
                            .map(itemText => items.find(item => item.textContent === itemText));
    document.getElementById('item-list').innerHTML = '';
    uniqueItems.forEach(item => document.getElementById('item-list').appendChild(item));
});

document.getElementById('reverse-btn').addEventListener('click', () => {
    let list = Array.from(document.getElementById('item-list').children);
    list.reverse();
    document.getElementById('item-list').innerHTML = '';
    list.forEach(item => document.getElementById('item-list').appendChild(item));
});

document.getElementById('add-row-btn').addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    const age = document.getElementById('age-input').value;
    if (name && age) {
        const table = document.getElementById('dynamic-table').getElementsByTagName('tbody')[0];
        const row = table.insertRow();
        row.innerHTML = `<td>${name}</td><td>${age}</td><td><button class="delete-btn">Delete</button></td>`;
        document.getElementById('name-input').value = '';
        document.getElementById('age-input').value = '';
    }
});

document.getElementById('dynamic-table').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('delete-btn')) {
        e.target.parentElement.parentElement.remove();
    }
});

document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', (e) => {
        const largeImageContainer = document.getElementById('large-image-container');
        const largeImage = document.getElementById('large-image');
        largeImage.src = e.target.src.replace('150', '400');
        largeImageContainer.style.display = 'block';
    });
});
