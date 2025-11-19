from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import tensorflow as tf

app = Flask(__name__)
CORS(app)  # Включаем CORS для всех маршрутов

# Загружаем обученную модель
model = tf.keras.models.load_model('vegetable_finetuned.h5')

# Определяем классы овощей
class_names = [
    'Свёкла',
    'Болгарский перец',
    'Капуста',
    'Кукуруза',
    'Огурец',
    'Баклажан',
    'Чеснок',
    'Лук',
    'Апельсин',
    'Горох',
    'Картофель',
]

def preprocess_image(image_bytes):
    """Предобрабатывает изображение для модели"""
    img = Image.open(io.BytesIO(image_bytes))
    img = img.convert('RGB')  # Преобразуем в RGB, если нужно
    
    # Проверяем, что изображение имеет нужные размеры
    if img.size != (224, 224):
        img = img.resize((224, 224))  # Изменяем размер до 224x224
    
    img_array = np.array(img)
    
    # Применяем препроцессинг MobileNetV2
    img_array = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    
    # Добавляем размерность батча
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    try:
        # Читаем байты изображения
        image_bytes = file.read()
        
        # Предобрабатываем изображение
        processed_image = preprocess_image(image_bytes)
        
        # Делаем предсказание
        predictions = model.predict(processed_image)
        
        # Получаем вероятности и сортируем по убыванию
        top_indices = predictions[0].argsort()[-5:][::-1]  # 5 самых вероятных классов
        
        results = []
        for i in top_indices:
            class_name = class_names[i]
            probability = float(predictions[0][i]) * 100  # Преобразуем в проценты
            results.append({
                'class': class_name,
                'probability': probability
            })
        
        return jsonify({'predictions': results})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)