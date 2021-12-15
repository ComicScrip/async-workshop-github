const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const db = new PrismaClient();

const getUserRepos = (github_username) => {
  return axios
    .get(`https://api.github.com/users/${github_username}/repos`)
    .then((res) => {
      return res.data;
    });
};

async function run() {
  const users = await db.users.findMany();
  /*
  for (let i = 0; i < users.length; i++) {
    console.log('test');
    const gitUserName = users[i].github_username;
    const userRepos = await getUserRepos(gitUserName);
    await db.repositories
      .createMany({
        data: userRepos.map((repo) => {
          return { url: repo.html_url, user_id: users[i].id };
        }),
      })
      .catch(console.error);
  }
  */

  await Promise.all(
    users.map((user) => {
      console.log('recupération des repos de ' + user.github_username);
      return getUserRepos(user.github_username).then((repos) => {
        console.log('repos récuprés pour ' + user.github_username);
        return db.repositories.createMany({
          data: repos.map((repo) => {
            return { url: repo.html_url, user_id: user.id };
          }),
        });
      });
    })
  );
  console.log('done');
}

run();
