import { FaAngleRight } from "react-icons/fa";

export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === "string") {
      return (
        <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
          <span>{breadcrumb}</span>
        </div>
      );
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <nav
          className="flex items-center text-sm text-gray-500 gap-1 mt-1"
          aria-label="Breadcrumb"
        >
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && <FaAngleRight className="text-gray-400" />}
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">
                {item}
              </span>
            </div>
          ))}
        </nav>
      );
    }

    return null;
  };

  return (
    <section className="bg-gradient-to-tr from-indigo-50 to-white px-6 py-4 rounded-2xl shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-indigo-700">{title}</h1>
        {renderBreadcrumb()}
        {children && (
          <div className="mt-3 flex flex-wrap gap-2">{children}</div>
        )}
      </div>
    </section>
  );
}
