import csurf from 'csurf';
import cookieParser from 'cookie-parser';

// Initialize cookie parser middleware
export const cookieParserMiddleware = cookieParser();

// Initialize CSRF protection middleware
const csrfProtection = csurf({
    cookie: true, //Store CSRF token in a cookie
});

export default csrfProtection;