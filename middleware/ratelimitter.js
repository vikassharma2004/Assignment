import rateLimit from 'express-rate-limit';


export const authLimiter = rateLimit({
    windowMs: 30 * 1000,  
    limit: 3, 
    message: { error: "Too many login/signup attempts. Try again later." },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});


export const postLimiter = rateLimit({
    windowMs: 30 * 1000, 
    limit: 3, 
    message: { error: "Too many attempts. Try again later!" },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});
export const rateLimiter = rateLimit({
    windowMs: 30 * 1000, 
    limit: 3, 
    message: { error: "Too many attempts. Try again later!" },
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});


