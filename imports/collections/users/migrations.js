// This file runs once according to migration names.
import { Links } from '../links/links';

Migrations.add('initial-user', () => {
  const userId = Accounts.createUser({
    username: 'yoourlink',
    email: 'info@yoourlink.com',
    password: '123456'
  });

  const links = [
    { title: 'Github', url: 'https://github.com/yoourlink' },
    { title: 'Twitter', url: 'https://twitter.com/yoourlink' },
    { title: 'Docker', url: 'https://hub.docker.com/u/yoourlink' }
  ];

  // add initial links
  links.forEach((link, index) => {
    Links.insert({
      ...link,
      createdBy: userId,
      sorting: index,
      active: true
    })
  })
});
