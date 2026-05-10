import Link from "next/link";

interface AdminTopbarProps {
  title: string;
  showSearch?: boolean;
  showNewButton?: boolean;
  onNewClick?: () => void;
}

export function AdminTopbar({
  title,
  showSearch = false,
  showNewButton = false,
  onNewClick,
}: AdminTopbarProps) {
  return (
    <div className="eco-topbar">
      <h1 className="eco-topbar__title">{title}</h1>

      <div className="eco-topbar__actions">
        {showSearch && (
          <div className="eco-topbar__search">
            <i className="ti ti-search"></i>
            <input type="text" placeholder="Buscar..." />
          </div>
        )}

        {showNewButton && (
          <button className="eco-topbar__btn" onClick={onNewClick}>
            <i className="ti ti-plus"></i>
            Novo
          </button>
        )}
      </div>
    </div>
  );
}
