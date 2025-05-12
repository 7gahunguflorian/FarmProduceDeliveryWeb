import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-accent">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <Link
          to="/profile"
          className="flex items-center gap-2 rounded-full p-2 hover:bg-accent"
        >
          <User className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Topbar; 