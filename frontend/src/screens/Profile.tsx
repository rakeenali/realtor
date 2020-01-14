import React from 'react';
import { useQuery } from 'urql';

import { User } from '../graphql';

import { ContainerLoader } from '../components/Loaders';
import ProfileDetails from '../components/ProfileDetails';

import { useAuthState } from '../store/Auth';

import { ProfileContainer } from '../styles/Profile';

const query = `
  query {
    profile {
      firstName
      lastName
      role
      email
      flatsPosted {
        _id
        area
        createdAt
        bidsMade {
          _id
          amount
          bidBy {
            _id
            firstName
            email
            lastName
          }
        }
      }
      bidsMade {
        _id
        amount
        onFlat {
          _id
          area
          flatImage
        }
      }
    }
  }
`;

interface QueryResponse {
  profile: User;
}

const Profile = () => {
  const authState = useAuthState();

  const [res] = useQuery<QueryResponse>({
    query,
    context: {
      fetchOptions: {
        headers: {
          Authorization: authState.accessToken,
        },
      },
    },
  });

  if (res.fetching) {
    return <ContainerLoader />;
  }

  if (res.data?.profile) {
    const { profile } = res.data;
    return (
      <ProfileContainer>
        <ProfileDetails userType={profile.role} profile={profile} />
      </ProfileContainer>
    );
  }

  return <React.Fragment></React.Fragment>;
};

export default Profile;
