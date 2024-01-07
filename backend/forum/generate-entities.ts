import { MikroORM } from '@mikro-orm/core';

(async () => {
  const orm = await MikroORM.init({
    discovery: {
      // we need to disable validation for no entities
      warnWhenNoEntities: false,
    },
    dbName: 'forum',
    type: 'postgresql'

  });
  const generator = orm.getEntityGenerator();
  const dump = await generator.generate({
    save: true,
    baseDir: process.cwd() + '/test1',
    skipTables: ['users']
  });
  console.log(dump);
  await orm.close(true);
})();