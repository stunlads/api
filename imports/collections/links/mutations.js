import { Links } from './links'; 

Links.mutations({
  __sorting(sorting) {
    return {
      $set: {
        sorting
      }
    } 
  }
});