import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import Button from './Button';

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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedItems, setLoadedItems] = useState(12);

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

  const displayedUsers = users.slice(0, loadedItems);
  const hasMore = loadedItems < users.length;

  return (
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
  );
};

export default UserList; 