import { NextRequest, NextResponse } from "next/server";

const protectedPageRoutes = [
    '/home',
];

const adminPageRoutes = [
    '/home'
]

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const token = req.cookies.get('access')?.value;
    const role = req.cookies.get('role')?.value;

    const isProtectedPageRoute = protectedPageRoutes.some((route) => pathname.startsWith(route));
    const isAdminPageRoute = adminPageRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedPageRoute) {
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    if (isAdminPageRoute) {
        if (role !== 'admin') {
            return NextResponse.redirect(new URL('/not-access', req.url));
        }
    }

    return NextResponse.next();
}