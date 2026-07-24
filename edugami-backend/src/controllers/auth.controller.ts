import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import type { AuthRequest } from '../middlewares/auth.middleware';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      res.status(400).json({ error: 'El correo ya está registrado.' });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = role || 'STUDENT';
    const newUser = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        role: userRole, 
        alias: userRole === 'STUDENT' ? (name || `Estudiante_${Math.floor(Math.random() * 1000)}`) : null
      }
    });
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: newUser.id });
  } catch (error: any) {
    console.error('Error en register:', error);
    if (error.code === 'P2021') {
      res.status(500).json({ error: 'La base de datos aún no tiene las tablas creadas. Ejecuta npx prisma db push.' });
      return;
    }
    if (error.code === 'P1001') {
      res.status(500).json({ error: 'No se pudo conectar a la base de datos de PostgreSQL. Verifica la URL de Supabase/Railway.' });
      return;
    }
    res.status(500).json({ error: error.message || 'Error en el servidor.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      res.status(404).json({ error: 'Credenciales inválidas.' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Credenciales inválidas.' });
      return;
    }
    const secret = process.env.JWT_SECRET || 'edugami_super_secret_key_2026';
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      secret, 
      { expiresIn: '24h' }
    );
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: { id: user.id, name: user.name, role: user.role, alias: user.alias, streak: user.streak, xpTotal: user.xpTotal }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor.' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'No autorizado' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        alias: true,
        role: true,
        xpTotal: true,
        streak: true
      }
    });

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error("Error en getMe:", error);
    res.status(500).json({ error: 'Error del servidor al obtener perfil' });
  }
};