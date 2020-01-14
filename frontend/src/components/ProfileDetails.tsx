import React from 'react';
import { useMutation } from 'urql';
import { useForm } from 'react-hook-form';

import { useAuthState } from '../store/Auth';
import { actionSetMessage, useMessageDispatch } from '../store/Message';

import { Header, Main, Modal } from '../styles/Profile';

import { User, Bid, Message } from '../graphql';

const mutationRemoveFlat = `
  mutation removeFlat($flatId: String!) {
    removeFlat(flatId:$flatId){
      message
    }
  }
`;

const mutationPlaceABid = `
mutation placeABid($flatId: String!, $bidAmount: Int!) {
  placeABid(flatId: $flatId, bidAmount: $bidAmount) {
    _id
    amount
   	onFlat {
      _id
      area
    	flatImage
    }
  }
}
`;

const mutationRetractABid = `
mutation retractABid($bidId: String!){
  retractABid(bidId:$bidId){
    message
  }
}
`;

type IProps = {
  profile: User;
  userType: string;
};

type RemoveMutationInput = {
  flatId: string;
};

type RemoveMutationResponse = {
  removeFlat: Message;
};

type MutationPlaceABidInput = {
  flatId: string;
  bidAmount: number;
};

type MutationPlaceABidResponse = {
  placeABid: Bid;
};

type MutationRetractABidInput = {
  bidId: string;
};

type MutationRetractABidResp = {
  retractABid: Message;
};

type FormInput = {
  bidAmount: number;
};

const ProfileDetails: React.FC<IProps> = (props) => {
  const authState = useAuthState();
  const { handleSubmit, errors, register } = useForm<FormInput>();
  const messageDispatch = useMessageDispatch();

  const [res, executeMutation] = useMutation<
    RemoveMutationResponse,
    RemoveMutationInput
  >(mutationRemoveFlat);

  const [placeABidRes, placeABidExecutation] = useMutation<
    MutationPlaceABidResponse,
    MutationPlaceABidInput
  >(mutationPlaceABid);

  const [retractBidResp, retractBidExecution] = useMutation<
    MutationRetractABidResp,
    MutationRetractABidInput
  >(mutationRetractABid);

  const [removeFlatId, setRemoveFlatId] = React.useState<string>('');
  const [profile, setProfile] = React.useState<User>(props.profile);
  const [openBids, setOpenBids] = React.useState<boolean>(false);
  const [currentBid, setCurrentBid] = React.useState<Bid[]>([]);

  const [openNewBidModal, setOpenNewBidModal] = React.useState<boolean>(false);
  const [flatToBidId, setFlatToBidId] = React.useState<string>('');
  const [deletedBidId, setDeletedBidId] = React.useState<string>('');

  React.useEffect(() => {
    if (!res.fetching && res.data?.removeFlat) {
      setProfile((n) => ({
        ...n,
        flatsPosted: n.flatsPosted?.filter((flat) => {
          if (flat._id !== removeFlatId) {
            return flat;
          }
        }),
      }));
    }

    if (!placeABidRes.fetching && placeABidRes.data?.placeABid) {
      const aBid = placeABidRes.data.placeABid;
      setProfile((n) => ({
        ...n,
        bidsMade: [...n.bidsMade, aBid],
      }));
      actionSetMessage(true, 'Bid added successfully', messageDispatch);
    }

    if (!retractBidResp.fetching && retractBidResp.data?.retractABid) {
      setProfile((n) => ({
        ...n,
        bidsMade: n.bidsMade?.filter((bid) => {
          if (bid._id !== deletedBidId) {
            return bid;
          }
        }),
      }));
      actionSetMessage(true, 'Bid retracted successfully', messageDispatch);
    }
  }, [
    res,
    removeFlatId,
    placeABidRes,
    retractBidResp,
    deletedBidId,
    messageDispatch,
  ]);

  const deleteFlat = (flatId: string) => {
    executeMutation(
      { flatId },
      {
        fetchOptions: {
          headers: {
            Authorization: authState.accessToken,
          },
        },
      },
    );
    setRemoveFlatId(flatId);
  };

  const onSubmit = (data: FormInput) => {
    const bidAmount = Number(data.bidAmount);
    placeABidExecutation(
      {
        flatId: flatToBidId,
        bidAmount: bidAmount,
      },
      {
        fetchOptions: {
          headers: {
            Authorization: authState.accessToken,
          },
        },
      },
    );
    setOpenNewBidModal(false);
    setFlatToBidId('');
  };

  const retractABid = (bidId: string) => {
    retractBidExecution(
      { bidId },
      {
        fetchOptions: {
          headers: {
            Authorization: authState.accessToken,
          },
        },
      },
    );
    setDeletedBidId(bidId);
  };

  const { userType } = props;
  if (userType === 'realtor') {
    return (
      <React.Fragment>
        <Header>
          <h1>{profile.email}</h1>
          <h2>
            Flats Count: <span>{profile.flatsPosted?.length}</span>
          </h2>
        </Header>
        <Main>
          {profile.flatsPosted?.map((flat) => (
            <article key={flat._id}>
              <img
                src='https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg'
                alt='afsdf'
              />
              <div>
                <h1>
                  Bids on flat: <span>{flat.bidsMade.length}</span>
                </h1>
                <h2>
                  Area: <span>{flat.area}</span>
                </h2>
                <h3>
                  Created At:{' '}
                  <span>{new Date(Number(flat.createdAt)).toDateString()}</span>
                </h3>
                <hr />
                <button
                  onClick={() => {
                    setOpenBids(true);
                    setCurrentBid(flat.bidsMade);
                  }}
                  disabled={flat.bidsMade?.length > 0 ? false : true}
                >
                  See Bids
                </button>
                <button
                  onClick={() => deleteFlat(flat._id)}
                  disabled={res.fetching}
                >
                  Delete Flat
                </button>
                <br />
              </div>
            </article>
          ))}
        </Main>
        {openBids && (
          <Modal>
            <button
              onClick={() => {
                setOpenBids(false);
                setCurrentBid([]);
              }}
            >
              &times;
            </button>
            <div>
              <ul>
                {currentBid.map((bid) => (
                  <li key={bid._id}>
                    <span>
                      Amount: <strong>{bid.amount}</strong>
                    </span>
                    <span>
                      Bid By: <strong>{bid.bidBy?.email}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Modal>
        )}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Header>
        <h1>{profile.email}</h1>
        <h2>
          Bids Count: <span>{profile.bidsMade?.length}</span>
        </h2>
      </Header>
      <Main>
        {profile.bidsMade?.map((bid) => (
          <article key={bid._id}>
            <img
              src='https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg'
              alt='afsdf'
            />
            <div>
              <h1>
                Your Bid: <span>{bid.amount}</span>
              </h1>
              <h2>
                Area: <span>{bid.onFlat?.area}</span>
              </h2>
              <hr />
              <button
                onClick={() => {
                  setOpenNewBidModal(true);
                  if (bid.onFlat?._id) {
                    setFlatToBidId(bid.onFlat._id);
                  }
                  return;
                }}
                disabled={placeABidRes.fetching}
              >
                Place a new Bid
              </button>
              <button
                onClick={() => retractABid(bid._id)}
                disabled={retractBidResp.fetching}
              >
                Retract Bid
              </button>
              <br />
            </div>
          </article>
        ))}
      </Main>
      {openNewBidModal && (
        <Modal>
          <button
            onClick={() => {
              setOpenNewBidModal(false);
              setFlatToBidId('');
            }}
          >
            &times;
          </button>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Make a Bid</h2>
              <div>
                <label htmlFor='bidAmount'>Amount</label>
                <input
                  id='bidAmount'
                  placeholder='Make a bid'
                  type='number'
                  name='bidAmount'
                  ref={register({
                    required: 'Bid amount is required',
                  })}
                />
                {<span>{errors.bidAmount?.message}</span>}
              </div>
              <div>
                <button type='submit'>Add</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ProfileDetails;
