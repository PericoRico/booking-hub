module.exports = {
    apps: [
        {
            name: 'bookhub',        // Nombre de la aplicación
            script: 'dist/main.js', // Ruta al archivo principal de la aplicación NestJS compilada
            instances: 1,       // Número de instancias a ejecutar (usa 'max' para escalar con el número de CPU)
            exec_mode: 'fork',   // Modo de ejecución de PM2 (fork o cluster)
        }
    ]
};
