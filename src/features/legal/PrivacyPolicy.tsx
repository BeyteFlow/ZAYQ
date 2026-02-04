const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#3D1A12] antialiased selection:bg-[#3D1A12]/10">
            <main className="max-w-4xl mx-auto px-6 py-32 md:py-48">
                {/* Editorial Header */}
                <header className="mb-24">
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[#3D1A12]/60 mb-8">ZAYQ / Privacy</div>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-8">
                        Your data is handled <br />with intention.
                    </h1>
                    <p className="max-w-md text-[#3D1A12]/70 font-light leading-relaxed">
                        We believe that privacy is a fundamental component of a minimalist digital lifestyle. We only collect what is essential to bring our designs to your hands.
                    </p>
                </header>

                {/* Structured Content Grid */}
                <div className="space-y-24">
                    <section className="grid md:grid-cols-2 gap-12 border-t border-[#3D1A12]/10 pt-12">
                        <div>
                            <span className="text-[10px] font-medium tracking-widest text-[#3D1A12]">01 / COLLECTION</span>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-light">Minimal Data Requirements</h3>
                            <p className="text-[#3D1A12]/70 leading-relaxed font-light">
                                Order fulfillment requires your name, destination, and email. Beyond these logistical necessities, your digital footprint remains your own.
                            </p>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-12 border-t border-[#3D1A12]/10 pt-12">
                        <div>
                            <span className="text-[10px] font-medium tracking-widest text-[#3D1A12]">02 / USAGE</span>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-light">A Clear Purpose</h3>
                            <p className="text-[#3D1A12]/70 leading-relaxed font-light">
                                We do not sell, trade, or share your data. It exists within ZAYQ solely to facilitate your experience and ensure our cases fit your life perfectly.
                            </p>
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-12 border-t border-[#3D1A12]/10 pt-12">
                        <div>
                            <span className="text-[10px] font-medium tracking-widest text-[#3D1A12]">03 / SECURITY</span>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-2xl font-light">Encrypted Integrity</h3>
                            <p className="text-[#3D1A12]/70 leading-relaxed font-light">
                                All payment processing is handled by industry-leading encrypted gateways. ZAYQ never stores sensitive financial data on our internal systems.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-48 text-center border-t border-[#3D1A12]/10 pt-12">
                    <p className="text-[10px] tracking-[0.5em] text-[#3D1A12]/30 uppercase">ZAYQ — 2024</p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;