export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === "string") {
      return <span className="text-sm text-gray-500">{breadcrumb}</span>;
    }

    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item, index) => (
        <span key={index} className="text-sm text-gray-500 flex items-center">
          {index !== 0 && <span className="mx-1">/</span>}
          {item}
        </span>
      ));
    }

    return null;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between px-5 py-4 mb-4 bg-white shadow-sm rounded-xl">
      {/* Left Side: Title & Breadcrumb */}
      <div className="mb-2 md:mb-0">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="flex flex-wrap items-center mt-1">{renderBreadcrumb()}</div>
      </div>

      {/* Right Side: Action Button */}
      {children && (
        <div className="flex items-center space-x-2">
          {children}
        </div>
      )}
    </div>
  );
}
