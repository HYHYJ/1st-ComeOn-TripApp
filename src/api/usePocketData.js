import pb from './pocketbase';

export function usePocketData(collection) {
  const defaultOptions = {
    sort: '-created',
  };

  const getListData = (options = {}) =>
    pb.collection(collection).getFullList({ ...defaultOptions, ...options });

  const getIdData = (id, options = {}) => pb.collection(collection).getOne(id, options);

  const createData = (data) => pb.collection(collection).create(data);

  const updateData = (id, data) => pb.collection(collection).update(id, data);

  const deleteData = (id) => pb.collection(collection).delete(id);

  const passwordReset = (email) => pb.collection(collection).requestPasswordReset(email);

  return {
    getListData,
    getIdData,
    createData,
    updateData,
    deleteData,
    passwordReset,
  };
}
