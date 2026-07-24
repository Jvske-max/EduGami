import { createClient } from 'redis';

// Usamos la variable de entorno que ya tienes en tu .env
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('❌ Error en Redis:', err));
redisClient.on('connect', () => console.log('⚡ Redis conectado exitosamente en memoria'));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('No se pudo conectar a Redis', error);
  }
};

export default redisClient;