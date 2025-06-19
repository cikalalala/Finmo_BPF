import { FaAngleRight } from "react-icons/fa";

export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (!breadcrumb) return null;

    if (typeof breadcrumb === "string") {
      return (
        <div className="text-sm breadcrumbs text-gray-500 mt-1">
          <ul>
            <li>{breadcrumb}</li>
          </ul>
        </div>
      );
    }

    if (Array.isArray(breadcrumb)) {
      return (
        <div className="text-sm breadcrumbs text-gray-500 mt-1">
          <ul>
            {breadcrumb.map((item, index) => (
              <li key={index} className="hover:text-indigo-600 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="card bg-gradient-to-tr from-indigo-50 to-white shadow-md">
      <div className="card-body p-6">
        <h1 className="card-title text-2xl text-indigo-700 font-bold">
          {title}
        </h1>
        {renderBreadcrumb()}
        {children && <div className="mt-3 flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
}
