import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center justify-center px-6 font-sans">
            {/* Brand Header Style */}
            <nav className="absolute top-0 w-full py-8 text-center">
                <h1 className="text-xl font-medium tracking-[0.2em] text-[#3D1A12]">ZAYQ</h1>
            </nav>

            <main className="text-center">
                {/* Large 404 Number with a subtle brand brown tint */}
                <h2 className="text-[120px] font-light leading-none text-[#3D1A12]/10 mb-4">
                    404
                </h2>

                <h3 className="text-2xl md:text-3xl font-normal text-[#3D1A12] mb-4">
                    This path wasn't chosen with intention.
                </h3>
 
                <p className="text-[#3D1A12]/70 max-w-md mx-auto mb-10 leading-relaxed">
                    The page you are looking for doesn't exist or has been moved.
                    Let's get you back to where things feel right.
                </p>

                {/* The ZAYQ Signature Button Style in Brand Brown */}
                <a
                    href="/"
                    className="inline-block bg-[#3D1A12] text-[#F7F7F7] px-10 py-3 text-sm font-medium tracking-wide rounded-sm transition-opacity hover:opacity-90"
                >
                    Back to Home
                </a>
            </main>

            {/* Subtle Footer */}
            <footer className="absolute bottom-10 w-full text-center">
                <p className="text-xs text-[#3D1A12]/50 tracking-widest uppercase">
                    © 2024 ZAYQ. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default NotFound;