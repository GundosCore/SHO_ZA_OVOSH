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
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                noImageMessage.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Добавляем обработчик для drag and drop
    const uploadArea = document.getElementById('upload-area');
    
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