from keras.models import load_model
from keras.preprocessing import image
import numpy as np

img_path = 'data/test-01.png'

img = image.load_img(img_path, target_size=(100, 100))
img_array = image.img_to_array(img)
pImg = np.expand_dims(img_array, axis=0)/255

model_path = 'data/model/model.h5'

model = load_model(model_path)

prediction = model.predict(pImg)[0]

print(prediction)
print(prediction.argsort()[-5:][::-1])
