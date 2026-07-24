import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos el Request de Express para que acepte nuestra propiedad 'user'
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// 1. Verifica que el usuario haya iniciado sesión (tiene un token válido)
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'edugami_super_secret_key_2026';
    const decoded = jwt.verify(token, secret) as unknown as { id: string; role: string };
    req.user = decoded; // Guardamos los datos del usuario en la petición
    next(); // Permite que la petición continúe
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

// 2. Verifica que el usuario sea PROFESOR (Debe ir después de verifyToken)
export const isTeacher = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'TEACHER') {
    res.status(403).json({ error: 'Acceso denegado. Esta acción requiere privilegios de Docente.' });
    return;
  }
  next();
};