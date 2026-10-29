
import {
    Package,
    Heart,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-slate-500/50 bg-white w-full sm:px-6 lg:px-8 m-auto py-5 mt-10">
            <div className="w-full max-w-6xl m-auto">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between w-full ">

                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-cyan-600">
                            <Package size={21} />
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-cyan-600">
                                Product Manager
                            </h3>
                            <p className="text-xs text-slate-500">
                                Simple inventory management
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                        <a
                            href="#dashboard"
                            className="transition hover:text-cyan-600"
                        >
                            Dashboard
                        </a>

                        <a
                            href="#products"
                            className="transition hover:text-cyan-600"
                        >
                            Products
                        </a>

                        <a
                            href="#help"
                            className="transition hover:text-cyan-600"
                        >
                            Help Center
                        </a>
                    </nav>

                    {/* System Status */}
                    <div className="flex items-center gap-2 self-start rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 md:self-auto">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-xs font-medium text-emerald-700">
                            System Ready
                        </span>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Product Manager. All rights reserved.
                    </p>

                    <p className="flex items-center gap-1.5">
                        Made with
                        <Heart size={13} className="fill-rose-500 text-rose-500" />
                        for better product management
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
