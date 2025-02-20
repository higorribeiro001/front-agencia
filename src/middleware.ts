import { NextRequest, NextResponse } from "next/server";

// const protectedPageRoutes = [
//     '/home',
//     '/products'
// ];

// const adminPageRoutes = [
//     '/edit-mdf'
// ]

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // const token = req.cookies.get('access')?.value;
    // const status = req.cookies.get('statusMe')?.value;
    // const role = req.cookies.get('role')?.value;

    // const isProtectedPageRoute = protectedPageRoutes.some((route) => pathname.startsWith(route));
    // const isAdminPageRoute = adminPageRoutes.some((route) => pathname.startsWith(route));

    // if (isProtectedPageRoute) {
    //     if (!token || parseInt(status!) === 401) {
    //         return NextResponse.redirect(new URL('/', req.url));
    //     }
    // }

    // if (isAdminPageRoute) {
    //     if (role !== 'admin') {
    //         return NextResponse.redirect(new URL('/not-access', req.url));
    //     }
    // }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/home', req.url));
    }

    return NextResponse.next();
}