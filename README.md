<h1 align="center">SHO ZA OVOSH — Распознавание овощей по изображению</h1>
<p align="center">
  <em>SHO_ZA_OVOSH Локальная нейросеть на основе MobileNetV2 для распознавания 11 видов овощей и фруктов</em>
</p>
<h2>🚀 Как запустить проект локально</h2>

<h3>⚙️ Требования</h3>
<ul>
  <li>Python 3.8+</li>
  <li>pip (менеджер пакетов Python)</li>
</ul>

<h3>📋 Пошаговая инструкция</h3>
<ol>
  <li>
    <strong>Клонируйте репозиторий:</strong>
    <pre><code>git clone https://github.com/GundosCore/SHO_ZA_OVOSH.git
cd SHO_ZA_OVOSH</code></pre>
  </li>
  <li>
    <strong>Создайте виртуальное окружение (рекомендуется):</strong>
    <pre><code>python -m venv venv
source venv/bin/activate    # Linux/Mac
# или
venv\Scripts\activate       # Windows</code></pre>
  </li>
  <li>
    <strong>Установите зависимости:</strong>
    <pre><code>pip install -r requirements.txt</code></pre>
  </li>
  <li>
    <strong>Убедитесь, что файл модели <code>vegetable_finetuned.h5</code> находится в корне проекта.</strong>
  </li>
  <li>
    <strong>Запустите сервер:</strong>
    <pre><code>python app.py</code></pre>
  </li>
  <li>
    <strong>Откройте веб-интерфейс:</strong>
    <p>Откройте браузер и перейдите по адресу: <a href="http://localhost:5000">http://localhost:5000</a> или откройте в браузере файл main.html из основной папки с программой</p>
  </li>
</ol>
