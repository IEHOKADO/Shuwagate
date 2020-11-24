# **Shuwagate**

## What is Shuwagate ?

Shuwagateは指文字を学習できるWebアプリです。  

## Lesson

レッスンは2つあり、それぞれのレッスンで学べることは違います。

- 指文字表現
- 指文字読み取り

指文字表現では、与えられたひらがなの指文字をカメラに表現することで指文字を学びます。  
手の検出,指文字の識別などに画像処理技術を使っています。

指文字読み取りでは、与えられた指文字の動画を見てその文字を答えることで指文字を学びます。  
指文字表がつねに画面上部にあるため、いつでも指文字を確認することができます。

## DevTools

- Tensorflow

TensorflowはGoogleが開発した機械学習フレームワークです。  
今回はPythonでKerasを使って指文字を学習させました。  
作ったモデルはTensorflow.jsを使うことでjson形式に変換でき、javascriptからアクセスすることができるようになります。

## Demo

デモは[こちら](https://iehokado.github.io/Shuwagate/src/){:target="_blank"} です。  

## Credit

IEHOKADO  
horinat
