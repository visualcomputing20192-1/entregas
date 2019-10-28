# Taller raster

## Propósito

Comprender algunos aspectos fundamentales del paradigma de rasterización.

## Tareas

Emplee coordenadas baricéntricas para:

1. Rasterizar un triángulo.
2. Sombrear su superficie a partir de los colores de sus vértices.
3. Implementar un [algoritmo de anti-aliasing](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-practical-implementation) para sus aristas.

Referencias:

* [The barycentric conspiracy](https://fgiesen.wordpress.com/2013/02/06/the-barycentric-conspirac/)
* [Rasterization stage](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage)

Implemente la función ```triangleRaster()``` del sketch adjunto para tal efecto, requiere la librería [nub](https://github.com/visualcomputing/nub/releases) (versión >= 0.2).

## Integrantes

Complete la tabla:

| Integrante      | github nick |
| --------------- | ----------- |
| Arkai Ariza     | AkaiAriza   |
| Gabriel Aguirre | gdaguirrea  |
| Miguel Castro   | miacastroco |

## Discusión

Para la implementación de la rasterización, se realizó una verificación por cada recuadro de la cuadrícula, empleando una función de bordes, para verificar si el centro del recuadro se encontraba dentro del triángulo. La función de bordes detecta si un punto en el plano se encuentra a la derecha o a la izquierda de una recta formada por dos vectores: si se encuentra a la derecha, retorna un valor positivo; si se encuentra a la izquierda, retorna un valor negativo; si se encuentra justo encima de la recta, retorna cero. Abstrayendo un triángulo como la unión de tres rectas en el plano, donde cada vértice es la intersección de dos de ellas y cada arista es el tramo de recta comprendido entre dos vértices, es posible verificar si un punto se encuentra al interior de dicho triángulo empleando la función de borde en cada una de las tres aristas con el triángulo; si se modela cada arista como una recta definida por dos puntos (los vértices del triángulo), donde el lado derecho de todas las rectas apunta hacia el interior del triángulo, y se logra determinar que el punto en cuestión está a la derecha de todas las tres rectas, entonces se ha determinado que el punto se encuentra al interior del triángulo. Al determinarse que el centro de un recuadro de la cuadrícula se encuentra al interior del triángulo, se dibuja un cuadrado en dicho recuadro. El algoritmo cumple la definición de la rasterización.
Para la implementación del anti-aliasing, se tomó como base el código de la implementación de la rasterización, con algunos cambios. En lugar de realizar la verificación de si un punto se encuentra dentro del triángulo antes de definir el pintado del cuadrado correspondiente, se pintan cuadrados sobre todo el tablero. Lo único que varía en cada cuadrado es la opacidad con la que es pintado, de 0 a 255, y dicha opacidad es calculada mediante anti-aliasing empleando 4 sub-pixeles. Dentro de la cuadrícula, cada recuadro se subdivide en 4 sub-pixeles, y se verifica si cada uno de estos se encuentra dentro del triángulo o no. Dependiendo de la cantidad de sub-pixeles en los cuales se encuentra el triángulo, se calcula un valor de intensidad total entre 0 y 1, con valores posibles 0, 0.25, 0.5, 0.75, y 1, donde 1 representa que los 4 sub-pixeles del recuadro original están dentro del triángulo, 0.75 representa que 3 están dentro, y así sucesivamente. Finalmente, el valor de intensidad se multiplica por 255, y el resultado se le pasa a la función que pinta cada cuadrado en pantalla, para ser empleado como valor de opacidad del cuadrado. Así, por más que técnicamente toda el área de la pantalla está cubierta de cuadrados, solamente aquellos que se encuentran encima del triángulo en alguna capacidad (ya sea porque están enteramente dentro del triángulo o sobre alguno de los bordes) son visibles, y la intensidad de los cuadrados pintados en los bordes varía de acuerdo a cuántos sub-pixeles de cada recuadro están dentro del triángulo, siguiendo el principio fundamental del anti-aliasing.

Fuentes:
- [Rasterization: What Are We Trying to Solve?](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-stage)
- [Improving the Rasterization Algorithm](https://www.scratchapixel.com/lessons/3d-basic-rendering/rasterization-practical-implementation/rasterization-practical-implementation)


