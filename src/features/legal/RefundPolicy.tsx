const RefundPolicy = () => {
    return (
        <div className="min-h-screen bg-[#F7F7F7] font-sans text-[#3D1A12] antialiased">
            <main className="max-w-5xl mx-auto px-6 py-32">
                <div className="grid md:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Fixed Title Area */}
                    <div className="md:col-span-4 sticky top-32">
                        <h1 className="text-6xl font-light tracking-tighter mb-8 italic text-[#3D1A12]">Refunds &<br />Exchanges</h1>
                        <p className="text-[#3D1A12]/70 font-light max-w-50">
                            We believe in the perfect fit. If your choice isn't serving you, we'll facilitate its return.
                        </p>
                    </div>

                    {/* Right Column: Detailed Blocks */}
                    <div className="md:col-span-8 space-y-4">
                        {/* Featured Block - subtle brown-tinted gray background */}
                        <div className="bg-[#EFEBE9] p-12 md:p-20 rounded-sx">
                            <h3 className="text-xs font-semibold tracking-[0.3em] uppercase mb-8 text-[#3D1A12]">The Return</h3>
                            <p className="text-2xl font-light leading-snug mb-8">
                                Fourteen days to decide.
                            </p>
                            <p className="text-[#3D1A12]/70 font-light leading-relaxed">
                                Items must remain in their original, minimalist packaging, unused and pristine. We honor the quality of our product and expect the same in return.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Card 1 */}
                            <div className="bg-white p-12 border border-[#3D1A12]/10">
                                <h3 className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-[#3D1A12]">Exchange</h3>
                                <p className="text-[#3D1A12]/70 text-sm font-light leading-relaxed">
                                    The fastest way to ensure satisfaction is to return the item and place a new order for your preferred case.
                                </p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-white p-12 border border-[#3D1A12]/10">
                                <h3 className="text-xs font-semibold tracking-[0.3em] uppercase mb-4 text-[#3D1A12]">Approval</h3>
                                <p className="text-[#3D1A12]/70 text-sm font-light leading-relaxed">
                                    Once inspected, refunds are returned to the original payment source within 10 business days.
                                </p>
                            </div>
                        </div>

                        {/* CTA Block in Brand Brown */}
                        <div className="bg-[#3D1A12] text-white p-12 text-center mt-8">
                            <p className="text-xs tracking-[0.4em] uppercase mb-6 font-light">Require assistance?</p>
                            <a href="mailto:support@zayq.com" className="text-xl font-light border-b border-white/30 hover:border-white transition-all pb-1">
                                support@zayq.com
                            </a>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default RefundPolicy;