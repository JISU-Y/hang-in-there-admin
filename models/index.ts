import { BannerStatusType, StringBooleanType } from './client';

export interface GetLoginDto {
  id: string;
  pw: string;
}

export interface LoginType {
  at: string;
  rt: string;
  id: string;
  name: string;
}

export interface CreateMemberDto {
  id: string;
  pw: string;
  name: string;
}

export interface MemberDto {
  id: string;
  name: string;
  join_dt: string;
  member_id: string;
}

export interface UpdatePasswordDto {
  pw: string;
}

export interface EventListType {
  event_id: number;
  image: string;
  title: string;
  event_st: string;
  event_ed: string;
  content_type: number;
  area_cd: number;
  sigungu_cd: number;
  category: number;
  sub_category: number;
  detail_sub_category: number;
  reg_dt: string;
  addr: string;
  addr_detail: string;
}

export interface GetBannerListRequest {
  page: number;
  size: number;
  useYn: StringBooleanType;
  status: BannerStatusType;
}

export interface BannerType {
  banner_id: number;
  bg_image: string | null;
  event_image: string | null;
  content: string | null;
  link: string | null;
  start_dt: string;
  end_dt: string;
  order_number: number | null;
  create_dt: string;
  update_dt: string | null;
  create_id: number;
  update_id: number | null;
  use_yn: StringBooleanType;
}
