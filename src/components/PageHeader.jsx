export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === "string") {
      return (
        <span className="text-sm text-gray-500">{breadcrumb}</span>
      );
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <nav className="flex text-sm text-gray-500 space-x-1" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              {index !== 0 && <span>/</span>}
              <span className="hover:text-gray-700 transition-colors duration-150">{item}</span>
            </div>
          ))}
        </nav>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 mb-6 bg-white shadow rounded-2xl border border-gray-100">
      {/* Left: Title & Breadcrumb */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">{title}</h1>
        <div className="mt-1">{renderBreadcrumb()}</div>
      </div>

      {/* Right: Action Buttons (if any) */}
      {children && (
        <div className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
