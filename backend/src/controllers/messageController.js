import prisma from '../lib/prisma.js';

export const getConversation = async (req, res) => {
    const myId = req.user.id;
    const otherId = Number(req.params.userId);

    const messages = await prisma.message.findMany({
        where: {
            OR: [
                { senderId: myId,       recipientId: otherId },
                { senderId: otherId,    recipientId: myId }
            ]
        },
        orderBy: { createdAt: 'asc' },
        include: {
            sender:     { select: { id: true, username: true, displayName: true } },
            recipient:  { select: { id: true, username: true, displayName: true } }
        }
    });

    res.json(messages);
};

export const sendMessage = async (req, res) => {
    const { content } = req.body;
    if (!content || !content.trim())
        return res.status(400).json({ message: 'Message content is required' });

    const message = await prisma.message.create({
        data: {
            content:        content.trim(),
            senderId:       req.user.id,
            recipientId:    Number(req.params.userId)
        },
        include: {
            sender:         { select: { id: true, username: true, displayName: true } },
            recipient:      { select: { id: true, username: true, displayName: true }}
        }
    });

    res.status(201).json(message);
};