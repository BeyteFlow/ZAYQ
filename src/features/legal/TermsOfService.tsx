const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#3D1A12] antialiased">
            <main className="max-w-2xl mx-auto px-8 py-32 md:py-48">
                <header className="mb-32">
                    <h1 className="text-4xl font-light mb-6 uppercase tracking-widest text-[#3D1A12]">Terms of Service</h1>
                    {/* Brand Brown Divider */}
                    <div className="h-px w-20 bg-[#3D1A12] mb-12"></div>
                    <p className="text-xl text-[#3D1A12]/70 font-light leading-relaxed italic">
                        "Because generic doesn't feel right."
                    </p>
                </header>

                <article className="space-y-20">
                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#3D1A12]">The Foundation</h2>
                        <p className="text-[#3D1A12]/70 font-light leading-relaxed">
                            By accessing the ZAYQ platform, you enter into a relationship governed by mutual respect for design and intention. Our services are provided to those who value the intersection of form and function.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#3D1A12]">Original Design</h2>
                        <p className="text-[#3D1A12]/70 font-light leading-relaxed">
                            ZAYQ cases, visuals, and brand language are the exclusive intellectual property of ZAYQ. We create for the community; unauthorized commercial reproduction or imitation is a breach of this trust.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xs font-semibold tracking-[0.3em] uppercase text-[#3D1A12]">Limitation</h2>
                        <p className="text-[#3D1A12]/70 font-light leading-relaxed">
                            While our cases are engineered for premium protection, we cannot be held liable for external factors or extreme conditions beyond the scope of intentional daily use.
                        </p>
                    </div>

                    <div className="space-y-4 pt-12">
                        <p className="text-[10px] text-[#3D1A12]/30 tracking-widest uppercase italic">
                            ZAYQ reserves the right to modify these terms at any time as our brand evolves.
                        </p>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default TermsOfService;