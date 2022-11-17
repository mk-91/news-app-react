export interface ArticleObj {
  url: string;
  urlToImage: string;
  title: string;
}

export interface ArticleProps {
  art: ArticleObj;
  key: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  password2: string;
}

export interface NavbarProps {
  loggedIn: boolean;
}
export interface ProfilePhotoFormData {
  profilePhotoList: FileList;
}

export interface SearchFormData {
  keyword: string;
}

export interface SearchFormProps {
  setKeyword: (value: string) => void;
}
