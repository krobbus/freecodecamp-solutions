export function authorizeModification(req, res, next) {
    const user = req.user;

    if (!user) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const isParent = user.role === 'parent';
    const isSelfChild = user.role === 'child' && String(req.params.userId) === String(user.id);

    if (isParent || isSelfChild) {
        return next();
    }

    return res.status(403).json({ error: 'Access denied' });
}