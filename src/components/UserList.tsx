import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import Button from './Button';
import { useSearch } from '../contexts/SearchContext';

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  position_name: string;
  department: string;
  hire_date: string;
}

const UserList: React.FC = () => {
  const { searchTerm } = useSearch();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedItems, setLoadedItems] = useState(12);

  useEffect(() => {
    setLoadedItems(12);
  }, [searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const loadMore = () => {
    setLoadedItems(prev => prev + 12);
  };

  const renderUserCard = (user: User) => (
    <li key={user.id} className="user-card">
      <h2 className="user-card__name">{user.name}</h2>
      <div className="user-card__phone">
        <svg className="user-card__icon">
          <use href="#icon-phone" />
        </svg>
        {user.phone}
      </div>
      <div className="user-card__email">
        <svg className="user-card__icon">
          <use href="#icon-mail" />
        </svg>
        {user.email}
      </div>
    </li>
  );

  if (loading) {
    return <div className="user-list__message">Loading...</div>;
  }

  if (error) {
    return <div className="user-list__message user-list__message--error">Error: {error}</div>;
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const displayedUsers = filteredUsers.slice(0, loadedItems);
  const hasMore = loadedItems < filteredUsers.length;

  return (
    <div>
      {filteredUsers.length === 0 && searchTerm ? (
        <div className="user-list__message">Nothing found</div>
      ) : (
        <ul className="user-list">
          {displayedUsers.map(renderUserCard)}
          {hasMore && (
            <Button 
              onClick={loadMore}
              className="user-list__more-btn"
            >
              Load more
            </Button>
          )}
        </ul>
      )}
    </div>
  );
};

export default UserList; 