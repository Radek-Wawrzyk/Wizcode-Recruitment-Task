type WithLabelAndAttributes<L = string, A = unknown, T = unknown> = (L extends null
  ? {}
  : { label: string }) &
  (A extends object ? { attributes?: A } : {}) &
  (T extends null ? {} : T);

interface ImageAttributes {
  height: string;
}

interface IdAttributes {
  'im:id': string;
}

interface LinkAttributes {
  rel: string;
  type: string;
  href: string;
}

interface ArtistAttributes {
  href: string;
}

interface CategoryAttributes {
  'im:id': string;
  term: string;
  scheme: string;
  label: string;
}

interface PriceAttributes {
  amount: string;
  currency: string;
}

interface ReleaseDateAttributes {
  label: string;
}

interface ContentTypeAttributes {
  term: string;
  label: string;
}

interface Album {
  'im:name': WithLabelAndAttributes<string, unknown>;
  'im:image': WithLabelAndAttributes<string, ImageAttributes>[];
  'im:itemCount': WithLabelAndAttributes<string, unknown>;
  'im:price': WithLabelAndAttributes<string, PriceAttributes>;
  'im:contentType': {
    'im:contentType': WithLabelAndAttributes<null, ContentTypeAttributes>;
    attributes: WithLabelAndAttributes<null, ContentTypeAttributes>;
  };
  'im:artist': WithLabelAndAttributes<string, ArtistAttributes>;
  'im:releaseDate': WithLabelAndAttributes<string, ReleaseDateAttributes>;
  rights: WithLabelAndAttributes<string, unknown>;
  title: WithLabelAndAttributes<string, unknown>;
  link: WithLabelAndAttributes<string, LinkAttributes>;
  id: WithLabelAndAttributes<string, IdAttributes>;
  category: WithLabelAndAttributes<string, CategoryAttributes>;
}

interface GetTopAlbumsResponseDto {
  feed: {
    entry: Album[];
  };
}

interface GetTopAlbumsResponseDto {
  feed: {
    entry: Album[];
  };
}

export type { Album, GetTopAlbumsResponseDto };
