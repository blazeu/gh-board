import {EventEmitter} from 'events';
import Client from './github-client';

let currentUser = null;

class Store extends EventEmitter {
  off() { // EventEmitter has `.on` but no matching `.off`
    const slice = [].slice;
    const args = arguments.length >= 1 ? slice.call(arguments, 0) : [];
    return this.removeListener.apply(this, args);
  }
  clear() {
    currentUser = null;
  }
  getUser() {
    return currentUser;
  }
  fetch() {
    if (currentUser) {
      return Promise.resolve(currentUser);
    } else {
      if (Client.hasCredentials()) {
        return Client.getOcto().user.fetch().then((info) => {
          currentUser = info;
          this.emit('change', info);
          return info;
        });
      } else {
        return Promise.resolve(null);
      }
    }
  }
}

const CurrentUserStore = new Store();
export {CurrentUserStore};