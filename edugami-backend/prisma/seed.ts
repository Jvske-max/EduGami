import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de datos en la base de datos de producción/pruebas...');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  // 1. Crear Docente de Prueba
  const teacher = await prisma.user.upsert({
    where: { email: 'profesor@edugami.com' },
    update: {
      password: hashedPassword
    },
    create: {
      name: 'Prof. Fernando Silva',
      email: 'profesor@edugami.com',
      password: hashedPassword,
      role: 'TEACHER',
      alias: null
    }
  });

  // 2. Crear Estudiante de Prueba
  const student = await prisma.user.upsert({
    where: { email: 'estudiante@edugami.com' },
    update: {
      password: hashedPassword
    },
    create: {
      name: 'Juan Pérez',
      email: 'estudiante@edugami.com',
      password: hashedPassword,
      role: 'STUDENT',
      alias: 'BúhoSabio',
      xpTotal: 240,
      streak: 3
    }
  });

  console.log('✅ Seed completado con éxito!');
  console.log('📌 Credenciales de prueba creadas:');
  console.log('   - Docente: profesor@edugami.com / password123');
  console.log('   - Estudiante: estudiante@edugami.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
