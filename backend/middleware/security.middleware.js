// Security headers middleware to prevent common attacks
import helmet from 'helmet';

export const securityHeaders = (req, res, next) => {
    // Remove server information disclosure
    res.removeHeader('X-Powered-By');
    
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';");
    
    next();
};

// API versioning middleware
export const apiVersioning = (req, res, next) => {
    // Ensure all API endpoints start with /api/v1/
    if (req.path.startsWith('/api/') && !req.path.startsWith('/api/v1/')) {
        // For backward compatibility, redirect old API calls to v1
        const newPath = req.path.replace('/api/', '/api/v1/');
        req.url = newPath;
        req.path = newPath;
    }
    next();
};

// Request logging middleware for security monitoring
export const securityLogging = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    // Log security-relevant requests
    if (req.method !== 'GET' || req.path.includes('admin') || req.path.includes('login')) {
        console.log(`[SECURITY] ${timestamp} - ${req.method} ${req.path} from ${ip} - ${userAgent}`);
    }
    
    next();
};