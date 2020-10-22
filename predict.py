import numpy as np
import keras
from keras import layers
from keras import models
from keras import optimizers
from keras.preprocessing import image
from keras.models import load_model
from keras.applications import imagenet_utils, vgg16

# path to test image
img_path = 'data/test.jpg'

img = image.load_img(img_path, target_size=(100, 100))
img_array = image.img_to_array(img)
pImg = np.expand_dims(img_array, axis=0)/255

model_path = 'data/model/model.h5'

sign_language_vgg16 = load_model(model_path)

prediction = sign_language_vgg16.predict(pImg)[0]

print(prediction)
#print(np.argmax(prediction))
print(prediction.argsort()[-5:][::-1])
