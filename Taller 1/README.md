# Taller 1
## Integrantes
| Integrante | github nick |  
|-----------------------------|-------------
| Arkai Julián Ariza Millares | arjarizami  
| Miguel Ángel Castro Cortés  | miacastroco 
| Gabriel David Aguirre Arias | gdaguirrea  
---  
## Discusión

Con la entrega 1 se entregan 3 programas escritos en Javascript, empleando p5.js:
- convvideo.js
- rgblumaimg.js
- hist.js

Los archivos, tambien, tienen archivos .html asociados para ejecutarse. Los archivos .html solamente importan p5.js y luego ejecutan su programa de Javascript correspondiente.

### convvideo.js
En el mismo programa se realiza la convolución de la imagen y del video. La entrada de video que realiza el programa es desde webcam. La imagen es obtenida de un enlace. El filtro actual aplicado es de detección de bordes, escogido por lo fácil que es verificar que está ejecutándose correctamente. No se toma código directamente de ningún lugar aparte de adaptar la implementación de máscara de convolución obtenida en processing.org ([https://processing.org/examples/convolution.html](https://processing.org/examples/convolution.html)) a la versión en Javascript de Processing (la implementación en el enlace está realizada en la versión de Java). Como observación, el cálculo de FPS muestra qe el desempeño del programa es bastante malo, siempre mostrando aproximadamente 10 FPS de video y con una gran carga computacional. Sin embargo, al remover la ejecución del filtro de convolución, el FPS se va nuevamente a 60, mostrando que el proceso de ejecutar una máscara de convolución en cada fotograma de video en tiempo real es una tarea bastante computacionalmente pesada. La máscara de convolución aplicada emplea una matriz de 3x3.

### rgblumaimg.js
El programa toma una imagen, promedia sus valores RGB y construye una nueva imagen con éstos valores para mostrarla a la derecha de la imagen original, y también realiza el mismo proceso con pesos para cada valor RGB construyendo una tercera imagen, mostrando ésta tercera imagen debajo de la segunda. Los pesos empleados en luma son estáticos y están en el código.

### hist.js
Empleando la misma imagen de rgblumaimg.js, hist.js primero vuelve la imagen original a escala de grises promediando los valores RGB de ésta, y luego construye un histograma con los datos obtenidos de intensidad. Garantiza que siempre el histograma va a llenar todo el espacio de la imagen (el histograma se imprime encima de la imagen en escala de grises), pues toma como longitud máxima posible de las lineas del histograma la altura total de la imagen. Posteriormente, debajo del histograma, genera una versión de la imagen en escala de grises donde todos los pixeles por encima de cierta intensidad se dibujan en blanco y todos los demás se dibujan en negro. Los valores de dicha intensidad están físicamente en el archivo hist.js, y no se pueden modificar en tiempo real (por ejemplo, haciendo click en el histograma).
