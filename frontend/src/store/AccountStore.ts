// import {IndexedDB} from './base/IndexedDB'
import { Account } from '@common/models';
import { Query } from '@goplan-finance/utils';
import { defineStore } from 'pinia';

// const db = new IndexedDB('companyProfile')

interface StoreState {
  subscriptionPromise: Promise<void>;
  accounts: Account[];
}

export const useAccountStore = defineStore({
  id: 'account',

  state: (): StoreState => ({
    subscriptionPromise: null,
    accounts: [],
  }),
  actions: {
    async _init() {
      if (this.liveSubscription) {
        return;
      }

      const q = Query.create(Account);
      q.limit(100000);
      q.descending('updatedAt');

      const nbAccounts = await q.count();
      if (nbAccounts === 0) {
        console.log('CREATING DEFAULT ACCOUNT');
        const account = new Account();
        account.name = 'Default Account';
        account.currency = 'USD';
        await account.save();
      }

      this.liveSubscription = await q.liveQuery(this.accounts);
    },
    async subscribe() {
      if (this.subscriptionPromise) {
        return this.subscriptionPromise;
      }

      this.subscriptionPromise = this._init();

      return this.subscriptionPromise;
    },
    reset() {
      this.accounts = [];
    },
  },
});
