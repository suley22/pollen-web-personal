import { Logo } from "@/components/icons/icons";

export function Header() {
    return (
        <div className="bg-white border-b">
            <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo/Header */}
                    <div className="flex text-gray-900 items-center justify-between">
                        <Logo className="h-10 w-10"/>
                        <h1 className="!mb-0 font-bold !text-3xl">Pollen</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}