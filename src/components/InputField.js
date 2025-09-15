import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function InputField({ label, name, placeholder, register, errors, type = 'text' }) {
    const hasError = !!errors?.[name];
    const errorMessage = hasError ? errors[name]?.message : null;
    return (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-gray-600 mb-1", htmlFor: name, children: label }), _jsx("input", { id: name, ...register(name, {
                    required: `${label} is required`,
                    valueAsNumber: type === 'number',
                    min: name === 'day' ? 1 : undefined,
                    max: name === 'day' ? 31 : name === 'month' ? 12 : undefined,
                    validate: (v) => {
                        if (name === 'year') {
                            const num = Number(v);
                            if (Number.isNaN(num))
                                return 'Invalid year';
                            if (num < 1900)
                                return 'Year too small';
                            if (num > new Date().getFullYear())
                                return 'Year in future';
                        }
                        return true;
                    }
                }), type: type, placeholder: placeholder, className: `w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${hasError ? 'border-red-500' : 'border-gray-300'}` }), hasError && _jsx("p", { className: "text-red-600 text-xs mt-1", children: String(errorMessage) })] }));
}
