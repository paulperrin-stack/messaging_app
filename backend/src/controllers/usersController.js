import prisma from '../lib/prisma.js';

const PUBLIC_FIELDS = {
    id: true, username: true, displayName: true, bio: true,
    avatarUrl: true, createdAt: true
};

export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany({ select: PUBLIC_FIELDS });
    res.json(users);
};

export const getUserById = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: Number(req.params.id) },
        select: PUBLIC_FIELDS
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

export const updateUser = async (req, res) => {
    if (req.user.id !== Number(req.params.id))
        return res.status(403).json({ message: 'Forbidden' });

    const { displayName, bio, avatarUrl } = req.body;
    const updated = await prisma.user.update({
        where: { id: req.user.id },
        data: { displayName, bio, avatarUrl },
        select: PUBLIC_FIELDS
    });
    res.json(updated);
};