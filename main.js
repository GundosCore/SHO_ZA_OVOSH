// Функция для переключения между разделами
function switchSection(targetId) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Показываем нужную секцию
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Обновляем активную ссылку в навигации
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === targetId) {
            link.classList.add('active');
        }
    });
}

// Добавляем обработчики событий для навигационных ссылок
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            switchSection(targetId);
        });
    });
    
    // Добавляем обработчик для загрузки изображения
    const fileInput = document.getElementById('file-input');
    const previewImage = document.getElementById('preview-image');
    const noImageMessage = document.getElementById('no-image-message');
    const uploadArea = document.getElementById('upload-area');
    
    // Функция для обновления результатов
    function updateResults(predictions) {
        const resultsContainer = document.querySelector('.probabilities');
        resultsContainer.innerHTML = ''; // Очищаем предыдущие результаты
        
        // Добавляем 5 самых вероятных результатов
        predictions.slice(0, 5).forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'probability-item';
            resultItem.innerHTML = `
                <span>${item.class}</span>
                <span class="probability">${item.probability.toFixed(2)}%</span>
            `;
            resultsContainer.appendChild(resultItem);
        });
    }
    
    // Функция для отправки изображения на сервер и получения результатов
    async function predictImage(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            updateResults(data.predictions);
        } catch (error) {
            console.error('Ошибка при предсказании:', error);
            alert('Ошибка при предсказании: ' + error.message);
        }
    }
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                noImageMessage.style.display = 'none';
                
                // Отправляем изображение на сервер для предсказания
                predictImage(file);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Добавляем обработчик для drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#3C8536';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ddd';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    noImageMessage.style.display = 'none';
                    
                    // Отправляем изображение на сервер для предсказания
                    predictImage(file);
                };
                reader.readAsDataURL(file);
                
                // Устанавливаем файл в input
                const dt = new DataTransfer();
                dt.items.add(file);
                fileInput.files = dt.files;
            }
        }
    });
});

// Копируем высоту правого блока в левый
document.addEventListener('DOMContentLoaded', function() {
    const resultsPanel = document.querySelector('.results-panel');
    const vegetableList = document.querySelector('.vegetable-list');

    if (resultsPanel && vegetableList) {
        vegetableList.style.height = resultsPanel.offsetHeight + 'px';
    }
});