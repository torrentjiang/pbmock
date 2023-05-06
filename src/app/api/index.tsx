import React from 'react';
import { Context, useStore } from './index.store';
import List from './components/list';
import Search from './components/search';
import Add from './components/add';
import Modal from './components/modal';

export default () => {
  let store: ReturnType<typeof useStore> = useStore();

  return (
    <Context.Provider value={store}>
      <Search />
      <Add />
      <List />
      <Modal />
    </Context.Provider>
  );
};
