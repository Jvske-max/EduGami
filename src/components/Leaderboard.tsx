import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/gamification.service';
import { useNavigate } from '@tanstack/react-router';

// Definimos la estructura de lo que esperamos recibir
interface Student {
  id: string;
  alias: string;
  xpTotal: number;
  streak: number;
}

export const Leaderboard = () => {
  const navigate = useNavigate();

  // 1. Los 3 estados sagrados del consumo de APIs
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Ejecutamos la petición al montar el componente
  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        setIsLoading(true);
        // Llamamos al servicio (El interceptor ya le está inyectando el token por debajo)
        const data = await getLeaderboard();
        setStudents(data.leaderboard);
      } catch (err) {
        console.error(err);
        setError('No pudimos cargar la Liga Diamante. El servidor podría estar fuera de línea.');
      } finally {
        // Pase lo que pase (éxito o error), detenemos la animación de carga
        setIsLoading(false);
      }
    };

    fetchTopStudents();
  }, []); // El arreglo vacío indica que se ejecuta solo una vez al abrir la pantalla

  // 3. Renderizado Condicional
  if (isLoading) {
    return <div className="text-gray-500 font-bold font-geist text-xl text-center p-10">Cargando clasificación... ⏳</div>;
  }

  if (error) {
    return <div className="text-red-500 font-bold font-geist text-xl text-center p-10">{error} ⚠️</div>;
  }

  // 4. Renderizado Exitoso
  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-brand-paper border-2 border-gray-200 rounded-3xl shadow-[0_8px_0_0_rgba(229,231,235,1)] font-geist">
      
      {/* ENCABEZADO: Título a la izquierda y Botón a la derecha */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🏆</span>
          <h2 className="text-3xl font-extrabold text-gray-800">Liga Diamante</h2>
        </div>
      </div>
      
      {/* TABLA DE POSICIONES */}
      <ul className="flex flex-col gap-4">
        {students.map((student, index) => (
          <li 
            key={student.id} 
            className="flex items-center justify-between bg-white border-2 border-gray-200 p-4 rounded-2xl shadow-sm hover:border-brand-orange transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Posición con colores de medalla */}
              <span className={`text-2xl font-extrabold w-8 text-center ${
                index === 0 ? 'text-yellow-500' : 
                index === 1 ? 'text-gray-400' : 
                index === 2 ? 'text-amber-700' : 'text-gray-300'
              }`}>
                #{index + 1}
              </span>
              
              <span className="font-bold text-gray-800 text-lg">{student.alias}</span>
              
              {/* Badge de Racha */}
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <span className="text-sm">🔥</span>
                <span className="text-sm font-extrabold text-brand-orange">{student.streak}</span>
              </div>
            </div>
            
            {/* Puntuación */}
            <span className="font-extrabold text-brand-green text-xl tracking-tight">
              {student.xpTotal} XP
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
