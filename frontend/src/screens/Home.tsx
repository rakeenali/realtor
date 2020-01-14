import React from 'react';
import { useQuery, useMutation } from 'urql';
import { useForm } from 'react-hook-form';

import { useAuthState } from '../store/Auth';

import { ContainerLoader } from '../components/Loaders';

import { ProfileContainer, Header, Main, Modal } from '../styles/Profile';

import { Flat, Bid } from '../graphql';

const query = `
query {
    flats {
      area
      flatAddress
      flatImage
      _id
      createdAt
      bidsMade {
          _id
        amount
        bidBy {
          _id
          email
          firstName
        }
      }
      createdBy {
        email
      }
    }
  }  
`;

const mutationPlaceABid = `
mutation placeABid($flatId: String!, $bidAmount: Int!) {
  placeABid(flatId: $flatId, bidAmount: $bidAmount) {
    _id
    amount
    bidBy {
        email
    }
  }
}
`;

type FlatQueryResp = {
  flats: Flat[];
};

type MutationPlaceABidInput = {
  flatId: string;
  bidAmount: number;
};

type MutationPlaceABidResponse = {
  placeABid: Bid;
};

type FormInput = {
  bidAmount: number;
};

const Home = (): JSX.Element => {
  const authState = useAuthState();

  const [flatResp] = useQuery<FlatQueryResp>({ query });
  const [mutationResp, executeMutation] = useMutation<
    MutationPlaceABidResponse,
    MutationPlaceABidInput
  >(mutationPlaceABid);

  const { handleSubmit, errors, register } = useForm<FormInput>({
    mode: 'onSubmit',
  });

  const [flats, setFlats] = React.useState<Flat[]>([]);

  const [toggleBids, setToggleBids] = React.useState<boolean>(false);
  const [currentFlatBids, setCurrentFlatBids] = React.useState<Bid[]>([]);

  const [toggleAddBid, setToggleAddBid] = React.useState<boolean>(false);
  const [flatToBidId, setFlatToBidId] = React.useState<string>('');

  React.useEffect(() => {
    if (!flatResp.fetching && flatResp.data?.flats) {
      setFlats(flatResp.data.flats);
    }

    if (!mutationResp.fetching && mutationResp.data?.placeABid) {
      const aBid = mutationResp.data.placeABid;
      setFlats((flats) =>
        flats.map((flat) => {
          if (flat._id === flatToBidId) {
            return {
              ...flat,
              bidsMade: [...flat.bidsMade, aBid],
            };
          }
          return flat;
        }),
      );
      setFlatToBidId('');
    }
  }, [mutationResp, flatResp, flatToBidId]);

  const onSubmit = (data: FormInput) => {
    const bidAmount = Number(data.bidAmount);
    executeMutation(
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
    setToggleAddBid(false);
  };

  const heighestBid = (bids: Bid[]): Number => {
    return bids.reduce((acc, bid) => {
      if (bid.amount > acc) {
        acc = bid.amount;
      }
      return acc;
    }, 0);
  };

  const renderFlats = (flat: Flat): JSX.Element => {
    return (
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
          {flat.bidsMade.length > 0 && (
            <h2>
              Highest Bid: <span>{heighestBid(flat.bidsMade)}</span>
            </h2>
          )}
          <h3>
            Created At:{' '}
            <span>{new Date(Number(flat.createdAt)).toDateString()}</span>
          </h3>
          <h3>
            Address: <span>{flat.flatAddress}</span>
          </h3>
          <h3>
            Address: <span>{flat.createdBy.email}</span>
          </h3>
          <hr />
          {flat.bidsMade.length > 0 && (
            <button
              onClick={() => {
                setToggleBids(true);
                setCurrentFlatBids(flat.bidsMade);
              }}
            >
              See Bids
            </button>
          )}
          {authState.userRole === 'bidder' && (
            <button
              onClick={() => {
                setToggleAddBid(true);
                setFlatToBidId(flat._id);
              }}
            >
              Make a Bid
            </button>
          )}
          <br />
          <br />
        </div>
      </article>
    );
  };

  if (flatResp.fetching) {
    return <ContainerLoader />;
  }

  if (!flatResp.fetching && flatResp.data?.flats) {
    return (
      <ProfileContainer>
        <Header>
          <h2>
            Total Flats: <span>{flats.length}</span>
          </h2>
        </Header>
        <Main>{flats.map(renderFlats)}</Main>
        {toggleBids && (
          <Modal>
            <button
              onClick={() => {
                setToggleBids(false);
                setCurrentFlatBids([]);
              }}
            >
              &times;
            </button>
            <div>
              <ul>
                {currentFlatBids.map((bid) => (
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
        {toggleAddBid && (
          <Modal>
            <button
              onClick={() => {
                setToggleAddBid(false);
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
      </ProfileContainer>
    );
  }

  return <React.Fragment></React.Fragment>;
};

export default Home;
