import config from '../config';
import { jwtHelpers } from './jwtHelpers';

type URLProps = {
  baseUrl: string;
  email: string;
  workspaceId: string;
  invitedById: string;
};

export const generateInvitationLink = ({
  baseUrl,
  email,
  workspaceId,
  invitedById,
}: URLProps) => {
  const url = new URL(baseUrl);
  const token = jwtHelpers.createToken(
    {
      workspaceId,
      invitedById,
    },
    config.invitation.secret! as string,
    config.invitation.expires_in! as string
  );

  url.searchParams.append('email', email);
  url.searchParams.append('token', token);
  url.searchParams.append('workspaceId', workspaceId);
  return url.toString();
};

// const baseUrl = 'https://yourwebsite.com/accept-invitation';
// const workspaceId = 'workspace123';
// const invitedById = 'user456';

// const invitationLink = generateInvitationLink(
//   baseUrl,
//   workspaceId,
//   invitedById
// );
// console.log(invitationLink);
