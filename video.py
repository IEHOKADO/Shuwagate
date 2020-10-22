import cv2

print('＝＝＝＝＝　フォルダ名　＝＝＝＝＝')
folder = input()  #保存するフォルダの名前

camera = cv2.VideoCapture(0)

status = False
num = 100  #撮りたい写真の枚数
freq = 3  #写真を撮る頻度
c = 1
while c <= num * freq:
    ret, frame = camera.read()
    frame = cv2.resize(frame, (200, 200))  #フレームをリサイズ
    cv2.imshow('camera', frame)  #フレームを表示
    if cv2.waitKey(1) & 0xFF == ord('q'): status = True  #Qを押して撮影開始
    if status:
        if c % freq == 0:
            cv2.imwrite('data/img/train/' + str(folder) + '/' + str(c // freq) + '.jpg', frame)
            print(c // freq)
        c += 1

camera.release()
cv2.destroyAllWindows()
