import { Link, useLocation } from 'react-router-dom';
import { Home, Users, MessageSquare, Settings, FolderOpen, Handshake, Calculator } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { name: 'Partners', href: '/admin/partners', icon: Handshake },
  { name: 'Quote Requests', href: '/admin/quotes', icon: Calculator },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white shadow-lg">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive
                    ? 'bg-yellow-100 text-yellow-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon
                  className={`
                    mr-3 h-5 w-5
                    ${isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 