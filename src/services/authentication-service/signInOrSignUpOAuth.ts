import userRepository from '@/repositories/user-repository';
//import { exclude } from '@/utils/prisma-utils';
import axios from 'axios';
import qs from 'query-string';
import createSession from './createSession';
import bcrypt from 'bcrypt';
import { accessDeniedError } from './errors';
import { exclude } from '@/utils/prisma-utils';

type SignInOrSignUpOAuthParams = {
  code: string;
};

async function signOrSignUpOAuth({ code }: SignInOrSignUpOAuthParams) {
  const githubToken = await getTokenGithub(code);
  const githubUserData = await getGithubUserData(githubToken);
  const user = await getOrCreateUser(githubUserData.id.toString(), githubUserData.node_id);
  const token = await createSession(user.id);

  return {
    user: exclude(user, 'githubId'),
    token,
  };
}

async function getTokenGithub(code: string) {
  const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  try {
    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const parsedData = qs.parse(data);
    return parsedData.access_token as string;
  } catch (error) {
    throw accessDeniedError(error);
  }
}

async function getGithubUserData(accessToken: string) {
  const GITHUB_USER_URL = 'https://api.github.com/user';
  try {
    const { data } = await axios.get(GITHUB_USER_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    throw accessDeniedError(error);
  }
}

async function getOrCreateUser(githubId: string, nodeId: string) {
  let user = await userRepository.findByGithubId(githubId);

  const saltOrRounds = parseInt(process.env.BCRYPT_SECRET, 10);
  if (!user) {
    const password = await bcrypt.hash(nodeId, saltOrRounds);
    user = await userRepository.create({
      githubId,
      password,
      email: nodeId,
    });
  }

  return user;
}

export { signOrSignUpOAuth };
