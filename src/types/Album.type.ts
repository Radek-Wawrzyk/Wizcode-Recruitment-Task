type WithLabelAndAttributes<L = string, A = null> = (L extends null ? {} : { label: string }) &
  (A extends null ? {} : { attributes: A });

interface RawAlbum {
  'im:name': WithLabelAndAttributes<string>;
  'im:image': WithLabelAndAttributes<string, { height: string }>[];
  'im:itemCount': WithLabelAndAttributes<string>;
  'im:price': WithLabelAndAttributes<string, { amount: string; currency: string }>;
  'im:contentType': {
    'im:contentType': WithLabelAndAttributes<null, { term: string; label: string }>;
    attributes: WithLabelAndAttributes<null, { term: string; label: string }>;
  };
  'im:artist': WithLabelAndAttributes<string, { href: string }>;
  'im:releaseDate': WithLabelAndAttributes<string, { label: string }>;
  rights: WithLabelAndAttributes<string>;
  title: WithLabelAndAttributes<string>;
  link: WithLabelAndAttributes<string, { rel: string; type: string; href: string }>;
  id: WithLabelAndAttributes<string, { 'im:id': string }>;
  category: WithLabelAndAttributes<
    string,
    { 'im:id': string; term: string; scheme: string; label: string }
  >;
}

interface Album {
  id: string;
  name: string;
  url: string;
  image: string;
  artistName: string;
  price: {
    amount: string;
    currency: string;
  };
  tracksNumber: string;
  releaseDate: Date;
  category: {
    id: string;
    name: string;
  };
}

interface GetTopAlbumsResponseDto {
  feed: {
    entry: RawAlbum[];
  };
  author: {
    name: WithLabelAndAttributes<string>;
    uri: WithLabelAndAttributes<string>;
  };
  icon: WithLabelAndAttributes<string>;
  id: WithLabelAndAttributes<string>;
  link: WithLabelAndAttributes<string, { rel: string; type: string; href: string }>[];
  title: WithLabelAndAttributes<string>;
  updated: WithLabelAndAttributes<string>;
  rights: WithLabelAndAttributes<string>;
}

export type { Album, GetTopAlbumsResponseDto, RawAlbum };
