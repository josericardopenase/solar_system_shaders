

https://github.com/user-attachments/assets/1f448a3f-6a79-4235-adc9-e7b9607273e3

## Introducción
Esta es la práctica de Shaders de Informática Gráfica, basada en el sistema planetario. En esta práctica se agregan texturas al Sol, Mercurio, Venus y Marte. Cada shader tiene un propósito específico: el **PlanetTexture1** da una sensación de ruido celular, el **PlanetTexture2** produce un efecto de pixelado, el **sunShader** intenta simular un efecto parecido a la superficie solar y el **SeaVertex** intenta emular el mar aplicado a Marte.

El proyecto incluye tres prácticas principales:
1. **PlanetTexture1**: Generación procedural de texturas con ruido celular.
2. **PlanetTexture2**: Adición de ruido y texturas personalizadas con efecto pixelado.
3. **SunShader y SeaVertex**: Creación de efectos dinámicos para el sol y el océano.

## Objetivos

1. Aplicar técnicas avanzadas de shaders para gráficos realistas.
2. Comprender y utilizar funciones de ruido procedural para la generación de texturas.
3. Implementar desplazamientos y deformaciones dinámicas en superficies.
4. Crear un entorno visual cohesivo que simule un sistema solar interactivo.
5. Integrar las prácticas en un único sistema funcional.

## Desarrollo

### PlanetTexture1
**Descripción:** Este shader utiliza ruido celular para generar texturas planetarias basadas en distancias mínimas entre puntos aleatorios.

**Características principales:**
- Uso de funciones de ruido procedural (`random` y `cellular`).
- Generación de patrones dinámicos basados en la posición y el tiempo.
- Combinación de canales de color para crear un efecto visual único.

### PlanetTexture2
**Descripción:** Este shader combina ruido procedural con texturas personalizadas, generando efectos dinámicos que varían con el tiempo.

**Características principales:**
- Uso de texturas externas mediante la función `texture2D`.
- Mezcla de ruido procedural y texturas con transiciones suaves.
- Ajustes en la escala y subdivisión para detalles precisos.

### SunShader
**Descripción:** Este shader genera efectos visuales dinámicos para el sol, utilizando ruido fractal y combinaciones de colores cálidos.

**Características principales:**
- Función `fBm` para ruido fractal multi-octava.
- Rotaciones de coordenadas para un movimiento dinámico.
- Mezcla de colores cálidos y texturas personalizadas.

### SeaVertex
**Descripción:** Este shader simula olas dinámicas en el mar mediante el uso de ruido procedural y desplazamientos, aplicado específicamente a Marte.

**Características principales:**
- Implementación de desplazamientos basados en el tiempo.
- Uso de múltiples iteraciones de ruido para detalles finos.
- Variación de frecuencias para simular olas grandes y pequeñas.

## Conclusión

Este proyecto ha permitido integrar múltiples conceptos avanzados de shaders en un entorno visual interactivo. Cada práctica aporta un componente único al sistema solar, desde la generación procedural de texturas hasta la simulación de dinámicas realistas en el mar y el sol. La combinación de estas técnicas resulta en un sistema visualmente atractivo y técnicamente complejo, ideal para profundizar en el campo de la programación gráfica.

