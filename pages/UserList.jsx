import { useGetUsersQuery, useDeleteUserMutation } from '../store/slices/authApiSlice';
import { motion } from 'framer-motion';
import { Users, Trash2, Edit, Check, X, Shield, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UserList = () => {
  const { data: userData, isLoading, refetch } = useGetUsersQuery();
  const users = userData?.data || [];

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success('User removed');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isLoading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold italic mb-2">User Directory</h1>
        <p className="text-muted font-light tracking-wide italic">Manage customer accounts, roles, and access permissions</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-100/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface/50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">User</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Email</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Role</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Verified</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-xs font-bold text-accent">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-sm text-muted font-light">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-muted'}`}>
                      <Shield className="w-3 h-3" />
                      <span>{user.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {user.isVerified ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 hover:bg-white rounded-lg transition-all text-muted hover:text-accent disabled:opacity-30">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteHandler(user._id)}
                        className="p-2 hover:bg-white rounded-lg transition-all text-muted hover:text-red-500"
                        disabled={isDeleting || user.role === 'admin'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
