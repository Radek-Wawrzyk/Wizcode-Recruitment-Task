type WithLabelAndAttributes<T = unknown, A = unknown> = {
  label?: string;
  attributes?: A;
} & (T extends null ? {} : T);

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
  'im:name': WithLabelAndAttributes;
  'im:image': WithLabelAndAttributes<null, ImageAttributes>[];
  'im:itemCount': WithLabelAndAttributes;
  'im:price': WithLabelAndAttributes<null, PriceAttributes>;
  'im:contentType': {
    'im:contentType': WithLabelAndAttributes<null, ContentTypeAttributes>;
    attributes: WithLabelAndAttributes<null, ContentTypeAttributes>;
  };
  'im:artist': WithLabelAndAttributes<null, ArtistAttributes>;
  'im:releaseDate': WithLabelAndAttributes<null, ReleaseDateAttributes>;
  rights: WithLabelAndAttributes;
  title: WithLabelAndAttributes;
  link: WithLabelAndAttributes<null, LinkAttributes>;
  id: WithLabelAndAttributes<null, IdAttributes>;
  category: WithLabelAndAttributes<null, CategoryAttributes>;
}

interface GetTopAlbumsResponseDto {
  feed: {
    entry: Album[];
  };
}

export type { Album, GetTopAlbumsResponseDto };
