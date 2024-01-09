export interface ArticleType {
  node: {
    title: string;
    nid_dont_use?: string;
    field_photo_image_section?: string;
    path?: string;
    nid: string;
    photo_image_nids?: string;
    ImageStyle_thumbnail: string;
    last_update: number;
    views_count?: number;
    author_uid?: number;
    author_name: string;
  };
}
export interface ArticleContext {
  currentPage: number;
  articles: ArticleType[];
  lastPage: boolean;
  error: unknown;
}
