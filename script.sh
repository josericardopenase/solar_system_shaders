#!/bin/bash

# Nombre del archivo de salida
output_file="gpt.txt"

# Limpiar el archivo de salida si existe
> "$output_file"

# Buscar y concatenar todos los archivos .ts
for file in $(find . -type f -name "*.ts"); do
    echo "Archivo: $file" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n" >> "$output_file" # Añade una línea en blanco entre archivos
done

echo "Código concatenado en $output_file"
